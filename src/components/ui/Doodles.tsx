import React from "react";

export const DoodleStar: React.FC<{ className?: string; color?: string }> = ({
  className = "w-5 h-5",
  color = "#FBBF24",
}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleArrow: React.FC<{ className?: string; color?: string }> = ({
  className = "w-12 h-6",
  color = "#6366F1",
}) => (
  <svg className={className} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 20 C 30 5, 70 35, 90 15 M 80 10 L 92 14 L 85 24"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleCircle: React.FC<{ className?: string; color?: string }> = ({
  className = "w-16 h-16",
  color = "#F97316",
}) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 50 10 C 20 12, 10 35, 12 60 C 15 85, 45 92, 75 85 C 95 75, 92 35, 80 18 C 65 5, 30 15, 20 30"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="4 2"
    />
  </svg>
);
