
import React from "react";
import { Check, Smile } from "lucide-react";

interface CBTStepperProps {
  currentStep: number;
  moduleTitles: string[];
  onStepClick?: (step: number) => void;
}
const colors = [
  "bg-gray-700",
  "bg-gray-600",
  "bg-gray-500",
  "bg-gray-400",
  "bg-gray-300",
  "bg-gray-500",
];

const CBTStepper: React.FC<CBTStepperProps> = ({ currentStep, moduleTitles, onStepClick }) => (
  <nav className="flex flex-col gap-6 px-2 py-7 rounded-2xl bg-gray-100/90 shadow animate-fade-in">
    <h3 className="text-lg font-playfair pl-2 mt-2 mb-4 text-gray-700">Progress</h3>
    {moduleTitles.map((title, i) => (
      <button
        key={i}
        disabled={i > currentStep}
        onClick={() => onStepClick && onStepClick(i)}
        className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-all font-medium group
          ${i === currentStep
            ? "bg-gray-200 text-gray-900 scale-105 shadow"
            : i < currentStep
              ? "text-gray-600 hover:bg-gray-50"
              : "text-gray-400"}
        `}
      >
        <span
          className={`flex items-center justify-center h-7 w-7 rounded-full text-white shadow ${colors[i % colors.length]} ${i < currentStep ? "opacity-80" : ""} transition-all`}
        >
          {i < currentStep ? <Check size={20} /> : i === 0 ? <Smile size={20}/>: i + 1}
        </span>
        <span className="text-base font-playfair">{title}</span>
      </button>
    ))}
  </nav>
);
export default CBTStepper;
