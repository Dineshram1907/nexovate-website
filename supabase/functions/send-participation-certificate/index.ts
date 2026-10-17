import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("APP_ORIGIN") ?? "https://nexovate.org.in",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PDF_BYTES = 8 * 1024 * 1024;

function decodeBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char] ?? char);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const origin = req.headers.get("origin");
  const allowedOrigin = Deno.env.get("APP_ORIGIN") ?? "https://nexovate.org.in";
  if (origin && origin !== allowedOrigin) return json({ error: "Origin not allowed" }, 403);

  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return json({ error: "Sign in required" }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendKey = Deno.env.get("RESEND_API_KEY");
  const fromEmail = Deno.env.get("CERTIFICATE_FROM_EMAIL");
  if (!supabaseUrl || !anonKey || !serviceKey || !resendKey || !fromEmail) {
    return json({ error: "Email delivery is not configured on the server." }, 500);
  }

  const authClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData, error: authError } = await authClient.auth.getUser();
  if (authError || !userData.user) return json({ error: "Your session is invalid or expired." }, 401);

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: adminRecord, error: adminError } = await admin
    .from("certificate_email_admins")
    .select("user_id")
    .eq("user_id", userData.user.id)
    .maybeSingle();
  if (adminError || !adminRecord) return json({ error: "You are not authorized to send certificates." }, 403);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON request." }, 400);
  }

  const deliveryId = typeof body.deliveryId === "string" ? body.deliveryId : null;
  const studentName = typeof body.studentName === "string" ? body.studentName.trim() : "";
  const studentEmail = typeof body.studentEmail === "string" ? body.studentEmail.trim().toLowerCase() : "";
  const eventName = typeof body.eventName === "string" ? body.eventName.trim() : "";
  const eventDate = typeof body.eventDate === "string" && body.eventDate ? body.eventDate : null;
  const fileNameInput = typeof body.fileName === "string" ? body.fileName : "participation-certificate.pdf";
  const base64 = typeof body.fileBase64 === "string" ? body.fileBase64 : "";
  const fileName = fileNameInput.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100);

  let delivery: { id: string; student_name: string; student_email: string; event_name: string; event_date: string | null; status: string; attempt_count: number; certificate_file_path: string | null };

  if (deliveryId) {
    const { data, error } = await admin
      .from("certificate_email_deliveries")
      .select("id, student_name, student_email, event_name, event_date, status, attempt_count, certificate_file_path")
      .eq("id", deliveryId)
      .maybeSingle();
    if (error || !data) return json({ error: "Delivery record not found." }, 404);
    if (data.status === "sent") return json({ error: "This certificate has already been sent.", delivery: data }, 409);
    if (data.status === "sending") return json({ error: "This delivery is already in progress. Check its status before retrying.", delivery: data }, 409);
    if (data.status !== "failed") return json({ error: "Only failed deliveries can be retried." }, 409);
    if (!base64) return json({ error: "Attach the certificate PDF again to retry." }, 400);
    delivery = data;
  } else {
    if (studentName.length < 2 || studentName.length > 160) return json({ error: "Enter the student's full name." }, 400);
    if (!emailPattern.test(studentEmail) || studentEmail.length > 254) return json({ error: "Enter a valid student email address." }, 400);
    if (eventName.length < 2 || eventName.length > 200) return json({ error: "Enter the workshop or event name." }, 400);
    if (!base64) return json({ error: "Attach the participation certificate PDF." }, 400);
    const { data, error } = await admin.from("certificate_email_deliveries").insert({
      student_name: studentName,
      student_email: studentEmail,
      event_name: eventName,
      event_date: eventDate,
      status: "pending",
      created_by: userData.user.id,
    }).select("id, student_name, student_email, event_name, event_date, status, attempt_count, certificate_file_path").single();
    if (error || !data) return json({ error: "Could not create the delivery record." }, 500);
    delivery = data;
  }

  let pdf: Uint8Array;
  try {
    pdf = decodeBase64(base64);
  } catch {
    return json({ error: "The attached file could not be read." }, 400);
  }
  if (pdf.byteLength < 5 || pdf.byteLength > MAX_PDF_BYTES ||
      new TextDecoder().decode(pdf.slice(0, 5)) !== "%PDF-") {
    return json({ error: "Upload a valid PDF up to 8 MB." }, 400);
  }

  const attempt = delivery.attempt_count + 1;
  const filePath = `${delivery.id}/certificate-${attempt}.pdf`;
  const { error: uploadError } = await admin.storage
    .from("certificate-pdfs")
    .upload(filePath, pdf, { contentType: "application/pdf", upsert: false });
  if (uploadError) {
    await admin.from("certificate_email_deliveries").update({
      status: "failed", attempt_count: attempt, last_error: "Could not store certificate PDF securely.",
      updated_at: new Date().toISOString(),
    }).eq("id", delivery.id);
    return json({ error: "Could not securely store the PDF. You can retry this delivery." }, 500);
  }

  const { error: markSendingError } = await admin.from("certificate_email_deliveries").update({
    status: "sending", attempt_count: attempt, certificate_file_path: filePath,
    last_error: null, updated_at: new Date().toISOString(),
  }).eq("id", delivery.id).neq("status", "sent");
  if (markSendingError) {
    await admin.storage.from("certificate-pdfs").remove([filePath]);
    return json({ error: "Could not prepare the delivery." }, 500);
  }

  const dateLine = delivery.event_date
    ? `<p><strong>Event date:</strong> ${escapeHtml(delivery.event_date)}</p>`
    : "";
  const subject = `Your Certificate of Participation — ${delivery.event_name}`;
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#071a2b;line-height:1.6">
    <div style="max-width:600px;margin:0 auto;padding:28px">
      <h2 style="color:#101d3a;margin-bottom:20px">Nexovate</h2>
      <p>Hi ${escapeHtml(delivery.student_name)},</p>
      <p>Thank you for participating in <strong>${escapeHtml(delivery.event_name)}</strong>.</p>
      ${dateLine}
      <p>Please find your <strong>Certificate of Participation</strong> attached to this email.</p>
      <p>We appreciate your enthusiasm and hope this experience supports your learning journey.</p>
      <p>Best regards,<br><strong>Team Nexovate</strong><br>Learn. Build. Grow.</p>
    </div></body></html>`;

  let providerResponse: Response;
  let providerPayload: Record<string, unknown> = {};
  try {
    providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `nexovate-certificate-${delivery.id}-attempt-${attempt}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [delivery.student_email],
        subject,
        html,
        attachments: [{ filename: fileName.toLowerCase().endsWith(".pdf") ? fileName : "participation-certificate.pdf", content: base64 }],
      }),
    });
    providerPayload = await providerResponse.json().catch(() => ({}));
  } catch {
    await admin.from("certificate_email_deliveries").update({
      status: "failed", last_error: "Email provider could not be reached; check provider logs before retrying.",
      updated_at: new Date().toISOString(),
    }).eq("id", delivery.id);
    return json({ error: "The email provider could not be reached. Check delivery status before retrying.", deliveryId: delivery.id }, 502);
  }

  if (!providerResponse.ok) {
    const providerError = typeof providerPayload.message === "string" ? providerPayload.message : "Email provider rejected the request.";
    await admin.from("certificate_email_deliveries").update({
      status: "failed", last_error: providerError.slice(0, 500), updated_at: new Date().toISOString(),
    }).eq("id", delivery.id);
    return json({ error: "Email was not accepted by the email provider. Review the error and retry if appropriate.", deliveryId: delivery.id }, 502);
  }

  const messageId = typeof providerPayload.id === "string" ? providerPayload.id : null;
  const { error: updateError } = await admin.from("certificate_email_deliveries").update({
    status: "sent", provider_message_id: messageId, sent_at: new Date().toISOString(),
    last_error: null, updated_at: new Date().toISOString(),
  }).eq("id", delivery.id);
  if (updateError) {
    // Provider accepted the email; do not mark failed or automatically resend.
    return json({ ok: true, warning: "The provider accepted the email, but the status update needs review.", deliveryId: delivery.id, providerMessageId: messageId }, 200);
  }

  return json({ ok: true, deliveryId: delivery.id, providerMessageId: messageId, status: "sent" });
});
