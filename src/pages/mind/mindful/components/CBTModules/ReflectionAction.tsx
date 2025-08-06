import React from "react";
import { Book, Check, Star, Smile } from "lucide-react";

const ReflectionAction = ({
  reflection,
  setReflection,
  action,
  reframe,
  onBack,
  disabled,
  onRestart,
  moodBefore,
  moodAfter,
}: {
  reflection: string;
  setReflection: (s: string) => void;
  action: string;
  reframe: string;
  onBack?: () => void;
  disabled?: boolean;
  onRestart?: () => void;
  moodBefore?: number;
  moodAfter?: number;
}) => {
  return (
    <div className={`${disabled ? "opacity-60 pointer-events-none" : ""}`}>
      <div className="flex items-center gap-2 mb-2">
        <Book className="text-orange-400" size={22}/>
        <span className="font-semibold">Reflection & Action</span>
      </div>
      <div className="bg-orange-50 border-l-4 border-orange-400 px-4 py-2 rounded mb-3">
        <b>Reframed Thought:</b>
        <blockquote className="text-lg italic mt-1 mb-2">{reframe}</blockquote>
        <div className="mb-2 text-sm flex gap-6">
          <span>
            <b>Emotion intensity before:</b> <span className="font-mono">{moodBefore}</span>
          </span>
          <span>
            <b>After:</b> <span className="font-mono">{moodAfter}</span>
          </span>
        </div>
      </div>
      <div className="mb-3">
        <label className="font-semibold text-sm">What did you learn about yourself from this exercise?</label>
        <textarea
          rows={2}
          value={reflection}
          onChange={e => setReflection(e.target.value)}
          className="w-full mt-1 rounded border px-3 py-2 shadow focus:ring-2"
          placeholder="Write your reflection here... (optional)"
          disabled={disabled}
        />
      </div>
      <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded">
        <Check className="text-emerald-600" size={20}/>
        <span className="font-semibold">Suggested action:</span> <span className="">{action}</span>
      </div>
      <div className="flex gap-2 mt-5">
        {onBack && <button
          type="button"
          className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 border"
          onClick={onBack}
          disabled={disabled}
        >Back</button>}
        <button
          type="button"
          className="bg-black text-white rounded px-6 py-2 font-semibold hover:bg-gray-900 shadow"
          onClick={onRestart}
        >
          Restart
        </button>
        <button
          type="button"
          className="bg-white border rounded px-6 py-2 font-semibold hover:bg-gray-100 shadow"
          onClick={()=>{window.print()}}
        >
          Export as PDF
        </button>
      </div>
      <div className="text-xs text-muted-foreground mt-4">
        For ongoing growth, try this exercise in different situations.<br/>
        <span className="opacity-70">Your responses stay only on your device and are never sent anywhere.</span>
      </div>
    </div>
  );
};

export default ReflectionAction;
