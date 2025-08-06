import React, { useState } from "react";
import { Smile, Star } from "lucide-react";

const moods = [
  { value: "Anxious", emoji: "😰" },
  { value: "Angry", emoji: "😡" },
  { value: "Sad", emoji: "😢" },
  { value: "Overwhelmed", emoji: "😩" },
  { value: "Unmotivated", emoji: "😔" },
  { value: "Lonely", emoji: "😞" },
  { value: "Insecure", emoji: "😳" },
  { value: "Frustrated", emoji: "😤" },
];

const EmotionalShift = ({
  shift,
  setShift,
  onComplete,
  onBack,
  disabled,
  emotion,
}: {
  shift: { before: number; after: number; beforeMood: string; afterMood: string };
  setShift: (s: any) => void;
  onComplete: () => void;
  onBack?: () => void;
  disabled?: boolean;
  emotion: string;
}) => {
  const [local, setLocal] = useState(shift || { before: 5, after: 5, beforeMood: emotion, afterMood: emotion });
  const [showAfter, setShowAfter] = useState(false);

  const handleSlider = (k: "before" | "after", v: number) => {
    setLocal((prev: any) => ({ ...prev, [k]: v }));
    setShift({ ...local, [k]: v });
  };
  const handleMood = (k: "beforeMood" | "afterMood", v: string) => {
    setLocal((prev: any) => ({ ...prev, [k]: v }));
    setShift({ ...local, [k]: v });
  };
  const done = () => onComplete();

  return (
    <div className={`${disabled ? "opacity-60 pointer-events-none" : ""}`}>
      <h3 className="font-semibold flex items-center gap-2 mb-2">
        <Smile className="text-emerald-400" size={22}/> Emotional Shift Check
      </h3>
      <div className="mb-3">
        <div>
          <span className="text-sm font-medium">1. How intense was this emotion <b>before</b> reframing? </span>
          <div className="flex gap-2 items-center mt-1">
            <input
              type="range"
              min={1} max={10}
              value={local.before}
              onChange={e => handleSlider("before", +e.target.value)}
              className="accent-indigo-500 flex-1"
              disabled={disabled}
            />
            <span className="w-10 text-center">{local.before}</span>
            <span className="ml-3">
              {moods.find(m => m.value === local.beforeMood)?.emoji || "🙂"}
            </span>
          </div>
        </div>
        <div className="flex gap-1 flex-wrap mt-1">
          {moods.map(m=>(
            <button key={m.value}
              type="button"
              className={`px-2 py-1 rounded-full text-2xl ${local.beforeMood===m.value?"bg-indigo-200":"bg-gray-100"} transition`}
              onClick={()=>handleMood("beforeMood", m.value)}
              disabled={disabled}
            >{m.emoji}</button>
          ))}
        </div>
      </div>
      {!showAfter && (
        <button
          type="button"
          className="text-indigo-600 font-semibold py-2 px-4 mt-1 rounded bg-indigo-50 hover:bg-indigo-100 transition"
          onClick={() => setShowAfter(true)}
          disabled={disabled}
        >
          Next: After the Reframe
        </button>
      )}
      {showAfter && (
        <div className="mb-4 border-t pt-3 mt-3">
          <span className="text-sm font-medium">
            2. Now, how intense is this emotion <b>after</b> reframing?
          </span>
          <div className="flex gap-2 items-center mt-1">
            <input
              type="range"
              min={1}
              max={10}
              value={local.after}
              onChange={e => handleSlider("after", +e.target.value)}
              className="accent-emerald-500 flex-1"
              disabled={disabled}
            />
            <span className="w-10 text-center">{local.after}</span>
            <span className="ml-3">
              {moods.find(m => m.value === local.afterMood)?.emoji || "🙂"}
            </span>
          </div>
          <div className="flex gap-1 flex-wrap mt-1">
            {moods.map(m => (
              <button key={m.value}
                type="button"
                className={`px-2 py-1 rounded-full text-2xl ${local.afterMood === m.value ? "bg-emerald-200" : "bg-gray-100"} transition`}
                onClick={() => handleMood("afterMood", m.value)}
                disabled={disabled}
              >{m.emoji}</button>
            ))}
          </div>
          <button
            type="button"
            className="bg-black text-white rounded px-6 py-2 font-semibold hover:bg-gray-900 shadow mt-4"
            onClick={done}
            disabled={disabled}
          >
            Next
          </button>
        </div>
      )}
      <div className="text-xs text-muted-foreground mt-2">
        * Responses are anonymous and never stored with any personal info.
      </div>
    </div>
  );
};

export default EmotionalShift;
