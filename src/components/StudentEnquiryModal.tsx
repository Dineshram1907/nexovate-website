"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  User,
  Phone,
  Mail,
  GraduationCap,
  Compass,
  BookOpen,
  MessageSquare,
  ChevronDown,
  ShieldCheck,
  Zap,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Check,
} from "lucide-react";
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
  const {
    selectedProgram,
    isEnquiryModalOpen,
    openEnquiryModal,
    closeEnquiryModal,
  } = usePresentation();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isEnquiryModalOpen || internalIsOpen;

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

  // Sync selectedProgram if updated externally
  useEffect(() => {
    if (selectedProgram) {
      setFormData((prev) => ({ ...prev, interestedProgram: selectedProgram }));
    }
  }, [selectedProgram]);

  const handleClose = useCallback(() => {
    setInternalIsOpen(false);
    closeEnquiryModal();
  }, [closeEnquiryModal]);

  const handleUserInteraction = () => {
    // Kept as no-op for form interaction tracking if needed
  };

  // Keyboard accessibility: Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Viewport-safe document body scroll lock with exact scroll position preservation
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;

      // Prevent layout shift from scrollbar removal
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = "";
        window.scrollTo(0, scrollY);
      };
    }
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
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden pointer-events-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {/* Backdrop Blur & Dim (Stacking layer below modal dialog) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#081020]/45 backdrop-blur-[10px] -z-10 cursor-pointer"
          />

          {/* Modal Container: Viewport-Safe Split-Panel Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.985, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: 12 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleUserInteraction}
            className="relative w-full max-w-[1040px] md:h-[min(720px,calc(100dvh-48px))] max-h-[calc(100dvh-24px)] md:max-h-[calc(100dvh-48px)] bg-[#FAF9F5] rounded-[22px] sm:rounded-[26px] md:rounded-[30px] shadow-[0_28px_80px_rgba(8,16,32,0.3),0_10px_25px_rgba(0,0,0,0.08)] border border-[#101536]/10 overflow-hidden text-[#101536] flex flex-col md:flex-row z-10 my-auto"
          >
            {/* Close Button: Always accessible above all layers */}
            <button
              onClick={handleClose}
              aria-label="Close enquiry modal"
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 md:top-5 md:right-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#101536]/8 hover:bg-[#101536]/15 active:scale-95 text-[#101536] transition-all flex items-center justify-center cursor-pointer z-40 focus:outline-none focus:ring-2 focus:ring-[#119E9D]"
            >
              <X className="w-4 h-4 text-[#101536]" />
            </button>

            {/* ============================================================ */}
            {/* LEFT VISUAL / EDITORIAL PANEL (DESKTOP)                      */}
            {/* ============================================================ */}
            <div className="hidden md:flex md:w-[40%] lg:w-[39%] relative h-full overflow-hidden bg-[#ECE8DF] flex-col justify-between p-8 lg:p-9 shrink-0 select-none">
              {/* Editorial Workspace Photography */}
              <img
                src="/assets/modal-editorial.jpg"
                alt="Nexovate Workspace"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Editorial gradient overlay for soft daylight tone & contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5EE]/88 via-[#F7F5EE]/45 to-[#F7F5EE]/82 pointer-events-none" />

              {/* Single Top Nexovate Branding */}
              <div className="relative z-10">
                <span className="font-extrabold tracking-tight text-base text-[#101536]">
                  NEXOVATE<span className="text-[#119E9D]">.</span>
                </span>
                <p className="text-[9px] font-bold tracking-[0.24em] text-[#101536]/60 uppercase mt-1.5">
                  LEARN · BUILD · GROW
                </p>
              </div>

              {/* Headline & Value Pillars */}
              <div className="relative z-10 my-auto py-4">
                <h2 className="text-3xl lg:text-[36px] font-bold leading-[1.12] text-[#101536] tracking-tight font-jakarta">
                  A<br />
                  Brighter<br />
                  Tomorrow,<br />
                  <span className="font-serif italic font-normal text-[#101536]">
                    Built by You<span className="text-[#119E9D]">.</span>
                  </span>
                </h2>
                <div className="w-8 h-[2px] bg-[#101536]/20 my-4" />
                <div className="space-y-1 text-xs font-medium text-[#101536]/75">
                  <p>Real learning.</p>
                  <p>Real projects.</p>
                  <p>Real opportunities.</p>
                </div>
              </div>

              {/* Bottom Tagline */}
              <div className="relative z-10">
                <p className="text-[9px] font-bold tracking-[0.2em] text-[#101536]/60 uppercase leading-relaxed">
                  FOR CURIOUS<br />LEARNERS<br />AND BOLD BUILDERS.
                </p>
              </div>
            </div>

            {/* ============================================================ */}
            {/* MOBILE ART-DIRECTED HEADER (< md)                            */}
            {/* ============================================================ */}
            <div className="md:hidden relative h-[135px] sm:h-[150px] overflow-hidden bg-[#ECE8DF] shrink-0 p-4 sm:p-5 flex flex-col justify-between select-none">
              <img
                src="/assets/modal-editorial.jpg"
                alt="Nexovate Workspace"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F7F5EE]/92 via-[#F7F5EE]/70 to-[#F7F5EE]/85 pointer-events-none" />

              {/* Single Branding mark on mobile */}
              <div className="relative z-10 pr-10">
                <span className="font-extrabold tracking-tight text-sm text-[#101536]">
                  NEXOVATE<span className="text-[#119E9D]">.</span>
                </span>
                <p className="text-[8px] font-bold tracking-[0.2em] text-[#101536]/60 uppercase mt-0.5">
                  LEARN · BUILD · GROW
                </p>
              </div>

              <div className="relative z-10">
                <h2 className="text-base sm:text-lg font-bold text-[#101536] leading-tight font-jakarta">
                  A Brighter Tomorrow,{" "}
                  <span className="font-serif italic font-normal text-[#101536]">
                    Built by You<span className="text-[#119E9D]">.</span>
                  </span>
                </h2>
              </div>
            </div>

            {/* ============================================================ */}
            {/* RIGHT FORM PANEL (INTERNALLY SCROLLABLE)                     */}
            {/* ============================================================ */}
            <div className="flex-1 h-full overflow-y-auto overscroll-contain p-5 sm:p-6 lg:p-8 bg-white/85 backdrop-blur-md flex flex-col [scrollbar-width:thin] [scrollbar-color:rgba(16,21,54,0.15)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#101536]/15 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {status === "success" ? (
                <div className="py-10 px-4 text-center flex flex-col items-center justify-center my-auto">
                  <div className="w-14 h-14 rounded-full bg-[#119E9D]/12 text-[#119E9D] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#101536] mb-2 font-jakarta tracking-tight">
                    Thank You<span className="text-[#119E9D]">.</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E6675] max-w-sm mb-1 font-medium">
                    We've received your enquiry successfully.
                  </p>
                  <p className="text-xs text-[#5E6675]/80 max-w-sm mb-6">
                    An academic mentor will connect with you directly within 24 hours.
                  </p>
                  <button
                    onClick={handleClose}
                    className="min-h-[46px] px-7 py-2.5 rounded-full bg-[#101536] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0A0E27] transition-all cursor-pointer shadow-sm active:scale-98"
                  >
                    Return to Website
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5 text-left flex flex-col justify-between flex-1">
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

                  {/* Header Titles */}
                  <div className="pr-8">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-4 h-[2px] bg-[#119E9D] rounded-full" />
                      <span className="text-[10px] font-bold tracking-[0.2em] text-[#119E9D] uppercase">
                        LET'S GET STARTED
                      </span>
                    </div>
                    <h3 id="modal-headline" className="text-xl sm:text-2xl font-bold tracking-tight text-[#101536] font-jakarta">
                      Explore Your Learning{" "}
                      <span className="font-serif italic font-normal text-[#119E9D]">
                        Path.
                      </span>
                    </h3>
                    <p className="text-xs text-[#5E6675] mt-1 leading-relaxed font-normal">
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
                      <label className="text-[11px] font-bold text-[#101536] uppercase tracking-wider">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      {touched.name && !fieldErrors.name && (
                        <span className="text-[10px] text-[#119E9D] flex items-center gap-0.5 font-semibold">
                          <Check className="w-3 h-3" /> Valid
                        </span>
                      )}
                    </div>
                    <div className="relative flex items-center">
                      <User className="absolute left-3.5 w-4 h-4 text-[#8E95A5] pointer-events-none" />
                      <input
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur("name")}
                        placeholder="Your full name"
                        className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border text-xs text-[#101536] font-medium placeholder:text-[#8E95A5]/80 transition-all duration-200 focus:outline-none min-h-[44px] sm:min-h-[46px] ${
                          touched.name && fieldErrors.name
                            ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                            : "border-[#101536]/12 hover:border-[#101536]/25 focus:border-[#119E9D] focus:ring-2 focus:ring-[#119E9D]/15 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                        }`}
                      />
                    </div>
                    {touched.name && fieldErrors.name && (
                      <p className="text-[11px] text-red-500 mt-1 font-medium">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Field Grid: Phone & Email (Two Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Phone Number */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-[#101536] uppercase tracking-wider">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        {touched.phone && !fieldErrors.phone && (
                          <span className="text-[10px] text-[#119E9D] flex items-center gap-0.5 font-semibold">
                            <Check className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <div className="relative flex items-center">
                        <Phone className="absolute left-3.5 w-4 h-4 text-[#8E95A5] pointer-events-none" />
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
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border text-xs text-[#101536] font-medium placeholder:text-[#8E95A5]/80 transition-all duration-200 focus:outline-none min-h-[44px] sm:min-h-[46px] ${
                            touched.phone && fieldErrors.phone
                              ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                              : "border-[#101536]/12 hover:border-[#101536]/25 focus:border-[#119E9D] focus:ring-2 focus:ring-[#119E9D]/15 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                          }`}
                        />
                      </div>
                      {touched.phone && fieldErrors.phone && (
                        <p className="text-[11px] text-red-500 mt-1 font-medium">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-[#101536] uppercase tracking-wider">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        {touched.email && !fieldErrors.email && (
                          <span className="text-[10px] text-[#119E9D] flex items-center gap-0.5 font-semibold">
                            <Check className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3.5 w-4 h-4 text-[#8E95A5] pointer-events-none" />
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
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border text-xs text-[#101536] font-medium placeholder:text-[#8E95A5]/80 transition-all duration-200 focus:outline-none min-h-[44px] sm:min-h-[46px] ${
                            touched.email && fieldErrors.email
                              ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                              : "border-[#101536]/12 hover:border-[#101536]/25 focus:border-[#119E9D] focus:ring-2 focus:ring-[#119E9D]/15 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                          }`}
                        />
                      </div>
                      {touched.email && fieldErrors.email && (
                        <p className="text-[11px] text-red-500 mt-1 font-medium">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Field Grid: Education & Primary Purpose (Two Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Education */}
                    <div>
                      <label className="text-[11px] font-bold text-[#101536] uppercase tracking-wider block mb-1">
                        Education <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <GraduationCap className="absolute left-3.5 w-4 h-4 text-[#8E95A5] pointer-events-none" />
                        <select
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          onBlur={() => handleBlur("education")}
                          className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-[#101536]/12 hover:border-[#101536]/25 focus:border-[#119E9D] focus:ring-2 focus:ring-[#119E9D]/15 text-xs text-[#101536] font-medium appearance-none cursor-pointer transition-all duration-200 min-h-[44px] sm:min-h-[46px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:outline-none"
                        >
                          {VALID_EDUCATION_OPTIONS.map((edu) => (
                            <option key={edu} value={edu}>
                              {edu}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 w-4 h-4 text-[#8E95A5] pointer-events-none" />
                      </div>
                    </div>

                    {/* Primary Objective */}
                    <div>
                      <label className="text-[11px] font-bold text-[#101536] uppercase tracking-wider block mb-1">
                        Primary Purpose <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Compass className="absolute left-3.5 w-4 h-4 text-[#8E95A5] pointer-events-none" />
                        <select
                          name="purpose"
                          value={formData.purpose}
                          onChange={handleChange}
                          onBlur={() => handleBlur("purpose")}
                          className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-[#101536]/12 hover:border-[#101536]/25 focus:border-[#119E9D] focus:ring-2 focus:ring-[#119E9D]/15 text-xs text-[#101536] font-medium appearance-none cursor-pointer transition-all duration-200 min-h-[44px] sm:min-h-[46px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:outline-none"
                        >
                          {VALID_PURPOSE_OPTIONS.map((purp) => (
                            <option key={purp} value={purp}>
                              {purp}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 w-4 h-4 text-[#8E95A5] pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Field: Interested Program (Full Width) */}
                  <div>
                    <label className="text-[11px] font-bold text-[#101536] uppercase tracking-wider block mb-1">
                      Interested Track / Program <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <BookOpen className="absolute left-3.5 w-4 h-4 text-[#8E95A5] pointer-events-none" />
                      <select
                        name="interestedProgram"
                        value={formData.interestedProgram}
                        onChange={handleChange}
                        onBlur={() => handleBlur("interestedProgram")}
                        className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-[#101536]/12 hover:border-[#101536]/25 focus:border-[#119E9D] focus:ring-2 focus:ring-[#119E9D]/15 text-xs text-[#101536] font-medium appearance-none cursor-pointer transition-all duration-200 min-h-[44px] sm:min-h-[46px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:outline-none"
                      >
                        {VALID_PROGRAM_OPTIONS.map((prog) => (
                          <option key={prog} value={prog}>
                            {prog}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3.5 w-4 h-4 text-[#8E95A5] pointer-events-none" />
                    </div>
                  </div>

                  {/* Field: Optional Message (Full Width) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-bold text-[#101536] uppercase tracking-wider">
                        Specific Questions or Goal{" "}
                        <span className="text-[#8E95A5] font-normal lowercase">(optional)</span>
                      </label>
                      <span className="text-[10px] text-[#8E95A5] font-medium">
                        {formData.message.length}/500
                      </span>
                    </div>
                    <div className="relative flex items-start">
                      <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-[#8E95A5] pointer-events-none" />
                      <textarea
                        name="message"
                        rows={2}
                        maxLength={500}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur("message")}
                        placeholder="Tell us about your background or what you'd like to learn..."
                        className={`w-full pl-10 pr-3.5 py-2 rounded-xl bg-white border text-xs text-[#101536] font-medium placeholder:text-[#8E95A5]/80 transition-all duration-200 focus:outline-none resize-none min-h-[56px] sm:min-h-[60px] ${
                          touched.message && fieldErrors.message
                            ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                            : "border-[#101536]/12 hover:border-[#101536]/25 focus:border-[#119E9D] focus:ring-2 focus:ring-[#119E9D]/15 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                        }`}
                      />
                    </div>
                    {touched.message && fieldErrors.message && (
                      <p className="text-[11px] text-red-500 mt-1 font-medium">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button & Bottom Trust Indicators */}
                  <div className="pt-1 space-y-2.5">
                    <button
                      type="submit"
                      disabled={status === "loading" || !isFormValid}
                      className={`group w-full min-h-[48px] sm:min-h-[50px] inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-sm ${
                        status === "loading" || !isFormValid
                          ? "bg-[#101536]/25 text-white/70 cursor-not-allowed"
                          : "bg-[#101536] text-white hover:bg-[#0A0E27] active:scale-[0.99] shadow-md hover:shadow-lg cursor-pointer"
                      }`}
                    >
                      {status === "loading" ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Tell Us What You Need</span>
                          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform duration-200" />
                        </>
                      )}
                    </button>

                    {/* Trust Indicators */}
                    <div className="pt-2 border-t border-[#101536]/8 grid grid-cols-3 gap-1 sm:gap-2 text-[10px] text-[#5E6675]">
                      <div className="flex items-center gap-1.5 justify-center text-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#119E9D] shrink-0" />
                        <span className="leading-tight font-medium">Zero spam guarantee</span>
                      </div>
                      <div className="flex items-center gap-1.5 justify-center text-center border-x border-[#101536]/8 px-1">
                        <Zap className="w-3.5 h-3.5 text-[#119E9D] shrink-0" />
                        <span className="leading-tight font-medium">Direct mentor response in 24h</span>
                      </div>
                      <div className="flex items-center gap-1.5 justify-center text-center">
                        <UserCheck className="w-3.5 h-3.5 text-[#119E9D] shrink-0" />
                        <span className="leading-tight font-medium">Personalized guidance</span>
                      </div>
                    </div>
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
