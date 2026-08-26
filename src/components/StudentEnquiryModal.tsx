"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, CheckCircle2, AlertCircle, ArrowRight, Check } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { submitLead } from "@/lib/api";
import {
  validateName,
  validatePhone,
  validateEmail,
  validateEducation,
  validateProgram,
  validatePurpose,
  validateMessage,
  VALID_EDUCATION_OPTIONS,
  VALID_PROGRAM_OPTIONS,
  VALID_PURPOSE_OPTIONS,
  ValidationErrors,
} from "@/lib/validation";

export const StudentEnquiryModal: React.FC = () => {
  const { selectedProgram } = usePresentation();
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    education: "College Student",
    interestedProgram: selectedProgram || "Artificial Intelligence & Machine Learning",
    purpose: "Learn a New Skill",
    message: "",
    botcheck: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync selectedProgram if updated externally
  useEffect(() => {
    if (selectedProgram) {
      setFormData((prev) => ({ ...prev, interestedProgram: selectedProgram }));
    }
  }, [selectedProgram]);

  // Step 1: Trigger popup on entering or refreshing the website (1.5s after load)
  useEffect(() => {
    initialTimerRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => {
      if (initialTimerRef.current) clearTimeout(initialTimerRef.current);
    };
  }, []);

  // Step 2: 8-second inactivity auto-dismiss (dissolves if no action is performed)
  const startInactivityTimer = useCallback(() => {
    if (hasInteracted) return;

    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 8000);
  }, [hasInteracted]);

  useEffect(() => {
    if (isOpen && !hasInteracted) {
      startInactivityTimer();
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [isOpen, hasInteracted, startInactivityTimer]);

  // Pause & cancel inactivity timer whenever user interacts with the form
  const handleUserInteraction = () => {
    setHasInteracted(true);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  };

  // Keyboard accessibility: Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Validate single field on blur or change
  const validateField = (name: string, value: string) => {
    let error: string | null = null;
    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "education":
        error = validateEducation(value);
        break;
      case "interestedProgram":
        error = validateProgram(value);
        break;
      case "purpose":
        error = validatePurpose(value);
        break;
      case "message":
        error = validateMessage(value);
        break;
      default:
        break;
    }

    setFieldErrors((prev) => ({
      ...prev,
      [name]: error || undefined,
    }));
    return error;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, (formData as any)[field]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    handleUserInteraction();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Validate all fields
  const validateAll = (): boolean => {
    const nameErr = validateName(formData.name);
    const phoneErr = validatePhone(formData.phone);
    const emailErr = validateEmail(formData.email);
    const eduErr = validateEducation(formData.education);
    const progErr = validateProgram(formData.interestedProgram);
    const purpErr = validatePurpose(formData.purpose);
    const msgErr = validateMessage(formData.message);

    const errors: ValidationErrors = {};
    if (nameErr) errors.name = nameErr;
    if (phoneErr) errors.phone = phoneErr;
    if (emailErr) errors.email = emailErr;
    if (eduErr) errors.education = eduErr;
    if (progErr) errors.interestedProgram = progErr;
    if (purpErr) errors.purpose = purpErr;
    if (msgErr) errors.message = msgErr;

    setFieldErrors(errors);
    setTouched({
      name: true,
      phone: true,
      email: true,
      education: true,
      interestedProgram: true,
      purpose: true,
      message: true,
    });

    return Object.keys(errors).length === 0;
  };

  // Form Validity Check for Button State
  const isFormValid =
    !validateName(formData.name) &&
    !validatePhone(formData.phone) &&
    !validateEmail(formData.email) &&
    !validateEducation(formData.education) &&
    !validateProgram(formData.interestedProgram) &&
    !validatePurpose(formData.purpose) &&
    !validateMessage(formData.message);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleUserInteraction();

    // Anti-spam cooldown check (15s)
    const now = Date.now();
    if (now - lastSubmitTime < 15000) {
      setStatus("error");
      setErrorMessage("Please wait a few moments before submitting another enquiry.");
      return;
    }

    const isValid = validateAll();
    if (!isValid) {
      setStatus("error");
      setErrorMessage("Please correct the highlighted fields before submitting.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const data = await submitLead({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        education: formData.education,
        interestedProgram: formData.interestedProgram,
        purpose: formData.purpose,
        message: formData.message.trim(),
        botcheck: formData.botcheck,
        source: "timed-popup",
        page: typeof window !== "undefined" ? window.location.pathname : "/",
      });

      if (data.success) {
        setStatus("success");
        setLastSubmitTime(now);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit enquiry. Please check your information.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleUserInteraction}
            className="relative w-full max-w-lg bg-[#FAFBFC] rounded-3xl shadow-2xl border border-[#101536]/10 overflow-hidden z-10 my-auto text-[#101536]"
          >
            {/* Top Brand Header Bar */}
            <div className="bg-[#101536] text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#119E9D] animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-[0.18em] text-[#EFAF32] uppercase">
                  ADMISSIONS & LEARNING ENQUIRY
                </span>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close enquiry popup"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#119E9D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7 max-h-[80vh] overflow-y-auto">
              {status === "success" ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#119E9D]/10 text-[#119E9D] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#101536] mb-2">
                    THANK YOU.
                  </h3>
                  <p className="text-sm text-[#5E6675] max-w-xs mb-1 font-medium">
                    We've received your enquiry.
                  </p>
                  <p className="text-xs text-[#5E6675]/80 max-w-xs mb-6">
                    We'll be in touch soon. An academic mentor will reach out to you directly.
                  </p>
                  <button
                    onClick={handleClose}
                    className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#101536] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#119E9D] transition-colors"
                  >
                    RETURN TO WEBSITE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Honeypot Spam Protection Field */}
                  <input
                    type="text"
                    name="botcheck"
                    value={formData.botcheck}
                    onChange={handleChange}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Heading & Subhead */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#101536]">
                      Explore Your Learning Path<span className="text-[#119E9D]">.</span>
                    </h3>
                    <p className="text-xs text-[#5E6675] mt-1 font-normal">
                      Share your goals and an academic mentor will guide you through relevant curriculum details and hands-on cohorts.
                    </p>
                  </div>

                  {/* Error Alert Box if any */}
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Field: Full Name */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold font-mono text-[#101536] uppercase tracking-wider">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      {touched.name && !fieldErrors.name && (
                        <span className="text-[10px] font-mono text-[#119E9D] flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> Valid
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur("name")}
                      placeholder="Your full name"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-[#101536] transition-colors focus:outline-none ${
                        touched.name && fieldErrors.name
                          ? "border-red-400 focus:ring-1 focus:ring-red-400"
                          : "border-[#101536]/15 focus:border-[#119E9D] focus:ring-1 focus:ring-[#119E9D]"
                      }`}
                    />
                    {touched.name && fieldErrors.name && (
                      <p className="text-[11px] text-red-500 mt-1 font-medium">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Field Grid: Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Phone Number */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold font-mono text-[#101536] uppercase tracking-wider">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        {touched.phone && !fieldErrors.phone && (
                          <span className="text-[10px] font-mono text-[#119E9D] flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        inputMode="numeric"
                        maxLength={15}
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={() => handleBlur("phone")}
                        placeholder="98765 43210"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-[#101536] transition-colors focus:outline-none ${
                          touched.phone && fieldErrors.phone
                            ? "border-red-400 focus:ring-1 focus:ring-red-400"
                            : "border-[#101536]/15 focus:border-[#119E9D] focus:ring-1 focus:ring-[#119E9D]"
                        }`}
                      />
                      {touched.phone && fieldErrors.phone && (
                        <p className="text-[11px] text-red-500 mt-1 font-medium">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold font-mono text-[#101536] uppercase tracking-wider">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        {touched.email && !fieldErrors.email && (
                          <span className="text-[10px] font-mono text-[#119E9D] flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        inputMode="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        placeholder="you@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-[#101536] transition-colors focus:outline-none ${
                          touched.email && fieldErrors.email
                            ? "border-red-400 focus:ring-1 focus:ring-red-400"
                            : "border-[#101536]/15 focus:border-[#119E9D] focus:ring-1 focus:ring-[#119E9D]"
                        }`}
                      />
                      {touched.email && fieldErrors.email && (
                        <p className="text-[11px] text-red-500 mt-1 font-medium">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Field Grid: Education & Purpose */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Education */}
                    <div>
                      <label className="text-xs font-bold font-mono text-[#101536] uppercase tracking-wider block mb-1">
                        Education <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        onBlur={() => handleBlur("education")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#101536]/15 text-xs text-[#101536] focus:border-[#119E9D] focus:ring-1 focus:ring-[#119E9D] focus:outline-none"
                      >
                        {VALID_EDUCATION_OPTIONS.map((edu) => (
                          <option key={edu} value={edu}>
                            {edu}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Primary Objective */}
                    <div>
                      <label className="text-xs font-bold font-mono text-[#101536] uppercase tracking-wider block mb-1">
                        Primary Purpose <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        onBlur={() => handleBlur("purpose")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#101536]/15 text-xs text-[#101536] focus:border-[#119E9D] focus:ring-1 focus:ring-[#119E9D] focus:outline-none"
                      >
                        {VALID_PURPOSE_OPTIONS.map((purp) => (
                          <option key={purp} value={purp}>
                            {purp}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Field: Interested Program */}
                  <div>
                    <label className="text-xs font-bold font-mono text-[#101536] uppercase tracking-wider block mb-1">
                      Interested Track / Program <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="interestedProgram"
                      value={formData.interestedProgram}
                      onChange={handleChange}
                      onBlur={() => handleBlur("interestedProgram")}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#101536]/15 text-xs text-[#101536] focus:border-[#119E9D] focus:ring-1 focus:ring-[#119E9D] focus:outline-none"
                    >
                      {VALID_PROGRAM_OPTIONS.map((prog) => (
                        <option key={prog} value={prog}>
                          {prog}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Field: Optional Message */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold font-mono text-[#101536] uppercase tracking-wider">
                        Specific Questions or Goal <span className="text-[#5E6675] font-normal lowercase">(optional)</span>
                      </label>
                      <span className="text-[10px] font-mono text-[#5E6675]">
                        {formData.message.length}/500
                      </span>
                    </div>
                    <textarea
                      name="message"
                      rows={2}
                      maxLength={500}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur("message")}
                      placeholder="Tell us about your background or what you'd like to learn..."
                      className={`w-full px-3.5 py-2 rounded-xl bg-white border text-xs text-[#101536] transition-colors focus:outline-none resize-none ${
                        touched.message && fieldErrors.message
                          ? "border-red-400 focus:ring-1 focus:ring-red-400"
                          : "border-[#101536]/15 focus:border-[#119E9D] focus:ring-1 focus:ring-[#119E9D]"
                      }`}
                    />
                    {touched.message && fieldErrors.message && (
                      <p className="text-[11px] text-red-500 mt-1 font-medium">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading" || !isFormValid}
                      className={`w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-sm ${
                        status === "loading" || !isFormValid
                          ? "bg-[#101536]/30 text-white/70 cursor-not-allowed"
                          : "bg-[#101536] text-white hover:bg-[#119E9D] hover:-translate-y-0.5 cursor-pointer"
                      }`}
                    >
                      {status === "loading" ? (
                        <span>SUBMITTING...</span>
                      ) : (
                        <>
                          <span>TELL US WHAT YOU NEED</span>
                          <ArrowRight className="w-4 h-4 text-[#EFAF32]" />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] font-mono text-center text-[#5E6675]/80 mt-2">
                      Zero spam guarantee • Direct mentor response within 24 hours
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
