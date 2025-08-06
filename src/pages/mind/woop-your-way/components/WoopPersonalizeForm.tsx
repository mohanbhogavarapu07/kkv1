import { useState } from "react";
import { cn } from "@/lib/utils";

const LIFE_STAGES = ["Teen", "20s", "30s", "40s", "50s", "Senior"];
const ROLES = [
  "Student", "Entrepreneur", "Remote Worker", "Parent", "Athlete",
  "Creative", "Manager", "Recovering", "Transitioning"
];
const GOAL_DOMAINS = [
  "Health", "Productivity", "Relationships", "Career", 
  "Creativity", "Emotional Resilience", "Financial"
];
const TIMEFRAMES = [
  "Short-term (1-2 weeks)",
  "Mid-term (30–90 days)",
  "Long-term (6–12 months)"
];
const DEPTHS = ["Light", "Moderate", "Deep"];

interface Props {
  value: any, onChange: (v: any)=>void, onNext: ()=>void
}
export default function WoopPersonalizeForm({ value, onChange, onNext }: Props) {
  const [name, setName] = useState(value.name ?? "");
  const [lifeStage, setLifeStage] = useState(value.lifeStage ?? "");
  const [roles, setRoles] = useState<string[]>(value.roles ?? []);
  const [goalDomain, setDomain] = useState(value.goalDomain ?? "");
  const [goalTimeframe, setTimeframe] = useState(value.goalTimeframe ?? "");
  const [reflectionIntensity, setDepth] = useState(value.reflectionIntensity ?? "Moderate");

  function toggleRole(role: string) {
    setRoles(r => r.includes(role) ? r.filter(x => x !== role) : [...r, role]);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onChange({ name, lifeStage, roles, goalDomain, goalTimeframe, reflectionIntensity });
    onNext();
  }
  return (
    <form className={cn(
      "bg-white rounded-2xl shadow-lg px-10 py-10 flex flex-col gap-5 mx-auto animate-fade-in font-inter",
      "border border-gray-100"
    )} style={{maxWidth:520}} onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold mb-2 text-gray-800 font-playfair tracking-tight">
        Start your WOOP journey
      </h2>
      <label className="font-medium mb-1 text-gray-700">Your Name <span className="text-gray-400">(optional)</span></label>
      <input className="bg-gray-50 border border-gray-200 px-3 py-2 rounded w-full mb-2"
        placeholder="Alex, Sam, etc." value={name} onChange={e=>setName(e.target.value)} />

      <label className="font-medium mb-1 text-gray-700">Life Stage / Age Group</label>
      <select className="bg-gray-50 border border-gray-200 px-3 py-2 rounded w-full mb-2"
        required value={lifeStage} onChange={e=>setLifeStage(e.target.value)}>
        <option value="">Select</option>
        {LIFE_STAGES.map(x => <option key={x}>{x}</option>)}
      </select>

      <label className="font-medium mb-1 text-gray-700">Your Roles / Context</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {ROLES.map(role =>
          <button type="button" key={role}
            className={cn(
              "px-3 py-1 rounded-full border text-sm transition-all hover-scale",
              roles.includes(role) ?
                "bg-gray-700 text-white border-gray-700" :
                "bg-gray-100 text-gray-700 border-gray-200"
            )}
            onClick={()=>toggleRole(role)}
          >
            {role}
          </button>
        )}
      </div>

      <label className="font-medium mb-1 text-gray-700">Goal Domain</label>
      <select 
        className="bg-gray-50 border border-gray-200 px-3 py-2 rounded w-full mb-2"
        required value={goalDomain} onChange={e=>setDomain(e.target.value)}>
        <option value="">Select</option>
        {GOAL_DOMAINS.map(x => <option key={x}>{x}</option>)}
      </select>

      <label className="font-medium mb-1 text-gray-700">Goal Timeframe</label>
      <select 
        className="bg-gray-50 border border-gray-200 px-3 py-2 rounded w-full mb-2"
        required value={goalTimeframe} onChange={e=>setTimeframe(e.target.value)}>
        <option value="">Select</option>
        {TIMEFRAMES.map(x => <option key={x}>{x}</option>)}
      </select>

      <label className="font-medium mb-1 text-gray-700">Reflection Intensity</label>
      <div className="flex gap-2">
        {DEPTHS.map(depth =>
          <button type="button" key={depth}
            className={cn(
              "px-4 py-1 rounded border text-sm hover-scale",
              reflectionIntensity === depth ?
                "bg-gray-600 text-white border-gray-600" :
                "bg-gray-100 text-gray-700 border-gray-200"
            )}
            onClick={()=>setDepth(depth)}
          >
            {depth}
          </button>
        )}
      </div>
      <div className="pt-5">
        <button
          type="submit"
          className={cn(
            "w-full py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition"
          )}
          disabled={!lifeStage || !goalDomain || !goalTimeframe}
        >
          Begin WOOP → 
        </button>
      </div>
    </form>
  )
}
