
import { cn } from "@/lib/utils";

interface Props {
  data: {
    name: string;
    roles: string[];
    lifeStage: string;
    goalDomain: string;
    goalTimeframe: string;
    reflectionIntensity: string;
    wish: string;
    outcome: string;
    mood: number;
    obstacle: string;
    plan: string;
  };
  onRestart: () => void;
}

export default function WoopSummaryCard({ data, onRestart }: Props) {
  const userTitle = data.name
    ? data.name
    : data.roles && data.roles.length
      ? data.roles.join(", ")
      : "WOOP explorer";
  return (
    <div className={cn(
      "bg-white shadow-2xl rounded-2xl p-10 mx-auto mt-12 mb-4 max-w-xl border-t-4 border-gray-300 animate-fade-in",
      "flex flex-col gap-8 font-inter border"
    )}>
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-2xl font-bold text-gray-900 font-playfair tracking-tight">
          {userTitle}'s WOOP Blueprint
        </h2>
        <span className="text-gray-600 text-base font-inter font-medium">
          {data.lifeStage && <>{data.lifeStage} | </>}{data.goalDomain} | {data.goalTimeframe}
        </span>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 grid gap-5 shadow-inner border border-gray-100">
        <div>
          <h3 className="text-xs text-gray-800 font-semibold uppercase mb-1 tracking-wide font-playfair">Wish</h3>
          <p className="pl-2 text-base text-gray-800 font-inter">{data.wish}</p>
        </div>
        <div>
          <h3 className="text-xs text-gray-800 font-semibold uppercase mb-1 font-playfair">Outcome</h3>
          <p className="pl-2 text-gray-700 font-inter">{data.outcome}</p>
        </div>
        <div>
          <h3 className="text-xs text-gray-800 font-semibold uppercase mb-1 font-playfair">Obstacle</h3>
          <p className="pl-2 text-gray-700 font-inter">{data.obstacle}</p>
        </div>
        <div>
          <h3 className="text-xs text-gray-800 font-semibold uppercase mb-1 font-playfair">Plan</h3>
          <p className="pl-2 text-gray-700 font-inter">{data.plan}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex gap-2 items-center mt-2">
          <span className="text-gray-900 font-semibold text-sm font-inter">Desire Level:</span>
          <span className="font-mono text-lg bg-gray-100 px-3 py-1 rounded">{data.mood}/10</span>
        </div>
        <blockquote className="text-justify text-gray-600 bg-white px-6 py-4 rounded-lg mt-4 shadow border border-gray-100 italic font-medium">
          💡 “Now you’re ready. Commit to this plan and WOOP your way to clarity.”
        </blockquote>
      </div>
      <div className="flex gap-3 pt-6 justify-center">
        <a href="#" onClick={onRestart}
          className="px-4 py-2 bg-gray-50 hover:bg-gray-100  text-gray-800 font-semibold rounded-xl border border-gray-300 transition"
        >Restart</a>
        <a
          href="#"
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold border border-gray-800 transition"
          onClick={e => { e.preventDefault(); window.print(); }}
        >Print / Save as PDF</a>
      </div>
      <div className="text-xs text-center text-gray-400 mt-2">
        <span>
          WOOP is based on 20+ years of research<br/>
          Oettingen et al. (2001–2014), NYU, University of Hamburg, NIH
        </span>
      </div>
    </div>
  );
}
