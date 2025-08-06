
import { useState } from "react";
import { cn } from "@/lib/utils";

const EXAMPLES = [
  "Finish writing my ebook",
  "Feel more confident in social settings",
  "Meditate 5x a week",
  "Launch my online store",
  "Make exercise a morning habit",
  "Read 10 pages every day",
];

function suggestWish(wish: string, user: any) {
  // Basic example heuristic: suggest more concrete version
  if (!wish) return "";
  if (wish.length < 12) return "Try describing your wish in more detail — make it specific and meaningful!";
  if (!wish.match(/\b(week|day|month|times|finish|launch|start|submit|call)\b/i))
    return "Consider specifying timeframe, frequency, or clarity. E.g. Meditate 3x a week.";
  return "";
}

interface WoopWishProps {
  value: string;
  onChange: (v: string)=>void;
  onNext: ()=>void;
  onBack: ()=>void;
  user: any;
}

export default function WoopWish({ value, onChange, onNext, onBack, user }: WoopWishProps) {
  const [showTip, setShowTip] = useState(false);
  const [custom, setCustom] = useState(value);

  const tipText = suggestWish(custom, user);

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    onChange(custom);
    onNext();
  }
  return (
    <form className={cn(
      "bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col gap-5 mx-auto animate-fade-in border border-gray-100 font-inter"
    )} style={{maxWidth:500}} onSubmit={handleNext}>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 font-playfair mb-1 tracking-tight">
          WISH <span className="text-gray-400 text-sm font-normal font-inter">— Define the meaningful goal</span>
        </h2>
        <p className="text-base text-gray-700">
          What is an important, challenging, but realistic wish you want to fulfill?
        </p>
      </div>
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 px-4 py-2 rounded text-lg w-full focus:ring-2 focus:ring-gray-300"
        required
        maxLength={90}
        autoFocus
        placeholder="E.g. Meditate 5x a week"
        value={custom}
        onChange={e => { setCustom(e.target.value); setShowTip(false); }}
      />

      <div className="flex gap-2 flex-wrap">
        {EXAMPLES.map((ex, idx) => (
          <button
            key={ex}
            type="button"
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-200 text-gray-700 font-medium transition"
            onClick={() => { setCustom(ex); setShowTip(false); }}
          >{ex}</button>
        ))}
      </div>
      <div>
        <button
          type="button"
          className="text-gray-600 underline text-sm font-semibold"
          onClick={() => setShowTip(!showTip)}
        >
          {showTip ? "Hide NLP guidance" : "Need help making it specific?"}
        </button>
        {showTip && tipText && (
          <div className="text-gray-800 bg-gray-100 px-3 py-2 rounded mt-2 text-xs font-medium animate-fade-in">
            {tipText}
          </div>
        )}
      </div>
      <div className="flex gap-2 justify-between pt-3">
        <button type="button" onClick={onBack}
          className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-100 transition font-medium"
        >← Back</button>
        <button type="submit"
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition"
          disabled={custom.length < 3}
        >Next →</button>
      </div>
    </form>
  );
}
