import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Check,
  Sparkles,
} from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { submitLead } from "@/lib/api";
import {
  validateName,
  validatePhone,
  validateEmail,
  validateMessage,
  ValidationErrors,
} from "@/lib/validation";
import { SEO } from "@/components/SEO";
import { MotionButton } from "@/components/motion";
import { pageTransitionVariants } from "@/lib/motion";

export const Contact: React.FC = () => {
  const { selectedProgram } = usePresentation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: selectedProgram || "Artificial Intelligence & Machine Learning",
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
        course: selectedProgram,
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
      course: true,
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
        interestedProgram: formData.course,
        message: formData.message,
        botcheck: formData.botcheck,
        source: "contact-page",
        page: "/contact",
      });

      if (data.success) {
        setStatus("success");
        setLastSubmitTime(now);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit enquiry. Please verify your details.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative w-full min-h-screen bg-[#FAFBFC] text-[#101536] select-none font-sans overflow-x-clip"
    >
      <SEO
        title="Contact Nexovate — Start Your Learning Journey"
        description="Connect directly with Nexovate's admissions counseling team for cohort schedules, scholarship inquiries, and track roadmaps."
      />

      {/* 1. EDITORIAL HERO HEADER */}
      <section className="relative pt-20 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-12 border-b border-[#101536]/06 bg-notebook-grid text-left">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
              <span className="text-xs font-bold tracking-wider text-[#6366F1] uppercase">
                DIRECT ADMISSIONS & ADVISORY
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-black tracking-tight text-[#101536] leading-[1.04] mb-4 font-jakarta">
              LET'S TALK <br />
              <span className="text-[#6366F1]">ABOUT YOUR NEXT STEP</span>
              <span className="text-[#F97316]">.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5E6675] font-normal leading-relaxed max-w-2xl">
              Connect directly with our admissions counseling team and academic mentors. We typically respond within 24 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SPLIT LAYOUT: COORDINATES (LEFT) & FORM (RIGHT) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#101536]/06 text-left">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT 50% — Direct Contact Coordinates */}
            <div className="lg:col-span-6 flex flex-col items-start space-y-6">
              <div>
                <span className="text-xs font-bold tracking-wider text-[#5E6675] uppercase block mb-1">
                  OFFICE & ADVISORY DESK
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#101536] font-jakarta">
                  We're Here to Help You Navigate Your Options.
                </h3>
              </div>

              <div className="space-y-4 w-full">
                <div className="p-5 rounded-2xl bg-[#FAFBFC] border border-[#101536]/08 flex items-start gap-4 shadow-xs">
                  <div className="w-11 h-11 rounded-xl bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#5E6675] uppercase block">
                      PHONE SUPPORT
                    </span>
                    <span className="text-sm font-bold text-[#101536] block">
                      +91 98765 43210
                    </span>
                    <span className="text-xs text-[#5E6675] font-medium">
                      Mon–Sat from 9:30 AM to 6:30 PM IST
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAFBFC] border border-[#101536]/08 flex items-start gap-4 shadow-xs">
                  <div className="w-11 h-11 rounded-xl bg-[#119E9D]/10 text-[#119E9D] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#5E6675] uppercase block">
                      EMAIL INQUIRIES
                    </span>
                    <span className="text-sm font-bold text-[#101536] block">
                      hello@nexovate.in
                    </span>
                    <span className="text-xs text-[#5E6675] font-medium">
                      General & cohort admissions: support@nexovate.in
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAFBFC] border border-[#101536]/08 flex items-start gap-4 shadow-xs">
                  <div className="w-11 h-11 rounded-xl bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#5E6675] uppercase block">
                      CAMPUS & LAB HUB
                    </span>
                    <span className="text-sm font-bold text-[#101536] block">
                      Anna Nagar, Chennai
                    </span>
                    <span className="text-xs text-[#5E6675] font-medium">
                      208/9 Anna Salai, 4th Floor, Tamil Nadu 600040
                    </span>
                  </div>
                </div>
              </div>

              {/* SLA Guarantee Reassurance */}
              <div className="p-4 rounded-2xl bg-[#D1FAE5]/60 border border-[#10B981]/20 flex items-center gap-3 w-full text-xs text-[#101536]">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span className="font-semibold">
                  Guaranteed mentor review on all admission enquiries within 24 hours.
                </span>
              </div>
            </div>

            {/* RIGHT 50% — High Contrast Enquiry Form */}
            <div className="lg:col-span-6 bg-[#FAFBFC] border border-[#101536]/12 p-6 sm:p-10 rounded-3xl shadow-xl w-full">
              {status === "success" ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#101536] mb-2 font-jakarta">
                    THANK YOU.
                  </h3>
                  <p className="text-sm text-[#5E6675] max-w-sm leading-relaxed mb-2 font-medium">
                    We've received your enquiry.
                  </p>
                  <p className="text-xs text-[#5E6675]/80 max-w-sm leading-relaxed mb-6 font-normal">
                    An academic advisor will contact you within 24 business hours.
                  </p>
                  <MotionButton
                    onClick={() => setStatus("idle")}
                    className="min-h-[44px] px-6 py-2.5 bg-[#101536] hover:bg-[#6366F1] text-white text-xs uppercase tracking-wider transition-colors rounded-xl font-bold cursor-pointer"
                  >
                    Send Another Enquiry
                  </MotionButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                  {/* Anti-spam honeypot */}
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
                    <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
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
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur("name")}
                        placeholder="Your full name"
                        required
                        className={`w-full px-4 py-3 bg-white border rounded-xl text-xs text-[#101536] placeholder:text-[#5E6675]/50 focus:outline-none transition-colors ${
                          touched.name && fieldErrors.name
                            ? "border-red-400 focus:ring-1 focus:ring-red-400"
                            : "border-[#101536]/15 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                        }`}
                      />
                      {touched.name && fieldErrors.name && (
                        <p className="text-[10px] text-red-500 mt-1">{fieldErrors.name}</p>
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
                        className={`w-full px-4 py-3 bg-white border rounded-xl text-xs text-[#101536] placeholder:text-[#5E6675]/50 focus:outline-none transition-colors ${
                          touched.email && fieldErrors.email
                            ? "border-red-400 focus:ring-1 focus:ring-red-400"
                            : "border-[#101536]/15 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                        }`}
                      />
                      {touched.email && fieldErrors.email && (
                        <p className="text-[10px] text-red-500 mt-1">{fieldErrors.email}</p>
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
                        className={`w-full px-4 py-3 bg-white border rounded-xl text-xs text-[#101536] placeholder:text-[#5E6675]/50 focus:outline-none transition-colors ${
                          touched.phone && fieldErrors.phone
                            ? "border-red-400 focus:ring-1 focus:ring-red-400"
                            : "border-[#101536]/15 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                        }`}
                      />
                      {touched.phone && fieldErrors.phone && (
                        <p className="text-[10px] text-red-500 mt-1">{fieldErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#101536] uppercase block mb-1.5 tracking-wider">
                        Interested Course Track
                      </label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-[#101536]/15 rounded-xl text-xs text-[#101536] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors cursor-pointer"
                      >
                        <option value="Artificial Intelligence & Machine Learning">AI & Machine Learning</option>
                        <option value="Full Stack Web Engineering">Full Stack Web Engineering</option>
                        <option value="Data Science & Predictive Analytics">Data Science & Analytics</option>
                        <option value="AutoCAD 2D & 3D Precision Design">AutoCAD 2D & 3D Design</option>
                        <option value="Embedded Systems & Firmware Engineering">Embedded Systems</option>
                        <option value="IoT Systems & Applied Robotics">IoT & Robotics</option>
                        <option value="VLSI Digital Design & Verilog HDL">VLSI Digital Design</option>
                        <option value="Cloud Architecture & DevOps Systems">Cloud & DevOps</option>
                        <option value="Cyber Security & Defensive Operations">Cyber Security</option>
                        <option value="UI/UX & Interactive Product Design">UI/UX & Product Design</option>
                        <option value="Digital Marketing & Performance Growth">Digital Marketing</option>
                        <option value="Other General Enquiry">Other General Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-[#101536] uppercase tracking-wider">
                        Message / Questions *
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
                      placeholder="Tell us about your learning background, target skills, or questions..."
                      required
                      className={`w-full px-4 py-3 bg-white border rounded-xl text-xs text-[#101536] placeholder:text-[#5E6675]/50 focus:outline-none transition-colors ${
                        touched.message && fieldErrors.message
                          ? "border-red-400 focus:ring-1 focus:ring-red-400"
                          : "border-[#101536]/15 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                      }`}
                    />
                    {touched.message && fieldErrors.message && (
                      <p className="text-[10px] text-red-500 mt-1">{fieldErrors.message}</p>
                    )}
                  </div>

                  <MotionButton
                    type="submit"
                    disabled={status === "loading"}
                    className="min-h-[48px] w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#6366F1] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4F46E5] transition-all duration-200 shadow-md disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#6366F1] cursor-pointer"
                  >
                    {status === "loading" ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Enquiry...</span>
                      </div>
                    ) : (
                      <>
                        <span>Send Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </MotionButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
export default Contact;
