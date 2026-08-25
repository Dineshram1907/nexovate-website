import { NextRequest, NextResponse } from "next/server";
import {
  validateLeadForm,
  cleanPhoneNumber,
  LeadFormValues,
} from "@/lib/validation";

// ============================================================
// NEXOVATE SECURE LEAD SUBMISSION HANDLER
// ============================================================
// ARCHITECTURE FOR MICROSOFT EXCEL / POWER AUTOMATE INTEGRATION:
//
// 1. Production Mode:
//    - Connect to Microsoft Power Automate Webhook:
//      const webhookUrl = process.env.POWER_AUTOMATE_WEBHOOK_URL;
//      await fetch(webhookUrl, { method: "POST", body: JSON.stringify(leadPayload) });
//
//    - Or connect to Microsoft Graph API for direct Excel Table insertion:
//      POST https://graph.microsoft.com/v1.0/me/drive/items/{id}/workbook/tables/{table-name}/rows
//      Headers: { Authorization: `Bearer ${serverToken}` }
//
// 2. Demo Mode (Active Default):
//    - Validates payload server-side with anti-fake filters and simulates persistent recording.
// ============================================================

export interface LeadSubmission {
  name: string;
  phone: string;
  email: string;
  education: string;
  interestedProgram: string;
  purpose: string;
  message?: string;
  source: string;
  timestamp: string;
  page: string;
}

// In-memory rate limiting map for basic spam suppression (cooldown: 10s per IP)
const submissionCooldownMap = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "client-ip";
    const now = Date.now();
    const lastSubmission = submissionCooldownMap.get(ip);

    if (lastSubmission && now - lastSubmission < 10000) {
      return NextResponse.json(
        {
          success: false,
          error: "Please wait a few seconds before submitting another enquiry.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot spam check
    if (body.botcheck || body.website_hp) {
      console.warn("[SPAM_HONEYPOT_BLOCKED]", { ip, body });
      return NextResponse.json(
        { success: false, error: "Submission rejected." },
        { status: 400 }
      );
    }

    const rawValues: LeadFormValues = {
      name: body.name || "",
      phone: body.phone || "",
      email: body.email || "",
      education: body.education || "College Student",
      interestedProgram: body.interestedProgram || body.program || "General Enquiry",
      purpose: body.purpose || "Learn a New Skill",
      message: body.message || "",
    };

    // Strict Server-Side Validation
    const { isValid, errors } = validateLeadForm(rawValues);

    if (!isValid) {
      const firstError = Object.values(errors)[0];
      return NextResponse.json(
        {
          success: false,
          error: firstError || "Please provide valid contact information.",
          errors,
        },
        { status: 400 }
      );
    }

    // Sanitize and normalize payload
    const normalizedPhone = cleanPhoneNumber(rawValues.phone);
    const leadRecord: LeadSubmission = {
      name: rawValues.name.trim(),
      phone: normalizedPhone,
      email: rawValues.email.trim().toLowerCase(),
      education: rawValues.education.trim(),
      interestedProgram: rawValues.interestedProgram.trim(),
      purpose: rawValues.purpose.trim(),
      message: rawValues.message?.trim() || "",
      source: body.source || "contact-form",
      timestamp: new Date().toISOString(),
      page: body.page || "/",
    };

    // Update IP cooldown
    submissionCooldownMap.set(ip, now);

    // Clean old cooldown entries periodically
    if (submissionCooldownMap.size > 2000) {
      for (const [key, time] of submissionCooldownMap.entries()) {
        if (now - time > 60000) submissionCooldownMap.delete(key);
      }
    }

    // Log verified lead record server-side
    console.log("[NEXOVATE_LEAD_RECORDED]", JSON.stringify(leadRecord, null, 2));

    // Check if live Power Automate Webhook is configured
    const powerAutomateWebhook = process.env.POWER_AUTOMATE_WEBHOOK_URL;
    if (powerAutomateWebhook) {
      try {
        await fetch(powerAutomateWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadRecord),
        });
      } catch (err) {
        console.error("[POWER_AUTOMATE_ERROR]", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        demo: !powerAutomateWebhook,
        message: "Your enquiry has been successfully recorded.",
        lead: {
          name: leadRecord.name,
          program: leadRecord.interestedProgram,
          timestamp: leadRecord.timestamp,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[LEAD_SUBMISSION_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error processing enquiry." },
      { status: 500 }
    );
  }
}
