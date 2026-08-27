"use client";

import React, { useState, useEffect } from "react";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const sanitized = value.replace(/[^\d\s\-\+\(\)]/g, "");
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (touched[name]) {
      let err = "";
      if (name === "name") err = validateName(value) || "";
      if (name === "email") err = validateEmail(value) || "";
      if (name === "phone") err = validatePhone(value) || "";
      if (name === "message") err = validateMessage(value) || "";

      setFieldErrors((prev) => ({
        ...prev,
        [name]: err,
      }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let err = "";
    if (field === "name") err = validateName(formData.name) || "";
    if (field === "email") err = validateEmail(formData.email) || "";
    if (field === "phone") err = validatePhone(formData.phone) || "";
    if (field === "message") err = validateMessage(formData.message) || "";

    setFieldErrors((prev) => ({
      ...prev,
      [field]: err,
    }));
  };

  const validateAll = (): boolean => {
    const errors: ValidationErrors = {};

    const nameErr = validateName(formData.name);
    if (nameErr) errors.name = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) errors.phone = phoneErr;

    const messageErr = validateMessage(formData.message);
    if (messageErr) errors.message = messageErr;

    setFieldErrors(errors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      program: true,
      message: true,
    });

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.botcheck) {
      setStatus("success");
      return;
    }

    const isValid = validateAll();
    if (!isValid) return;

    const now = Date.now();
    if (now - lastSubmitTime < 60000 && lastSubmitTime !== 0) {
      setStatus("error");
      setErrorMessage("Please wait 1 minute before submitting another enquiry.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const data = await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        interestedProgram: formData.program,
        message: formData.message,
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
    <div className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-notebook-grid text-[#101536] select-none border-b border-[#101536]/06 overflow-x-clip">
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Subtle Section Label */}
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-[#101536]/10">
          <span className="text-xs font-bold tracking-[0.2em] text-[#6366F1] uppercase">
            DIRECT CONVERSATION
          </span>
          <span className="h-[1px] w-12 bg-[#6366F1]/40" />
        </div>

        {/* High-Contrast 2-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* LEFT 50% — Monumental Typography & Direct Contacts */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-[#101536] leading-[1.05] mb-4 font-jakarta">
              LET'S BUILD <br />
              <span className="text-[#6366F1]">WHAT'S NEXT</span>
              <span className="text-[#F97316]">.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#5E6675] leading-relaxed mb-6 font-medium max-w-md">
              Speak directly with an academic mentor regarding curriculum roadmaps, technical tracks, or institutional partnerships.
            </p>

            {/* Direct Coordinates */}
            <div className="space-y-3 pt-6 border-t border-[#101536]/10 w-full text-xs text-[#101536]">
              <div className="flex items-center gap-3">
                <span className="text-[#6366F1] font-bold w-16 uppercase text-[10px]">PHONE</span>
                <span className="text-[#101536] font-bold">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#6366F1] font-bold w-16 uppercase text-[10px]">EMAIL</span>
                <span className="text-[#101536] font-bold">hello@nexovate.in</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#6366F1] font-bold w-16 uppercase text-[10px]">OFFICE</span>
                <span className="text-[#5E6675] font-medium">Anna Nagar, Chennai, Tamil Nadu 600040</span>
              </div>
            </div>
          </div>

          {/* RIGHT 50% — High Contrast White Paper Form Card */}
          <div className="lg:col-span-6 bg-white border border-[#101536]/12 p-6 sm:p-8 rounded-3xl shadow-xl">
            {/* Selected Track Callout */}
            <div className="mb-6 pb-3 border-b border-[#101536]/10 flex items-center justify-between text-xs">
              <span className="text-[#5E6675] font-medium">SELECTED DISCIPLINE:</span>
              <span className="text-[#6366F1] font-bold uppercase">{formData.program}</span>
            </div>

            {status === "success" ? (
              <div className="py-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#101536] mb-2 font-jakarta">
                  THANK YOU.
                </h3>
                <p className="text-sm text-[#5E6675] max-w-sm leading-relaxed mb-1 font-medium">
                  We've received your enquiry.
                </p>
                <p className="text-xs text-[#5E6675]/80 max-w-sm leading-relaxed mb-6">
                  We'll be in touch soon. An academic mentor will reach out within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="min-h-[44px] px-6 py-2.5 bg-[#101536] hover:bg-[#6366F1] text-white text-xs uppercase tracking-wider transition-colors rounded-xl font-bold cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
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
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-[#101536] uppercase tracking-wider">
                        Your Name *
                      </label>
                      {touched.name && !fieldErrors.name && (
                        <span className="text-[10px] text-[#10B981] flex items-center gap-0.5 font-bold">
                          <Check className="w-3 h-3" /> Valid
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
                      className={`w-full px-4 py-3 bg-[#FAFBFC] border rounded-xl text-xs text-[#101536] placeholder:text-[#5E6675]/50 focus:outline-none transition-colors ${
                        touched.name && fieldErrors.name
                          ? "border-red-400 focus:ring-1 focus:ring-red-400"
                          : "border-[#101536]/15 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                      }`}
                    />
                    {touched.name && fieldErrors.name && (
                      <p className="text-[10px] text-red-500 mt-1">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-[#101536] uppercase tracking-wider">
                        Email Address *
                      </label>
                      {touched.email && !fieldErrors.email && (
                        <span className="text-[10px] text-[#10B981] flex items-center gap-0.5 font-bold">
                          <Check className="w-3 h-3" /> Valid
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
                      className={`w-full px-4 py-3 bg-[#FAFBFC] border rounded-xl text-xs text-[#101536] placeholder:text-[#5E6675]/50 focus:outline-none transition-colors ${
                        touched.email && fieldErrors.email
                          ? "border-red-400 focus:ring-1 focus:ring-red-400"
                          : "border-[#101536]/15 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                      }`}
                    />
                    {touched.email && fieldErrors.email && (
                      <p className="text-[10px] text-red-500 mt-1">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-[#101536] uppercase tracking-wider">
                        Phone Number *
                      </label>
                      {touched.phone && !fieldErrors.phone && (
                        <span className="text-[10px] text-[#10B981] flex items-center gap-0.5 font-bold">
                          <Check className="w-3 h-3" /> Valid
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
                      className={`w-full px-4 py-3 bg-[#FAFBFC] border rounded-xl text-xs text-[#101536] placeholder:text-[#5E6675]/50 focus:outline-none transition-colors ${
                        touched.phone && fieldErrors.phone
                          ? "border-red-400 focus:ring-1 focus:ring-red-400"
                          : "border-[#101536]/15 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                      }`}
                    />
                    {touched.phone && fieldErrors.phone && (
                      <p className="text-[10px] text-red-500 mt-1">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#101536] uppercase block mb-1.5 tracking-wider">
                      Program / Track
                    </label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#FAFBFC] border border-[#101536]/15 rounded-xl text-xs text-[#101536] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors cursor-pointer"
                    >
                      <option value="Artificial Intelligence & Machine Learning">
                        AI & Machine Learning
                      </option>
                      <option value="Full Stack Web Engineering">
                        Full Stack Web Engineering
                      </option>
                      <option value="Data Science & Predictive Analytics">
                        Data Science & Analytics
                      </option>
                      <option value="Cloud Computing & DevOps Workflows">
                        Cloud & DevOps Workflows
                      </option>
                      <option value="Institutional Partnership">
                        Institutional Partnership
                      </option>
                      <option value="Other General Enquiry">
                        Other General Enquiry
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-[#101536] uppercase tracking-wider">
                      Message or Inquiry *
                    </label>
                    {touched.message && !fieldErrors.message && (
                      <span className="text-[10px] text-[#10B981] flex items-center gap-0.5 font-bold">
                        <Check className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </div>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur("message")}
                    placeholder="Tell us about your learning goals or questions..."
                    required
                    className={`w-full px-4 py-3 bg-[#FAFBFC] border rounded-xl text-xs text-[#101536] placeholder:text-[#5E6675]/50 focus:outline-none transition-colors ${
                      touched.message && fieldErrors.message
                        ? "border-red-400 focus:ring-1 focus:ring-red-400"
                        : "border-[#101536]/15 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                    }`}
                  />
                  {touched.message && fieldErrors.message && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="min-h-[48px] w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#6366F1] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4F46E5] transition-all duration-200 shadow-md disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                >
                  {status === "loading" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <Send className="w-4 h-4" />
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
