import { useCallback, useEffect, useState, type FormEvent } from "react";
import { AlertCircle, ArrowLeft, CheckCircle2, Clock3, FileText, LogOut, Mail, RefreshCw, Send, ShieldCheck, UploadCloud } from "lucide-react";

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, "");
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const FUNCTION_NAME = "send-participation-certificate";

type Session = { access_token: string; refresh_token?: string; user?: { email?: string } };
type Delivery = {
  id: string; student_name: string; student_email: string; event_name: string;
  event_date: string | null; status: "pending" | "sending" | "sent" | "failed";
  attempt_count: number; last_error: string | null; sent_at: string | null;
  created_at: string; provider_message_id: string | null;
};

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the selected PDF."));
    reader.onload = () => {
      const result = String(reader.result ?? "");
      resolve(result.substring(result.indexOf(",") + 1));
    };
    reader.readAsDataURL(file);
  });
}

export function CertificateEmailAdmin() {
  const [session, setSession] = useState<Session | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  const invoke = useCallback(async (body: Record<string, unknown>) => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !session?.access_token) {
      throw new Error("Supabase is not configured or your session has expired.");
    }
    const response = await fetch(`${SUPABASE_URL}/functions/v1/${FUNCTION_NAME}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(typeof data.error === "string" ? data.error : "The request failed.");
    return data;
  }, [session]);

  const refreshHistory = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    try {
      const data = await invoke({ action: "list" });
      setDeliveries(data.deliveries ?? []);
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Could not load delivery history." });
    } finally {
      setLoading(false);
    }
  }, [invoke, session]);

  useEffect(() => {
    void refreshHistory();
  }, [refreshHistory]);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      setMessage({ type: "error", text: "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your deployment environment first." });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.access_token) throw new Error(data.msg ?? data.message ?? "Sign-in failed. Check your email and password.");
      setSession({ access_token: data.access_token, refresh_token: data.refresh_token, user: data.user });
      setLoginPassword("");
      setMessage({ type: "info", text: "Signed in. Your account must be approved as a certificate admin in Supabase." });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Could not sign in." });
    } finally {
      setLoading(false);
    }
  }

  async function handleSend(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    if (!file) {
      setMessage({ type: "error", text: "Choose the student's certificate PDF." });
      return;
    }
    if (file.type !== "application/pdf" || file.size > 8 * 1024 * 1024) {
      setMessage({ type: "error", text: "Choose a PDF file no larger than 8 MB." });
      return;
    }
    setSending(true);
    try {
      const fileBase64 = await fileToBase64(file);
      const result = await invoke({
        studentName: studentName.trim(),
        studentEmail: studentEmail.trim(),
        eventName: eventName.trim(),
        eventDate: eventDate || null,
        fileName: file.name,
        fileBase64,
      });
      setMessage({
        type: result.warning ? "info" : "success",
        text: result.warning ?? `Certificate email accepted by the provider for ${studentEmail.trim()}.`,
      });
      setStudentName("");
      setStudentEmail("");
      setEventName("");
      setEventDate("");
      setFile(null);
      const input = document.getElementById("certificate-pdf") as HTMLInputElement | null;
      if (input) input.value = "";
      await refreshHistory();
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Could not send certificate." });
      await refreshHistory();
    } finally {
      setSending(false);
    }
  }

  async function retry(delivery: Delivery) {
    setMessage({ type: "info", text: `To retry ${delivery.student_email}, re-enter the details and select the correct PDF. A retry action will be added after the file is selected.` });
  }

  const statusClass = (status: Delivery["status"]) =>
    status === "sent" ? "bg-emerald-50 text-emerald-700" :
    status === "failed" ? "bg-rose-50 text-rose-700" :
    status === "sending" ? "bg-amber-50 text-amber-800" : "bg-slate-100 text-slate-600";

  if (!session) {
    return (
      <section className="min-h-[75vh] bg-[#F6F5F0] px-5 py-16 text-[#071A2B]">
        <div className="mx-auto max-w-md rounded-3xl border border-[#071A2B]/10 bg-white p-7 shadow-sm sm:p-9">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#101D3A] text-white"><ShieldCheck size={24} /></div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748b]">Nexovate · Admin</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Certificate delivery</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Sign in with your approved Nexovate admin account to send participation certificates.</p>
          <form onSubmit={handleLogin} className="mt-7 space-y-4">
            <label className="block text-sm font-medium">Admin email
              <input required type="email" autoComplete="username" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#101D3A]" />
            </label>
            <label className="block text-sm font-medium">Password
              <input required type="password" autoComplete="current-password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#101D3A]" />
            </label>
            {message && <p role="alert" className="text-sm text-rose-700">{message.text}</p>}
            <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101D3A] px-5 py-3.5 font-semibold text-white transition hover:bg-[#1d315b] disabled:opacity-60">{loading ? "Signing in…" : "Sign in"} <ArrowLeft className="rotate-180" size={17} /></button>
          </form>
          <p className="mt-5 text-xs leading-5 text-slate-500">Access is restricted to user IDs explicitly approved in the Supabase certificate admin table.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F6F5F0] px-4 py-10 text-[#071A2B] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Nexovate · Admin workspace</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Participation certificates</h1>
            <p className="mt-2 text-sm text-slate-600">Send one personalized email with the student's PDF certificate attached.</p>
          </div>
          <button onClick={() => { setSession(null); setDeliveries([]); setMessage(null); }} className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-slate-50 sm:self-auto"><LogOut size={16} /> Sign out</button>
        </header>

        {message && (
          <div role="status" className={`mb-6 flex items-start gap-3 rounded-2xl border p-4 text-sm ${message.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : message.type === "error" ? "border-rose-200 bg-rose-50 text-rose-800" : "border-slate-200 bg-white text-slate-700"}`}>
            {message.type === "success" ? <CheckCircle2 size={19} className="mt-0.5 shrink-0" /> : message.type === "error" ? <AlertCircle size={19} className="mt-0.5 shrink-0" /> : <Clock3 size={19} className="mt-0.5 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
          <form onSubmit={handleSend} className="rounded-3xl border border-[#071A2B]/10 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#101D3A] text-white"><Mail size={19} /></div><div><h2 className="text-lg font-semibold">Send a certificate</h2><p className="text-sm text-slate-500">The PDF will be attached to the email.</p></div></div>
            <div className="space-y-4">
              <label className="block text-sm font-medium">Student full name
                <input required minLength={2} maxLength={160} value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="e.g. Anushree R R" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#101D3A]" />
              </label>
              <label className="block text-sm font-medium">Student email address
                <input required type="email" maxLength={254} value={studentEmail} onChange={e => setStudentEmail(e.target.value)} placeholder="student@example.com" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#101D3A]" />
              </label>
              <label className="block text-sm font-medium">Workshop or event name
                <input required minLength={2} maxLength={200} value={eventName} onChange={e => setEventName(e.target.value)} placeholder="e.g. Introduction to Artificial Intelligence" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#101D3A]" />
              </label>
              <label className="block text-sm font-medium">Event date <span className="font-normal text-slate-400">(optional)</span>
                <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#101D3A]" />
              </label>
              <label htmlFor="certificate-pdf" className="block cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 transition hover:border-[#647EAE] hover:bg-slate-50/70">
                <span className="flex items-center gap-3"><UploadCloud size={22} className="text-[#647EAE]" /><span><span className="block text-sm font-semibold">Certificate PDF</span><span className="mt-1 block text-xs text-slate-500">PDF only · maximum 8 MB</span></span></span>
                <input id="certificate-pdf" required type="file" accept="application/pdf,.pdf" onChange={e => setFile(e.target.files?.[0] ?? null)} className="mt-4 block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-[#101D3A] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white" />
                {file && <span className="mt-3 flex items-center gap-2 text-sm text-slate-700"><FileText size={16} /> {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB</span>}
              </label>
            </div>
            <button disabled={sending} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#101D3A] px-5 py-3.5 font-semibold text-white transition hover:bg-[#1d315b] disabled:cursor-wait disabled:opacity-60">{sending ? "Sending certificate…" : "Send certificate email"} <Send size={17} /></button>
            <p className="mt-3 text-xs leading-5 text-slate-500">Double-check the student's email and certificate before sending. Previously sent records cannot be sent again through this form.</p>
          </form>

          <div className="rounded-3xl border border-[#071A2B]/10 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-3"><div><h2 className="text-lg font-semibold">Recent deliveries</h2><p className="mt-1 text-sm text-slate-500">Latest 50 email attempts</p></div><button onClick={() => void refreshHistory()} disabled={loading} aria-label="Refresh delivery history" className="rounded-xl border border-slate-200 p-2.5 hover:bg-slate-50 disabled:opacity-60"><RefreshCw size={17} className={loading ? "animate-spin" : ""} /></button></div>
            {deliveries.length === 0 ? <div className="rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">{loading ? "Loading delivery history…" : "No certificate emails recorded yet."}</div> : (
              <div className="space-y-3">
                {deliveries.map(delivery => (
                  <article key={delivery.id} className="rounded-2xl border border-slate-100 p-4">
                    <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate font-semibold">{delivery.student_name}</p><p className="mt-1 break-all text-xs text-slate-500">{delivery.student_email}</p></div><span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${statusClass(delivery.status)}`}>{delivery.status}</span></div>
                    <p className="mt-3 text-sm text-slate-700">{delivery.event_name}</p>
                    <p className="mt-1 text-xs text-slate-400">{new Date(delivery.created_at).toLocaleString()} · Attempts: {delivery.attempt_count}</p>
                    {delivery.status === "failed" && delivery.last_error && <p className="mt-2 break-words text-xs text-rose-700">{delivery.last_error}</p>}
                    {delivery.status === "failed" && <button onClick={() => void retry(delivery)} className="mt-3 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50">Retry guidance</button>}
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
