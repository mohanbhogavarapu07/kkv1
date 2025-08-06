
import { cn } from "@/lib/utils";

interface WoopStepperProps {
  step: number;
  steps: string[];
}

const activeColor = "bg-gray-800 text-white border-gray-700";
const doneColor = "bg-gray-200 text-gray-700 border-gray-300";
const futureColor = "bg-gray-50 text-gray-400 border-gray-200";

const WoopStepper = ({ step, steps }: WoopStepperProps) => (
  <nav aria-label="WOOP progress" className="flex flex-row items-center justify-center mb-10">
    <ol className="flex w-full max-w-3xl space-x-0">
      {steps.map((label, i) => (
        <li key={label} className="relative flex-1 flex flex-col items-center">
          <div
            className={cn(
              "rounded-full border-2 w-9 h-9 text-lg font-bold flex items-center justify-center transition-all duration-200",
              i < step ? doneColor : i === step ? activeColor : futureColor,
              "z-10"
            )}
          >
            {i + 1}
          </div>
          <span className={cn(
            "text-xs mt-2 font-semibold transition-colors select-none font-playfair tracking-wide",
            i === step ? "text-gray-800" :
              i < step ? "text-gray-500" : "text-gray-400"
          )}>
            {label}
          </span>
          {i < steps.length - 1 && (
            <span className={cn(
              "absolute top-1/2 left-full w-full border-t-2 border-gray-200 z-0"
            )} style={{ minWidth: 24, marginLeft: "-4px" }} />
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default WoopStepper;
