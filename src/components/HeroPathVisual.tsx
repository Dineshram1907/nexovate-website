"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export const HeroPathVisual: React.FC = () => {
  const [activeBranch, setActiveBranch] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const branches = [
    { id: 0, label: "AI", path: "M 360 260 C 320 200, 200 160, 140 80", accent: "#119E9D" },
    { id: 1, label: "CODE", path: "M 360 260 C 340 180, 280 120, 240 60", accent: "#119E9D" },
    { id: 2, label: "DATA", path: "M 360 260 C 360 170, 360 110, 360 50", accent: "#EFAF32" },
    { id: 3, label: "CLOUD", path: "M 360 260 C 380 180, 440 120, 480 60", accent: "#119E9D" },
    { id: 4, label: "INNOVATION", path: "M 360 260 C 400 200, 520 160, 580 80", accent: "#119E9D" },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;

    // Determine nearest branch index based on mouse X position
    if (xRatio < 0.25) setActiveBranch(0);
    else if (xRatio < 0.42) setActiveBranch(1);
    else if (xRatio < 0.58) setActiveBranch(2);
    else if (xRatio < 0.75) setActiveBranch(3);
    else setActiveBranch(4);
  };

  const handleMouseLeave = () => {
    setActiveBranch(null);
  };

  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-3xl aspect-[720/460] flex items-center justify-center cursor-crosshair select-none"
    >
      {/* Background Soft Aura Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#119E9D]/05 via-[#FAFBFC] to-[#EFAF32]/05 blur-3xl -z-10" />

      <svg
        viewBox="0 0 720 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <linearGradient id="main-path-grad" x1="360" y1="440" x2="360" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#101536" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#119E9D" />
          </linearGradient>

          <linearGradient id="active-gold-grad" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EFAF32" />
            <stop offset="100%" stopColor="#F5C45A" />
          </linearGradient>
        </defs>

        {/* 1.0s: Initial Trunk Path Drawing from Bottom Center */}
        <motion.path
          d="M 360 440 L 360 260"
          stroke="url(#main-path-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1.0, ease: cubicEase }}
        />

        {/* Origin Student Silhouette Node (Bottom Center) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: cubicEase }}
        >
          {/* Base Pulse Ring */}
          <circle cx="360" cy="440" r="14" fill="#101536" fillOpacity="0.04" />
          <circle cx="360" cy="440" r="6" fill="#101536" />
          <circle cx="360" cy="440" r="2.5" fill="#FAFBFC" />
          {/* Subtle Student Silhouette Icon */}
          <path
            d="M 353 430 C 353 424, 367 424, 367 430 L 365 435 L 355 435 Z"
            fill="#101536"
            opacity="0.8"
          />
          <circle cx="360" cy="422" r="3" fill="#101536" opacity="0.8" />
        </motion.g>

        {/* Branching Junction Node (Center Point) */}
        <motion.circle
          cx="360"
          cy="260"
          r="4.5"
          fill="#119E9D"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 1.5, ease: cubicEase }}
        />

        {/* 1.5s: 5 Branching Routes */}
        {branches.map((b) => {
          const isActive = activeBranch === b.id;
          const isDefaultHighlight = activeBranch === null && b.id === 2; // Middle Data/Innovation path default

          return (
            <g key={b.id}>
              {/* Background Quiet Path */}
              <motion.path
                d={b.path}
                stroke={isActive || isDefaultHighlight ? b.accent : "#101536"}
                strokeOpacity={isActive ? 0.95 : isDefaultHighlight ? 0.5 : 0.12}
                strokeWidth={isActive ? 3.5 : isDefaultHighlight ? 2.5 : 1.5}
                strokeDasharray={isActive ? "none" : "4 4"}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 1.5 + b.id * 0.1, ease: cubicEase }}
                className="transition-all duration-300"
              />

              {/* Endpoint Possibility Node */}
              <motion.g
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 2.0 + b.id * 0.1, ease: cubicEase }}
              >
                {/* Node Glow */}
                <circle
                  cx={b.id === 0 ? 140 : b.id === 1 ? 240 : b.id === 2 ? 360 : b.id === 3 ? 480 : 580}
                  cy={b.id === 0 ? 80 : b.id === 1 ? 60 : b.id === 2 ? 50 : b.id === 3 ? 60 : 80}
                  r={isActive ? 12 : 7}
                  fill={isActive ? (b.id === 2 ? "url(#active-gold-grad)" : "#119E9D") : "#101536"}
                  fillOpacity={isActive ? 1 : isDefaultHighlight ? 0.8 : 0.15}
                  className="transition-all duration-300"
                />

                {/* Abstract Nexovate Geometry Accent on Center Path */}
                {b.id === 2 && (
                  <path
                    d="M 355 42 L 360 36 L 365 42 L 360 48 Z"
                    fill="#EFAF32"
                    className="animate-pulse"
                  />
                )}
              </motion.g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
