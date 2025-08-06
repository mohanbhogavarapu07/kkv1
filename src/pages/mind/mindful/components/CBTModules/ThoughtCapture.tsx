import React, { useState } from "react";
import { MessageSquare } from "lucide-react";

const ThoughtCapture = ({
  thought,
  setThought,
  disabled,
  onComplete,
  onBack,
  setAutoDetectedDistortions,
}: {
  thought: string;
  setThought: (v: string) => void;
  disabled?: boolean;
  onComplete: () => void;
  onBack?: () => void;
  setAutoDetectedDistortions?: (d: string[]) => void;
}) => {
  const [local, setLocal] = useState(thought);
  const [error, setError] = useState<string | null>(null);

  // Simulate sentiment analysis & auto-detect (real AI could be added later)
  const basicSentiments = [
    { mood: "Negative", keywords: ["fail", "bad", "never", "over", "worthless"] },
    { mood: "Positive", keywords: ["can", "will", "possible", "good"] },
  ];
  let moodHint = "";
  if (local) {
    if (basicSentiments[0].keywords.some(w => local.toLowerCase().includes(w)))
      moodHint = "This sounds like a critical or worried thought.";
    else if (basicSentiments[1].keywords.some(w => local.toLowerCase().includes(w)))
      moodHint = "There's some optimism in your statement!";
  }

  const distortionsList = [
    { label: "All-or-Nothing Thinking", hints: ["always", "never", "every", "all"], icon: "star" },
    { label: "Catastrophizing", hints: ["over", "ruined", "disaster", "end"], icon: "alert-triangle" },
    { label: "Mind Reading", hints: ["they think", "must think", "everyone thinks"], icon: "book" },
    { label: "Overgeneralization", hints: ["never", "always", "impossible"], icon: "book-open" },
    { label: "Should Statements", hints: ["should", "must", "ought"], icon: "check" },
    { label: "Emotional Reasoning", hints: ["feel", "felt", "feeling"], icon: "smile" },
  ];

  // Try to auto-detect distortion keywords
  const detected = local
    ? distortionsList
        .filter((d) => d.hints.some((h) => local.toLowerCase().includes(h)))
        .map((d) => d.label)
    : [];

  const done = () => {
    if (!local.trim()) { setError("Please enter your unhelpful thought."); return; }
    setThought(local.trim());
    setError(null);
    if (setAutoDetectedDistortions) setAutoDetectedDistortions(detected);
    onComplete();
  };

  return (
    <div className={`${disabled ? "opacity-60 pointer-events-none" : ""}`}>
      <div className="flex gap-3 items-start mb-2">
        <span className="bg-sky-100 text-sky-600 rounded-full p-2 flex items-center"><MessageSquare size={22} /></span>
        <span className="font-medium text-sm">
          What was the <b>unhelpful thought</b> that came to mind?<br />
          <span className="text-xs text-muted-foreground">
            Write it as it appeared—no judgment.
          </span>
        </span>
      </div>
      <textarea
        rows={3}
        className="w-full rounded border px-3 py-2 shadow focus:ring-2"
        placeholder="E.g., 'If I fail this launch, my whole career is over.'"
        value={local}
        onChange={e => {
          setLocal(e.target.value);
          setError(null);
        }}
        disabled={disabled}
      />
      {moodHint && (
        <div className="mt-1 text-xs text-blue-500">{moodHint}</div>
      )}
      {error && (
        <div className="mt-1 text-xs text-red-500">{error}</div>
      )}
      <div className="flex justify-between mt-3">
        {onBack && <button
          type="button"
          onClick={onBack}
          className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 border"
          disabled={disabled}
        >Back</button>}
        <button
          type="button"
          onClick={done}
          className="bg-black text-white rounded px-6 py-2 font-semibold hover:bg-gray-900 shadow"
          disabled={disabled}
        >Next</button>
      </div>
      {/* (Optional) Suggest distortions for next step */}
      {local && detected.length > 0 && (
        <div className="mt-2 text-xs text-purple-700">
          <b>Possible distortion detected:</b> {detected.join(", ")}
        </div>
      )}
    </div>
  );
};

export default ThoughtCapture;
