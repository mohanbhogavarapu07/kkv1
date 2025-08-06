import React, { useState } from "react";
import { BookOpen, Smile, MessageSquare } from "lucide-react";

// Helper function to generate a reframe (in real v2, you'd use an LLM)
function reframeThought({ original, distortion, answers, userParams }: any) {
  // super simple logic, but does the job!
  let result = `While it's understandable to think "${original}", `;
  if (distortion === "Catastrophizing") result += "remember, setbacks don't define your entire journey. ";
  if (distortion === "All-or-Nothing Thinking") result += "success isn't black-or-white; growth comes between the extremes. ";
  if (distortion === "Overgeneralization") result += "one instance doesn't mean it will always be this way. ";
  if (distortion === "Mind Reading") result += "you can't know for sure what others think—consider giving yourself the benefit of the doubt. ";
  if (distortion === "Should Statements") result += "be kind to yourself; nobody hits 'should' every time. ";
  if (distortion === "Emotional Reasoning") result += "emotions matter, but don't always reflect reality. ";
  if (answers && answers.evidenceAgainst) result += answers.evidenceAgainst + " ";
  if (answers && answers.friendAdvice) result += `If you were helping a friend, you'd say: ${answers.friendAdvice} `;
  result += "Try seeing this in a more compassionate, balanced light.";
  return result;
}

const SocraticReframe = ({
  thought,
  distortion,
  distortionDesc,
  answers,
  setAnswers,
  onComplete,
  onBack,
  disabled,
  userParams,
}: {
  thought: string;
  distortion: string;
  distortionDesc: string | null;
  answers: any;
  setAnswers: (a: any) => void;
  onComplete: (reframe: string, action: string) => void;
  onBack?: () => void;
  disabled?: boolean;
  userParams?: any;
}) => {
  const [local, setLocal] = useState(answers || {});
  const [error, setError] = useState<string | null>(null);

  // Generate a fitting action ("Write down 3 successes" etc.)
  function suggestAction() {
    if (!userParams?.role) return "Take a 3-min walk to reset.";
    if (userParams.role.includes("Entrepreneur"))
      return "Write down 3 past successes you've had in business.";
    if (userParams.role.includes("Student"))
      return "List 2 things you learned this week.";
    if (userParams.role.includes("Parent"))
      return "Do something kind for yourself today.";
    if (userParams.role.includes("Creative"))
      return "Sketch or write for 10 minutes, just for fun.";
    if (userParams.role.includes("Remote Worker"))
      return "Step outside for a short break.";
    return "Send a message of gratitude.";
  }

  const handleChange = (field: string, value: string) => {
    setLocal((prev: any) => ({ ...prev, [field]: value }));
    setError(null);
  };
  const submit = () => {
    if (!local.evidenceFor || !local.evidenceAgainst || !local.friendAdvice || !local.balanced) {
      setError("Please complete all the fields.");
      return;
    }
    setAnswers(local);
    const reframe = local.balanced || reframeThought({ original: thought, distortion, answers: local, userParams });
    const action = suggestAction();
    onComplete(reframe, action);
  };

  return (
    <div className={`${disabled ? "opacity-60 pointer-events-none" : ""}`}>
      <div className="flex gap-3 items-center mb-2">
        <BookOpen className="text-black" size={24}/>
        <span className="font-semibold text-black">Socratic Reframe — <span className="text-xs text-primary">{distortion}</span></span>
      </div>
      {distortionDesc && (
        <div className="mb-3 text-xs bg-blue-50 py-2 px-3 rounded border-l-4 border-blue-400">
          <span className="font-bold">{distortion}:</span> {distortionDesc}
        </div>
      )}
      {/* CBT Socratic questions */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="font-medium text-sm">
            1. What evidence supports this thought?
          </label>
          <textarea
            className="mt-1 w-full rounded border px-3 py-2 shadow focus:ring-2"
            rows={2}
            value={local.evidenceFor || ""}
            onChange={(e) => handleChange("evidenceFor", e.target.value)}
            disabled={disabled}
            placeholder="E.g., I missed the deadline. I made mistakes in the past."
          />
        </div>
        <div>
          <label className="font-medium text-sm">
            2. What evidence contradicts it?
          </label>
          <textarea
            className="mt-1 w-full rounded border px-3 py-2 shadow focus:ring-2"
            rows={2}
            value={local.evidenceAgainst || ""}
            onChange={(e) => handleChange("evidenceAgainst", e.target.value)}
            disabled={disabled}
            placeholder="E.g., I've succeeded often. One mistake doesn't erase my work."
          />
        </div>
        <div>
          <label className="font-medium text-sm">
            3. What would you say to a friend thinking this way?
          </label>
          <textarea
            className="mt-1 w-full rounded border px-3 py-2 shadow focus:ring-2"
            rows={2}
            value={local.friendAdvice || ""}
            onChange={(e) => handleChange("friendAdvice", e.target.value)}
            disabled={disabled}
            placeholder={"E.g., You're more than just this — be kind to yourself."}
          />
        </div>
        <div>
          <label className="font-medium text-sm">
            4. What's a more balanced, helpful way to look at this?
          </label>
          <textarea
            className="mt-1 w-full rounded border px-3 py-2 shadow focus:ring-2"
            rows={2}
            value={local.balanced || ""}
            onChange={(e) => handleChange("balanced", e.target.value)}
            disabled={disabled}
            placeholder="Rephrase your thought in a healthier, more realistic way."
          />
        </div>
      </div>
      {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
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
          onClick={submit}
          disabled={disabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SocraticReframe;
