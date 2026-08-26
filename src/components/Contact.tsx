"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Check } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { submitLead } from "@/lib/api";
import {
  validateName,
  validatePhone,
  validateEmail,
  validateMessage,
  ValidationErrors,
} from "@/lib/validation";

// DEMO CONTACT DATA — Replace before production launch.

export const Contact: React.FC = () => {
  const { selectedProgram, setSelectedProgram, inquiryType } = usePresentation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: selectedProgram || "Artificial Intelligence & Machine Learning",
    message: "",
    botcheck: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  useEffect(() => {
    if (selectedProgram) {
      setFormData((prev) => ({
        ...prev,
        program: selectedProgram,
      }));
    }
  }, [selectedProgram]);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "program") {
      setSelectedProgram(value);
    }
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const validateAll = (): boolean => {
    const nameErr = validateName(formData.name);
    const phoneErr = validatePhone(formData.phone);
    const emailErr = validateEmail(formData.email);
    const msgErr = validateMessage(formData.message);

    const errors: ValidationErrors = {};
    if (nameErr) errors.name = nameErr;
    if (phoneErr) errors.phone = phoneErr;
    if (emailErr) errors.email = emailErr;
    if (msgErr) errors.message = msgErr;

    setFieldErrors(errors);
    setTouched({
      name: true,
      phone: true,
      email: true,
      message: true,
    });

    return Object.keys(errors).length === 0;
  };

  const isFormValid =
    !validateName(formData.name) &&
    !validatePhone(formData.phone) &&
    !validateEmail(formData.email) &&
    !validateMessage(formData.message);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitTime < 15000) {
      setStatus("error");
      setErrorMessage("Please wait a few moments before submitting another message.");
      return;
    }

    const isValid = validateAll();
    if (!isValid) {
      setStatus("error");
      setErrorMessage("Please correct the highlighted fields before sending.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const data = await submitLead({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        interestedProgram: formData.program,
        message: formData.message.trim(),
        botcheck: formData.botcheck,
        source: inquiryType === "Institution Partnership" ? "institutions" : "contact-form",
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
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  return (
    <div className="relative w-full min-h-[100svh] lg:h-full flex flex-col justify-center py-16 sm:py-20 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#080C1E] text-white select-none border-b border-white/08">
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Subtle Section Label */}
        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#119E9D] uppercase">
            SLIDE 09 // DIRECT CONVERSATION
          </span>
          <span className="h-[1px] w-12 bg-[#119E9D]/40" />
        </div>

        {/* Quiet Luxury 2-Column Minimalist Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* LEFT 50% — Monumental Typography & Direct Contacts */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="text-3xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.05] mb-4">
              LET'S BUILD <br />
              <span className="text-[#119E9D]">WHAT'S NEXT</span>
              <span className="text-[#EFAF32]">.</span>
            </h2>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6 font-light max-w-md">
              Speak directly with an academic mentor regarding curriculum roadmaps, technical tracks, or institutional partnerships.
            </p>

            {/* Direct Coordinates */}
            <div className="space-y-2.5 pt-4 border-t border-white/10 w-full font-mono text-xs text-white/80">
              <div className="flex items-center gap-3">
                <span className="text-[#119E9D] w-16 uppercase text-[10px]">PHONE</span>
                <span className="text-white font-semibold">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#119E9D] w-16 uppercase text-[10px]">EMAIL</span>
                <span className="text-white font-semibold">hello@nexovate.in</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#119E9D] w-16 uppercase text-[10px]">OFFICE</span>
                <span className="text-white/80">Anna Nagar, Chennai, Tamil Nadu 600040</span>
              </div>
            </div>
          </div>

          {/* RIGHT 50% — Ultra-Clean Quiet Luxury Form */}
          <div className="lg:col-span-6 bg-white/03 border border-white/10 p-6 sm:p-8 backdrop-blur-xs rounded-2xl">
            {/* Selected Track Callout */}
            <div className="mb-4 pb-3 border-b border-white/10 flex items-center justify-between text-[11px] font-mono">
              <span className="text-white/60">SELECTED DISCIPLINE:</span>
              <span className="text-[#119E9D] font-bold uppercase">{formData.program}</span>
            </div>

            {status === "success" ? (
              <div className="py-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#119E9D]/20 text-[#119E9D] flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2">
                  THANK YOU.
                </h3>
                <p className="text-sm text-white/80 max-w-sm leading-relaxed mb-1 font-medium">
                  We've received your enquiry.
                </p>
                <p className="text-xs text-white/60 max-w-sm leading-relaxed mb-6">
                  We'll be in touch soon. An academic mentor will reach out within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="min-h-[44px] px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors rounded-full"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                {/* Honeypot */}
                <input
                  type="text"
                  name="botcheck"
                  value={formData.botcheck}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {status === "error" && (
                  <div className="p-2.5 bg-red-950/60 border border-red-500/50 text-red-300 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-mono font-bold text-white/70 uppercase">
                        Your Name *
                      </label>
                      {touched.name && !fieldErrors.name && (
                        <span className="text-[9px] font-mono text-[#119E9D] flex items-center gap-0.5">
                          <Check className="w-2.5 h-2.5" /> Valid
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      id="contact-name-input"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur("name")}
                      placeholder="Your full name"
                      required
                      className={`w-full px-3.5 py-2.5 bg-white/05 border rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                        touched.name && fieldErrors.name
                          ? "border-red-400 focus:ring-1 focus:ring-red-400"
                          : "border-white/15 focus:border-[#119E9D] focus:ring-1 focus:ring-[#119E9D]"
                      }`}
                    />
                    {touched.name && fieldErrors.name && (
                      <p className="text-[10px] text-red-400 mt-1 font-mono">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-mono font-bold text-white/70 uppercase">
                        Email Address *
                      </label>
                      {touched.email && !fieldErrors.email && (
                        <span className="text-[9px] font-mono text-[#119E9D] flex items-center gap-0.5">
                          <Check className="w-2.5 h-2.5" /> Valid
                        </span>
                      )}
                    </div>
                    <input
                      type="email"
                      name="email"
                      inputMode="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      placeholder="you@example.com"
                      required
                      className={`w-full px-3.5 py-2.5 bg-white/05 border rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                        touched.email && fieldErrors.email
                          ? "border-red-400 focus:ring-1 focus:ring-red-400"
                          : "border-white/15 focus:border-[#119E9D] focus:ring-1 focus:ring-[#119E9D]"
                      }`}
                    />
                    {touched.email && fieldErrors.email && (
                      <p className="text-[10px] text-red-400 mt-1 font-mono">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-mono font-bold text-white/70 uppercase">
                        Phone Number *
                      </label>
                      {touched.phone && !fieldErrors.phone && (
                        <span className="text-[9px] font-mono text-[#119E9D] flex items-center gap-0.5">
                          <Check className="w-2.5 h-2.5" /> Valid
                        </span>
                      )}
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      inputMode="numeric"
                      maxLength={15}
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur("phone")}
                      placeholder="98765 43210"
                      required
                      className={`w-full px-3.5 py-2.5 bg-white/05 border rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                        touched.phone && fieldErrors.phone
                          ? "border-red-400 focus:ring-1 focus:ring-red-400"
                          : "border-white/15 focus:border-[#119E9D] focus:ring-1 focus:ring-[#119E9D]"
                      }`}
                    />
                    {touched.phone && fieldErrors.phone && (
                      <p className="text-[10px] text-red-400 mt-1 font-mono">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-white/70 uppercase block mb-1">
                      Program Track
                    </label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#080C1E] border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#119E9D] transition-colors"
                    >
                      <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</option>
                      <option value="Full Stack Web Development">Full Stack Web Development</option>
                      <option value="Data Science & Analytics">Data Science & Analytics</option>
                      <option value="Cloud Computing & DevOps">Cloud Computing & DevOps</option>
                      <option value="Cybersecurity Foundations">Cybersecurity Foundations</option>
                      <option value="Emerging Technologies">Emerging Technologies</option>
                      <option value="Institutional Partnership">Institutional Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] font-mono font-bold text-white/70 uppercase">
                      Learning Intent / Goals <span className="text-white/40 font-normal lowercase">(optional)</span>
                    </label>
                    <span className="text-[9px] font-mono text-white/40">
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
                    placeholder="Tell us what you'd like to achieve..."
                    className={`w-full px-3.5 py-2 bg-white/05 border rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none transition-colors resize-none ${
                      touched.message && fieldErrors.message
                        ? "border-red-400 focus:ring-1 focus:ring-red-400"
                        : "border-white/15 focus:border-[#119E9D] focus:ring-1 focus:ring-[#119E9D]"
                    }`}
                  />
                  {touched.message && fieldErrors.message && (
                    <p className="text-[10px] text-red-400 mt-1 font-mono">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading" || !isFormValid}
                  className={`w-full min-h-[46px] rounded-full font-mono font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 ${
                    status === "loading" || !isFormValid
                      ? "bg-white/10 text-white/40 cursor-not-allowed"
                      : "bg-[#119E9D] hover:bg-[#15b5b4] text-white cursor-pointer shadow-md"
                  }`}
                >
                  {status === "loading" ? (
                    <span>TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>TRANSMIT ENQUIRY</span>
                      <Send className="w-3.5 h-3.5 text-[#EFAF32]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
