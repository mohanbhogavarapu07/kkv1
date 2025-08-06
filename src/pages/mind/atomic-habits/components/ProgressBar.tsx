
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  steps: number;
  current: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps, current }) => {
  const percent = Math.round((current / steps) * 100);

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-primary">Habit Blueprint Progress</span>
        <span className="text-xs text-muted-foreground">{percent}%</span>
      </div>
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full bg-primary transition-all duration-500 rounded-full",
            percent === 100 && "bg-green-500"
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
