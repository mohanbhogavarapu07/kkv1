
import React from "react";

export const Sparkle: React.FC<{ show: boolean }> = ({ show }) => (
  <span
    className={
      "inline-block transition-transform duration-300 " +
      (show ? "animate-[pulse_0.7s]" : "opacity-0")
    }
    aria-hidden
  >
    <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
      <g filter="url(#a)">
        <path stroke="#a7f3d0" strokeWidth="1.8" d="M11 3.5v15m-7.5-7.5h15" />
      </g>
      <defs>
        <filter id="a" x="0" y="0" width="22" height="22" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feFlood floodColor="#38bdf8" floodOpacity="0.45"/>
          <feComposite in2="blur" operator="in"/>
          <feComposite in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
    </svg>
  </span>
);
