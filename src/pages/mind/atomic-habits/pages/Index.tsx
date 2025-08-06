import React, { useState, useMemo } from "react";
import { ProgressBar } from "../components/ProgressBar";
import { HabitSummary } from "../components/HabitSummary";
import { CardSection } from "../components/ui/CardSection";
import { Sparkle } from "../components/Sparkle";
import { useToast } from "../hooks/use-toast";

// Templates for fast-start
const identityTemplates = [
  "Healthy Person",
  "Mindful Parent",
  "Productive Entrepreneur",
  "Consistent Writer",
  "Focused Student",
  "Resilient Athlete",
  "Calm Leader"
];
const roles = [
  "Student",
  "Entrepreneur",
  "Employee",
  "Creative",
  "Athlete",
  "Parent"
];
const ageGroups = ["Teen", "20s", "30s", "40s", "50s", "60+"];

const struggleOptions = [
  "Procrastination",
  "Lack of Time",
  "No Motivation",
  "Distractions",
  "Consistency"
];

export default function Index() {
  // --- Form state
  const [inputs, setInputs] = useState({
    identity: "",
    ageGroup: "",
    role: "",
    habit: "",
    struggles: [] as string[],

    // Law #1
    cueWhere: "",
    cueWhen: "",
    stack: "",
    // Law #2
    rewardWhy: "",
    rewardPair: "",
    // Law #3
    easyAction: "",
    twoMin: "",
    // Law #4
    streakHow: "",
    rewardWhat: "",
  });

  const [openStep, setOpenStep] = useState(0); // which card is open
  const [completedSteps, setCompletedSteps] = useState(0); // how many law modules filled

  const { toast } = useToast();

  // Progress: 0–5 (Intro + 4 modules)
  const totalSteps = 5;

  // When each Law's minimal fields are answered, count it as completed
  const lawCompletion = useMemo(() => [
    !!inputs.identity && !!inputs.ageGroup && !!inputs.role && !!inputs.habit, // Identity block
    !!(inputs.cueWhere || inputs.cueWhen || inputs.stack), // Make It Obvious
    !!(inputs.rewardWhy || inputs.rewardPair), // Make It Attractive
    !!(inputs.easyAction || inputs.twoMin), // Make It Easy
    !!(inputs.streakHow || inputs.rewardWhat), // Make It Satisfying
  ], [inputs]);

  React.useEffect(() => {
    setCompletedSteps(lawCompletion.filter(Boolean).length);
  }, [lawCompletion]);

  // Smart "autofill" on template select
  function setField(name: string, value: string | string[]) {
    setInputs((i) => ({ ...i, [name]: value }));
  }

  // Checkbox group for struggles
  function toggleStruggle(struggle: string) {
    setInputs(i => ({
      ...i,
      struggles: i.struggles.includes(struggle)
        ? i.struggles.filter(s => s !== struggle)
        : [...i.struggles, struggle]
    }));
  }

  // For focus-wins microanimation
  const [sparkleStep, setSparkleStep] = useState(-1);

  function onCompleteModule(index: number) {
    setSparkleStep(index);
    setTimeout(() => setSparkleStep(-1), 750);
    setCompletedSteps(Math.max(completedSteps, index + 1));
    toast({
      title: "🎉 Habit Design Step Complete",
      description: `Great! Move to the next Law or check your blueprint.`,
    });
    // Advance to next module
    setOpenStep(index + 1);
  }

  // --- Layout (Sticky Sidebar on desktop, collapsible on mobile)
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="flex flex-col w-full max-w-2xl py-14 px-2 md:px-8 mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-playfair font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-gray-600 to-primary tracking-tight animate-fade-in">
            Atomic Habits
          </h1>
          <p className="mt-3 text-lg text-gray-500 font-inter animate-fade-in">
            Build better habits by design.<br className="hidden md:block" />
            Craft your <span className="font-medium text-primary">atomic habit blueprint</span> in small steps—powered by your identity.
          </p>
        </div>

        <ProgressBar steps={totalSteps} current={completedSteps} />

        {/* ===== STEP 1: USER CONTEXT (IDENTITY) ===== */}
        <CardSection
          step={1}
          title={
            <span id="identity" className="font-playfair text-xl">
              Identity Alignment <span className="ml-1 text-base text-emerald-600">🧠</span>
            </span>
          }
          open={openStep === 0}
          completed={lawCompletion[0]}
          summary={
            lawCompletion[0] && (
              <>I am becoming a <b>{inputs.identity || "..."}</b> — this habit supports that.</>
            )
          }
          onToggle={() => setOpenStep(openStep === 0 ? -1 : 0)}
        >
          <p className="mb-2 text-sm text-gray-500 font-inter animate-fade-in">
            Every habit casts a vote for the type of person you want to be.
          </p>
          <div className="mb-3">
            <label className="block mb-1 font-medium">Who are you becoming?</label>
            {/* Templates and free input */}
            <div className="flex flex-wrap gap-2 mb-2">
              {identityTemplates.map((template) =>
                <button
                  type="button"
                  key={template}
                  className={
                    "px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs hover:bg-primary/10 transition-colors " +
                    (inputs.identity === template ? "ring-2 ring-primary font-semibold" : "")
                  }
                  onClick={() => setField("identity", template)}
                >
                  {template}
                </button>
              )}
            </div>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2"
              placeholder='e.g. "A calm leader"'
              value={inputs.identity}
              onChange={e => setField("identity", e.target.value)}
            />
          </div>
          <div className="mb-3 flex flex-wrap gap-4">
            <div>
              <label className="block mb-1 font-medium">Age Group / Life Stage</label>
              <select
                className="rounded-lg border px-2 py-1 w-[120px]"
                value={inputs.ageGroup}
                onChange={e => setField("ageGroup", e.target.value)}
              >
                <option value="">Select</option>
                {ageGroups.map((group, i) => (
                  <option key={i} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Profession or Role</label>
              <select
                className="rounded-lg border px-2 py-1 w-[140px]"
                value={inputs.role}
                onChange={e => setField("role", e.target.value)}
              >
                <option value="">Select</option>
                {roles.map((r, i) => (
                  <option key={i} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="block mb-1 font-medium">Primary Habit Goal</label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2"
              placeholder='e.g. "Go to gym 3x a week"'
              value={inputs.habit}
              onChange={e => setField("habit", e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Current Struggles</label>
            <div className="flex flex-wrap gap-2">
              {struggleOptions.map((struggle) => (
                <button
                  key={struggle}
                  type="button"
                  className={
                    "px-3 py-1 rounded-lg border text-xs transition-all " +
                    (inputs.struggles.includes(struggle)
                      ? "bg-emerald-100 border-green-400 text-green-700 ring-2 ring-green-400"
                      : "bg-muted border-muted-foreground/20 text-muted-foreground hover:bg-primary/10")
                  }
                  onClick={() => toggleStruggle(struggle)}
                >
                  {struggle}
                </button>
              ))}
            </div>
          </div>
          {/* Complete */}
          <button
            className={
              "mt-4 w-full rounded-lg px-4 py-2 font-semibold font-inter text-white transition-colors " +
              (lawCompletion[0]
                ? "bg-primary/90 hover:bg-primary"
                : "bg-muted text-muted-foreground cursor-not-allowed")
            }
            disabled={!lawCompletion[0]}
            onClick={() => onCompleteModule(0)}
          >
            Save & Next
            <Sparkle show={sparkleStep === 0} />
          </button>
        </CardSection>

        {/* ===== STEP 2: LAW 1 – MAKE IT OBVIOUS ===== */}
        <CardSection
          step={2}
          title={
            <span id="obvious" className="font-playfair text-xl">
              Law 1: Make It Obvious <span className="ml-1 text-base">👁</span>
            </span>
          }
          open={openStep === 1}
          completed={lawCompletion[1]}
          summary={
            lawCompletion[1] && (
              <>
                Cue set:
                <span className="ml-1 text-primary font-medium">
                  {inputs.cueWhere ? `at ${inputs.cueWhere}` : ""}
                  {inputs.cueWhen ? `, when ${inputs.cueWhen}` : ""}
                  {inputs.stack ? `, after ${inputs.stack}` : ""}
                </span>
              </>
            )
          }
          onToggle={() => setOpenStep(openStep === 1 ? -1 : 1)}
        >
          <p className="mb-2 text-sm text-gray-500 font-inter animate-fade-in">
            Design your cue: Where and when does the new habit take place?
          </p>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Where will you do this habit?</label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2"
              placeholder='e.g. "My kitchen", "At the park"'
              value={inputs.cueWhere}
              onChange={e => setField("cueWhere", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">When will you do it?</label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2"
              placeholder='e.g. "After waking up", "At 7am"'
              value={inputs.cueWhen}
              onChange={e => setField("cueWhen", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Stack it with an existing habit?</label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2"
              placeholder='e.g. "After making coffee"'
              value={inputs.stack}
              onChange={e => setField("stack", e.target.value)}
            />
          </div>
          <button
            className={
              "mt-4 w-full rounded-lg px-4 py-2 font-semibold font-inter text-white transition-colors " +
              (lawCompletion[1]
                ? "bg-primary/90 hover:bg-primary"
                : "bg-muted text-muted-foreground cursor-not-allowed")
            }
            disabled={!lawCompletion[1]}
            onClick={() => onCompleteModule(1)}
          >
            Save & Next
            <Sparkle show={sparkleStep === 1} />
          </button>
        </CardSection>

        {/* ===== STEP 3: LAW 2 – MAKE IT ATTRACTIVE ===== */}
        <CardSection
          step={3}
          title={
            <span id="attractive" className="font-playfair text-xl text-black">
              Law 2: Make It Attractive <span className="ml-1 text-base">❤️</span>
            </span>
          }
          open={openStep === 2}
          completed={lawCompletion[2]}
          summary={
            lawCompletion[2] && (
              <>
                Reward: <span className="text-primary font-medium">{inputs.rewardWhy}</span>
                {inputs.rewardPair && (
                  <> Bundled with: <span className="text-purple-600">{inputs.rewardPair}</span></>
                )}
              </>
            )
          }
          onToggle={() => setOpenStep(openStep === 2 ? -1 : 2)}
        >
          <p className="mb-2 text-sm text-gray-500 font-inter animate-fade-in">
            Why will this habit be rewarding? Can you pair it with something you enjoy?
          </p>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Why do you want this habit? <span className="text-xs text-muted-foreground">(find your deeper reason)</span></label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2"
              placeholder='e.g. "To feel strong", "For peace of mind"'
              value={inputs.rewardWhy}
              onChange={e => setField("rewardWhy", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Pair with something pleasurable? (Temptation Bundling)</label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2"
              placeholder='e.g. "Listen to a podcast", "Light a candle"'
              value={inputs.rewardPair}
              onChange={e => setField("rewardPair", e.target.value)}
            />
          </div>
          <button
            className={
              "mt-4 w-full rounded-lg px-4 py-2 font-semibold font-inter text-white transition-colors " +
              (lawCompletion[2]
                ? "bg-primary/90 hover:bg-primary"
                : "bg-muted text-muted-foreground cursor-not-allowed")
            }
            disabled={!lawCompletion[2]}
            onClick={() => onCompleteModule(2)}
          >
            Save & Next
            <Sparkle show={sparkleStep === 2} />
          </button>
        </CardSection>

        {/* ===== STEP 4: LAW 3 – MAKE IT EASY ===== */}
        <CardSection
          step={4}
          title={
            <span id="easy" className="font-playfair text-xl text-black">
              Law 3: Make It Easy <span className="ml-1 text-base">⚡</span>
            </span>
          }
          open={openStep === 3}
          completed={lawCompletion[3]}
          summary={
            lawCompletion[3] && (
              <>
                Make it tiny: <span className="text-primary font-medium">{inputs.twoMin}</span>
                {inputs.easyAction && <span className="ml-1 text-muted-foreground">(Starter: {inputs.easyAction})</span>}
              </>
            )
          }
          onToggle={() => setOpenStep(openStep === 3 ? -1 : 3)}
        >
          <p className="mb-2 text-sm text-gray-500 font-inter animate-fade-in">
            Break it down: What's the smallest step you can take? Can you make starting take 2 minutes or less?
          </p>
          <div className="mb-2">
            <label className="block mb-1 font-medium">How can you make this habit take less than 2 minutes to start?</label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2"
              placeholder='e.g. "Put on my shoes", "Open my notes app"'
              value={inputs.twoMin}
              onChange={e => setField("twoMin", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">What's the minimum viable version?</label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2"
              placeholder='e.g. "Do 5 pushups", "Draft one sentence"'
              value={inputs.easyAction}
              onChange={e => setField("easyAction", e.target.value)}
            />
          </div>
          <button
            className={
              "mt-4 w-full rounded-lg px-4 py-2 font-semibold font-inter text-white transition-colors " +
              (lawCompletion[3]
                ? "bg-primary/90 hover:bg-primary"
                : "bg-muted text-muted-foreground cursor-not-allowed")
            }
            disabled={!lawCompletion[3]}
            onClick={() => onCompleteModule(3)}
          >
            Save & Next
            <Sparkle show={sparkleStep === 3} />
          </button>
        </CardSection>

        {/* ===== STEP 5: LAW 4 – MAKE IT SATISFYING ===== */}
        <CardSection
          step={5}
          title={
            <span id="satisfying" className="font-playfair text-xl text-black">
              Law 4: Make It Satisfying <span className="ml-1 text-base">✅</span>
            </span>
          }
          open={openStep === 4}
          completed={lawCompletion[4]}
          summary={
            lawCompletion[4] && (
              <>
                Track: <span className="text-primary font-medium">{inputs.streakHow}</span>
                {inputs.rewardWhat && <span className="ml-1 text-muted-foreground">(Reward: {inputs.rewardWhat})</span>}
              </>
            )
          }
          onToggle={() => setOpenStep(openStep === 4 ? -1 : 4)}
        >
          <p className="mb-2 text-sm text-gray-500 font-inter animate-fade-in">
            Seal the habit loop with visible progress and a positive reward.
          </p>
          <div className="mb-2">
            <label className="block mb-1 font-medium">How will you track success?</label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2"
              placeholder='e.g. "Mark a calendar", "Streak app", "Journal entry"'
              value={inputs.streakHow}
              onChange={e => setField("streakHow", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Reward for completion?</label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2"
              placeholder='e.g. "Enjoy a treat", "Scroll Instagram"' 
              value={inputs.rewardWhat}
              onChange={e => setField("rewardWhat", e.target.value)}
            />
          </div>
          <button
            className={
              "mt-4 w-full rounded-lg px-4 py-2 font-semibold font-inter text-white transition-colors " +
              (lawCompletion[4]
                ? "bg-primary/90 hover:bg-primary"
                : "bg-muted text-muted-foreground cursor-not-allowed")
            }
            disabled={!lawCompletion[4]}
            onClick={() => onCompleteModule(4)}
          >
            Finish & View Blueprint
            <Sparkle show={sparkleStep === 4} />
          </button>
        </CardSection>
        {/* ------------------------------------------------------------ */}
        <div className="text-[13px] text-muted-foreground text-center mt-12 mb-2 font-inter">
          <a className="underline hover:text-primary transition-colors cursor-pointer" href="https://jamesclear.com/atomic-habits" target="_blank" rel="noopener noreferrer">
            Based on Atomic Habits by James Clear
          </a>{" | "}
          <a className="underline hover:text-primary transition-colors cursor-pointer" href="https://behaviormodel.org/" target="_blank" rel="noopener noreferrer">
            BJ Fogg's Behavior Model
          </a>
        </div>
      </div>
    </div>
  );
}

// NOTE: src/pages/Index.tsx is very long. Consider asking me to refactor it into smaller files to keep the codebase easy to manage!
