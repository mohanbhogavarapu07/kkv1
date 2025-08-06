
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface CardSectionProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  step: number;
  completed?: boolean;
  summary?: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}

export const CardSection: React.FC<CardSectionProps> = ({
  title,
  children,
  completed,
  summary,
  open,
  onToggle,
  step,
}) => (
  <section
    className={cn(
      "mb-4 transition-shadow rounded-2xl border bg-card px-6 py-5",
      completed
        ? "border-green-400 shadow-[0_2px_20px_rgba(16,185,129,0.05)]"
        : "border-muted"
    )}
  >
    <button
      className="flex items-center w-full text-lg font-semibold group select-none focus:outline-none"
      onClick={onToggle}
      type="button"
      aria-expanded={open}
    >
      <span
        className={cn(
          "mr-3 flex items-center justify-center w-7 h-7 rounded-full bg-muted text-muted-foreground font-mono text-sm transition-all group-hover:bg-primary/10",
          completed && "bg-green-500/90 text-white"
        )}
      >
        {completed ? "✓" : step}
      </span>
      <span>{title}</span>
      <span className="ml-auto">
        <ChevronDown className={cn("w-5 h-5 transition-transform", open && "rotate-180")} />
      </span>
    </button>
    {open && (
      <div className="mt-4 animate-fade-in">
        {children}
        {summary && <div className="mt-3 text-muted-foreground text-[15px]">{summary}</div>}
      </div>
    )}
  </section>
);
