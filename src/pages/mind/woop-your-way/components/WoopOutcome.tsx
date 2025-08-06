
import { useState } from "react";
import WoopMoodSlider from "./WoopMoodSlider";
import { cn } from "@/lib/utils";

interface WoopOutcomeProps {
  value: string;
  mood: number;
  onChange: (x: string) => void;
  onMood: (mood: number) => void;
  onNext: () => void;
  onBack: () => void;
  user: any;
}

export default function WoopOutcome({
  value,
  mood,
  onChange,
  onMood,
  onNext,
  onBack,
  user,
}: WoopOutcomeProps) {
  const [outcome, setOutcome] = useState(value);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onChange(outcome);
    onNext();
  }

  return (
    <form
      className={cn(
        "bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col gap-5 mx-auto animate-fade-in border border-gray-100 font-inter"
      )}
      style={{ maxWidth: 500 }}
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 font-playfair mb-1 tracking-tight">
          OUTCOME <span className="text-gray-400 text-sm font-normal font-inter">— Visualize the best result</span>
        </h2>
        <p className="text-base text-gray-700">
          If this wish came true, what would be the best thing about it?
        </p>
        <p className="text-xs text-gray-500 mt-2 italic">
          How would you feel? How would it affect your day, life, or relationships?
        </p>
      </div>
      <textarea
        className="bg-gray-50 border border-gray-300 px-3 py-2 rounded w-full min-h-[70px] resize-none font-inter"
        required
        maxLength={130}
        placeholder="E.g. I'd feel calm, focused, energized…"
        value={outcome}
        onChange={e => setOutcome(e.target.value)}
      />
      <div>
        <label className="block text-sm mb-2 font-semibold text-gray-700 font-playfair">
          How much do you want this?
        </label>
        <WoopMoodSlider mood={mood} onChange={onMood} />
      </div>
      <div className="flex gap-2 justify-between pt-3">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-100 transition font-medium"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition"
          disabled={outcome.length < 3}
        >
          Next →
        </button>
      </div>
    </form>
  );
}
