import { useState } from "react";
import { cn } from "@/lib/utils";

const SAMPLE_BLOCKERS = [
  "I procrastinate",
  "I get easily distracted",
  "I doubt myself",
  "I lose motivation midway",
  "I’m afraid of failing",
  "I feel overwhelmed",
]

function guessBlocker(wish: string) {
  if (!wish) return "";
  // very basic suggestion
  if (wish.match(/procrastinate|delay|wait|finish|start/i)) return "I procrastinate";
  if (wish.match(/confidence|social|speak|meeting/i)) return "I doubt myself";
  if (wish.match(/exercise|health|morning|routine/i)) return "I lose motivation midway";
  return SAMPLE_BLOCKERS[Math.floor(Math.random()*SAMPLE_BLOCKERS.length)];
}

interface WoopObstacleProps {
  wish: string;
  value: string;
  onChange: (v:string)=>void;
  onNext: ()=>void;
  onBack: ()=>void;
}

export default function WoopObstacle({ wish, value, onChange, onNext, onBack }: WoopObstacleProps) {
  const [blocker, setBlocker] = useState(value);
  const [showTip, setShowTip] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onChange(blocker);
    onNext();
  }
  return (
    <form className={cn(
      "bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col gap-5 mx-auto animate-fade-in border border-gray-100 font-inter"
    )} style={{maxWidth:500}} onSubmit={handleSubmit}>
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 font-playfair mb-1 tracking-tight">
          OBSTACLE <span className="text-gray-400 text-sm font-normal font-inter">— Spot the inner blocker</span>
        </h2>
        <p className="text-base text-gray-700">
          What is the <b>biggest internal obstacle</b> that might stop you? <span className="font-normal text-gray-500">(emotion, thought or habit)</span>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          E.g. “I procrastinate,” “I get easily distracted,” “I doubt myself”
        </p>
      </div>
      <input
        required
        type="text"
        className="bg-gray-50 border border-gray-300 px-3 py-2 rounded w-full"
        maxLength={70}
        placeholder="E.g. I doubt myself…"
        value={blocker}
        onChange={e=>setBlocker(e.target.value)}
      />
      <div className="flex gap-2 flex-wrap">
        {SAMPLE_BLOCKERS.map(bl =>
          <button key={bl} type="button"
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-200 text-gray-700 font-medium transition"
            onClick={() => setBlocker(bl)}
          >{bl}</button>
        )}
      </div>
      <div>
        <button
          type="button"
          className="text-gray-600 underline text-sm font-semibold"
          onClick={() => setShowTip(!showTip)}
        >
          {showTip ? "Hide AI nudge" : "Need a blocker suggestion?"}
        </button>
        {showTip &&
          <div className="text-gray-800 bg-gray-100 px-3 py-2 rounded mt-2 text-xs font-medium animate-fade-in">
            Suggestion: {guessBlocker(wish)}
          </div>
        }
      </div>
      <div className="flex gap-2 justify-between pt-3">
        <button type="button" onClick={onBack}
          className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-100 transition font-medium"
        >← Back</button>
        <button type="submit"
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition"
          disabled={blocker.length < 3}
        >Next →</button>
      </div>
    </form>
  );
}
