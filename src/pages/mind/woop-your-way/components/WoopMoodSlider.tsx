
import { cn } from "@/lib/utils";

interface WoopMoodSliderProps {
  mood: number;
  onChange: (n: number)=>void;
}

const labels = [
  "", "😕", "🙁", "😐", "🙂", "😊", "😃", "😃", "😁", "🤩", "🔥"
];

export default function WoopMoodSlider({ mood, onChange }: WoopMoodSliderProps) {
  return (
    <div className="flex items-center gap-4 select-none">
      <span className="w-6 text-xl text-indigo-600">{labels[mood] ?? ""}</span>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={mood}
        className={cn(
          "flex-1 accent-indigo-600 h-2 rounded bg-indigo-100"
        )}
        onChange={e => onChange(Number(e.target.value))}
      />
      <span className="w-8 font-mono text-xs">{mood}/10</span>
    </div>
  );
}
