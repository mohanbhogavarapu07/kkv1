
import { useState } from "react";
import { cn } from "@/lib/utils";

const TEMPLATES = [
  `If I feel unmotivated, then I’ll take a 5-minute walk and restart.`,
  `If I doubt myself, then I'll pause, breathe, and remind myself of my past successes.`,
  `If I get distracted, then I'll turn off notifications & set a timer for 15 mins.`,
];

interface WoopPlanProps {
  obstacle: string;
  value: string;
  onChange: (v:string)=>void;
  onNext: ()=>void;
  onBack: ()=>void;
}

export default function WoopPlan({ obstacle, value, onChange, onNext, onBack }: WoopPlanProps) {
  const [plan, setPlan] = useState(value);
  const [showTemplates, setShowTemplates] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onChange(plan);
    onNext();
  }
  function buildIfThen() {
    if (!obstacle) return "";
    return `If ${obstacle.toLowerCase()}, then I will ...`
  }
  return (
    <form className={cn(
      "bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col gap-5 mx-auto animate-fade-in border border-gray-100 font-inter"
    )} style={{maxWidth:500}} onSubmit={handleSubmit}>
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 font-playfair mb-1 tracking-tight">
          PLAN <span className="text-gray-400 text-sm font-normal font-inter">— Create an If–Then strategy</span>
        </h2>
        <p className="text-base text-gray-700">
          What can you do to overcome that obstacle? <br/>
          <span className="text-xs block mt-1 text-gray-500">Format: <b>If [internal obstacle shows up], then I will [specific action or mindset shift].</b></span>
        </p>
      </div>
      <input
        required
        type="text"
        className="bg-gray-50 border border-gray-300 px-3 py-2 rounded w-full"
        maxLength={100}
        placeholder={buildIfThen()}
        value={plan}
        onChange={e=>setPlan(e.target.value)}
      />
      <button
        type="button"
        onClick={() => setShowTemplates(!showTemplates)}
        className="text-gray-600 underline text-sm font-medium mb-2"
      >
        {showTemplates ? "Hide templates" : "See example If–Then strategies"}
      </button>
      {showTemplates && (
        <div className="flex flex-col gap-2 animate-fade-in">
          {TEMPLATES.map((tpl, idx) =>
            <button
              type="button"
              key={tpl}
              className="px-3 py-1 mb-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-200 text-gray-800 transition"
              onClick={()=>setPlan(tpl)}
            >{tpl}</button>
          )}
        </div>
      )}
      <div className="flex gap-2 justify-between pt-3">
        <button type="button" onClick={onBack}
          className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-100 transition font-medium"
        >← Back</button>
        <button type="submit"
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition"
          disabled={plan.length < 2}
        >See WOOP Summary →</button>
      </div>
    </form>
  )
}
