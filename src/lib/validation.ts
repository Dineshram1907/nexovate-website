export interface LeadFormValues {
  name: string;
  phone: string;
  email: string;
  education: string;
  interestedProgram: string;
  purpose: string;
  message?: string;
  botcheck?: string;
}

export interface ValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  education?: string;
  interestedProgram?: string;
  purpose?: string;
  message?: string;
}

export const VALID_EDUCATION_OPTIONS = [
  "School Student",
  "College Student",
  "Graduate",
  "Working Professional",
  "Other",
] as const;

export const VALID_PROGRAM_OPTIONS = [
  "Artificial Intelligence & Machine Learning",
  "Full Stack Web Development",
  "Data Science & Analytics",
  "Cloud Computing & DevOps",
  "Cybersecurity Foundations",
  "Emerging Technologies",
  "General Enquiry",
  "Institutional Partnership",
] as const;

export const VALID_PURPOSE_OPTIONS = [
  "Learn a New Skill",
  "Build Projects",
  "Career Preparation",
  "Internship / Industry Exposure",
  "Institution Partnership",
  "General Enquiry",
] as const;

// Common fake / keyboard-mash words to reject
const FAKE_STRING_PATTERNS = [
  /^asdf+$/i,
  /^asdfgh+$/i,
  /^qwerty+$/i,
  /^test(ing)?$/i,
  /^abc+d?$/i,
  /^dummy$/i,
  /^sample$/i,
  /^x{2,}$/i,
  /^z{3,}$/i,
  /^sdf+$/i,
  /^dfg+$/i,
  /^fsdf+$/i,
  /^sf$/i,
  /^hello(123)?$/i,
  /^na$/i,
  /^none$/i,
];

// Repeating digit strings: 0000000000 - 9999999999 and sequential fake test numbers
const REPEATED_DIGIT_PATTERN = /^(\d)\1{9}$/;
const FAKE_SEQUENTIAL_NUMBERS = ["1234567890", "0123456789", "0000000000", "1111111111"];

/**
 * Normalizes Indian and global phone numbers to 10 clean digits
 */
export function cleanPhoneNumber(rawPhone: string): string {
  if (!rawPhone) return "";
  // Remove non-digit characters except +
  let cleaned = rawPhone.replace(/[^\d+]/g, "").trim();

  // Strip leading +91 or 91 if it results in a 10-digit number
  if (cleaned.startsWith("+91") && cleaned.length === 13) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith("91") && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith("0") && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }

  // Remove any remaining non-digits
  return cleaned.replace(/\D/g, "");
}

/**
 * Validates Full Name
 */
export function validateName(name: string): string | null {
  const trimmed = name ? name.trim() : "";
  if (!trimmed) {
    return "Please enter your full name.";
  }
  if (trimmed.length < 2) {
    return "Please enter your full name (minimum 2 characters).";
  }
  if (trimmed.length > 60) {
    return "Name cannot exceed 60 characters.";
  }

  // Must only contain letters, spaces, periods, apostrophes, hyphens
  const nameRegex = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s.'-]+$/;
  if (!nameRegex.test(trimmed)) {
    return "Please enter a valid name (letters only, no numbers or special symbols).";
  }

  // Reject obvious single words that are fake/keyboard-mashing
  const lower = trimmed.toLowerCase();
  for (const pattern of FAKE_STRING_PATTERNS) {
    if (pattern.test(lower)) {
      return "Please enter your real full name.";
    }
  }

  // Must contain at least two letters
  const letterCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
  if (letterCount < 2) {
    return "Please enter your full name.";
  }

  return null;
}

/**
 * Validates Phone Number
 */
export function validatePhone(phone: string): string | null {
  const raw = phone ? phone.trim() : "";
  if (!raw) {
    return "Please enter your mobile number.";
  }

  const cleaned = cleanPhoneNumber(raw);

  // Must be exactly 10 digits
  if (cleaned.length !== 10) {
    return "Please enter a valid 10-digit mobile number.";
  }

  // Reject repeating numbers (0000000000, 1111111111, etc.)
  if (REPEATED_DIGIT_PATTERN.test(cleaned)) {
    return "Please enter a genuine 10-digit mobile number.";
  }

  // Reject obvious fake test sequences like 1234567890
  if (FAKE_SEQUENTIAL_NUMBERS.includes(cleaned)) {
    return "Please enter a genuine 10-digit mobile number.";
  }

  return null;
}

/**
 * Validates Email Address
 */
export function validateEmail(email: string): string | null {
  const trimmed = email ? email.trim() : "";
  if (!trimmed) {
    return "Please enter your email address.";
  }

  // RFC-compliant strict email format regex
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(trimmed)) {
    return "Please enter a valid email address.";
  }

  // Check for minimum domain extension length
  const parts = trimmed.split("@");
  if (parts.length !== 2) return "Please enter a valid email address.";
  const domain = parts[1].toLowerCase();
  const domainParts = domain.split(".");
  if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) {
    return "Please enter a valid email address.";
  }

  // Reject known fake domains / local parts
  if (
    parts[0].toLowerCase() === "test" &&
    (domain === "test.com" || domain === "example.com")
  ) {
    return "Please enter your genuine email address.";
  }

  return null;
}

/**
 * Validates Education Level
 */
export function validateEducation(education: string): string | null {
  if (!education || !VALID_EDUCATION_OPTIONS.includes(education as any)) {
    return "Please select your current education level.";
  }
  return null;
}

/**
 * Validates Interested Program
 */
export function validateProgram(program: string): string | null {
  if (!program || program.trim().length === 0) {
    return "Please select a program of interest.";
  }
  return null;
}

/**
 * Validates Primary Purpose
 */
export function validatePurpose(purpose: string): string | null {
  if (!purpose || !VALID_PURPOSE_OPTIONS.includes(purpose as any)) {
    return "Please select your primary objective.";
  }
  return null;
}

/**
 * Validates Optional Message
 */
export function validateMessage(message?: string): string | null {
  if (!message || message.trim().length === 0) {
    return null; // Optional
  }

  const trimmed = message.trim();
  if (trimmed.length < 10) {
    return "Please enter a little more detail (minimum 10 characters).";
  }
  if (trimmed.length > 500) {
    return "Message cannot exceed 500 characters.";
  }

  // Reject messages containing only numbers or only symbols
  const hasLetters = /[a-zA-Z]/.test(trimmed);
  if (!hasLetters) {
    return "Please enter a little more detail.";
  }

  // Reject messages that are purely repeated characters (e.g. 'aaaaaa', 'asdfgh')
  const uniqueChars = new Set(trimmed.replace(/\s/g, "")).size;
  if (uniqueChars < 3) {
    return "Please enter a little more detail.";
  }

  return null;
}

/**
 * Comprehensive Validation Function
 */
export function validateLeadForm(values: LeadFormValues): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  const nameErr = validateName(values.name);
  if (nameErr) errors.name = nameErr;

  const phoneErr = validatePhone(values.phone);
  if (phoneErr) errors.phone = phoneErr;

  const emailErr = validateEmail(values.email);
  if (emailErr) errors.email = emailErr;

  const eduErr = validateEducation(values.education);
  if (eduErr) errors.education = eduErr;

  const progErr = validateProgram(values.interestedProgram);
  if (progErr) errors.interestedProgram = progErr;

  const purpErr = validatePurpose(values.purpose);
  if (purpErr) errors.purpose = purpErr;

  const msgErr = validateMessage(values.message);
  if (msgErr) errors.message = msgErr;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
