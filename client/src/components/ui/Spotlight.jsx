import React from "react";

export function Spotlight({
  className,
  fill = "white",
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center ${className}`}
    >
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id="spotlight-gradient"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor={fill} stopOpacity="0.4" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#spotlight-gradient)"
        />
      </svg>
    </div>
  );
}