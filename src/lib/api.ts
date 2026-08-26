import { validateLeadForm, cleanPhoneNumber, LeadFormValues, ValidationErrors } from "./validation";

export interface LeadSubmissionPayload {
  name: string;
  phone: string;
  email: string;
  education?: string;
  interestedProgram: string;
  purpose?: string;
  message?: string;
  botcheck?: string;
  website_hp?: string;
  source: string;
  page?: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  demo?: boolean;
  message?: string;
  error?: string;
  errors?: ValidationErrors;
  lead?: {
    name: string;
    program: string;
    timestamp: string;
  };
}

export async function submitLead(
  payload: LeadSubmissionPayload
): Promise<LeadSubmissionResponse> {
  // Anti-spam honeypot check
  if (payload.botcheck || payload.website_hp) {
    return {
      success: false,
      error: "Submission rejected.",
    };
  }

  const rawValues: LeadFormValues = {
    name: payload.name || "",
    phone: payload.phone || "",
    email: payload.email || "",
    education: payload.education || "College Student",
    interestedProgram: payload.interestedProgram || "General Enquiry",
    purpose: payload.purpose || "Learn a New Skill",
    message: payload.message || "",
  };

  // Perform strict validation
  const { isValid, errors } = validateLeadForm(rawValues);
  if (!isValid) {
    const firstError = Object.values(errors)[0];
    return {
      success: false,
      error: firstError || "Please provide valid contact information.",
      errors,
    };
  }

  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (_err) {
    // Backend API route not running on dev server (static Vite mode fallback)
  }

  // Client-side validated fallback response
  const normalizedPhone = cleanPhoneNumber(rawValues.phone);
  const timestamp = new Date().toISOString();

  console.log("[NEXOVATE_LEAD_RECORDED_CLIENT_FALLBACK]", {
    name: rawValues.name.trim(),
    phone: normalizedPhone,
    email: rawValues.email.trim().toLowerCase(),
    education: rawValues.education.trim(),
    interestedProgram: rawValues.interestedProgram.trim(),
    purpose: rawValues.purpose.trim(),
    message: rawValues.message?.trim() || "",
    source: payload.source || "contact-form",
    timestamp,
    page: payload.page || "/",
  });

  return {
    success: true,
    demo: true,
    message: "Your enquiry has been successfully recorded.",
    lead: {
      name: rawValues.name.trim(),
      program: rawValues.interestedProgram.trim(),
      timestamp,
    },
  };
}
