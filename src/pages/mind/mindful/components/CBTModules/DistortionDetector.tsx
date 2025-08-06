import React, { useEffect, useState } from "react";
import { Star, Book, BookOpen, Check, Smile, ArrowUp, ArrowDown, MessageSquare } from "lucide-react";

// Common CBT distortions
const distortionsCatalog: Array<{
  label: string;
  desc: string;
  icon: React.ReactNode;
}> = [
  {
    label: "All-or-Nothing Thinking",
    desc: "Seeing things in black-or-white categories. If performance isn't perfect, you see yourself as a total failure.",
    icon: <Star className="text-purple-500" size={20} />,
  },
  {
    label: "Catastrophizing",
    desc: "Assuming the worst will happen. Magnifying problems into disasters.",
    icon: <ArrowDown className="text-rose-600" size={20} />,
  },
  {
    label: "Mind Reading",
    desc: "Assuming you know what others are thinking, often assuming they see you negatively.",
    icon: <Book className="text-blue-400" size={20} />,
  },
  {
    label: "Overgeneralization",
    desc: "Viewing a negative event as a never-ending pattern of defeat, using words like 'always' or 'never.'",
    icon: <BookOpen className="text-amber-400" size={20} />,
  },
  {
    label: "Should Statements",
    desc: 'Criticizing yourself or others with "shoulds." Feeling pushed rather than motivated.',
    icon: <Check className="text-green-500" size={20} />,
  },
  {
    label: "Emotional Reasoning",
    desc: "Assuming your negative feelings reflect the way things really are ('I feel it, so it must be true').",
    icon: <Smile className="text-red-400" size={20} />,
  },
];

const DistortionDetector = ({
  thought,
  detectedDistortions,
  onSelect,
  onComplete,
  onBack,
  setDistortionDesc,
  disabled,
}: {
  thought: string;
  detectedDistortions: string[];
  onSelect: (d: string[]) => void;
  onComplete: () => void;
  onBack?: () => void;
  setDistortionDesc: (s: string) => void;
  disabled?: boolean;
}) => {
  const [selected, setSelected] = useState<string[]>(detectedDistortions || []);
  const [error, setError] = useState<string | null>(null);

  // Initial detect: If one passed in, autoselect and set desc
  useEffect(() => {
    if (selected && selected.length > 0) {
      const d = distortionsCatalog.find(dt => dt.label === selected[0]);
      if (d) setDistortionDesc(d.desc);
    }
  }, [selected, setDistortionDesc]);

  const handleSelect = (lbl: string) => {
    let v = selected.includes(lbl)
      ? selected.filter((x) => x !== lbl)
      : [lbl]; // allow only one at once for now
    setSelected(v);
    if (v.length > 0) {
      const d = distortionsCatalog.find(dt => dt.label === v[0]);
      if (d) setDistortionDesc(d.desc);
    }
  };

  const done = () => {
    if (!selected.length) { setError("Select at least one"); return; }
    onSelect(selected);
    onComplete();
  };

  return (
    <div className={`${disabled ? "opacity-60 pointer-events-none" : ""}`}>
      <div className="flex gap-3 items-center mb-2">
        <MessageSquare className="text-purple-500" size={24}/>
        <span className="font-semibold">
          Detected Cognitive Distortion{selected.length !== 1 && "s"} <span className="font-normal text-xs text-muted-foreground">(select what fits best)</span>
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-1">
        {distortionsCatalog.map((d, i) => (
          <label
            key={d.label}
            className={`flex items-center gap-3 border rounded-lg px-3 py-2 cursor-pointer transition-all
              ${selected.includes(d.label)
                ? "bg-indigo-50 border-indigo-400 font-semibold shadow"
                : "hover:bg-indigo-50 border-gray-200"}
            `}
            onClick={() => handleSelect(d.label)}
          >
            <span>{d.icon}</span>
            <span className="flex-1">{d.label}</span>
            {selected.includes(d.label) && <span className="text-green-500 text-xs ml-auto">Selected</span>}
          </label>
        ))}
      </div>
      {selected.length > 0 && (
        <div className="bg-gray-50 border px-3 py-2 mt-1 rounded flex items-center gap-2 text-sm">
          <span className="text-indigo-400">{distortionsCatalog.find(d=>d.label===selected[0])?.icon}</span>
          <b className="">{selected[0]}</b>
          <span className="text-gray-600">– {distortionsCatalog.find(d=>d.label===selected[0])?.desc}</span>
        </div>
      )}
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
      <div className="flex justify-between mt-4">
        {onBack && <button
          type="button"
          className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 border"
          onClick={onBack}
          disabled={disabled}
        >Back</button>}
        <button
          type="button"
          className="bg-black text-white rounded px-6 py-2 font-semibold hover:bg-gray-900 shadow"
          onClick={done}
          disabled={disabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DistortionDetector;
