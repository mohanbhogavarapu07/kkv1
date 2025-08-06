import React, { useState } from "react";
import { Star, Smile, Book, BookOpen } from "lucide-react";

// --- Put these at file scope for reuse
const ages = [
  { value: "teen", label: "Teen" },
  { value: "20s", label: "20s" },
  { value: "30s", label: "30s" },
  { value: "40s", label: "40s" },
  { value: "50s", label: "50s" },
  { value: "60+", label: "60+" },
];
const roles = [
  "Student",
  "Entrepreneur",
  "Parent",
  "Remote Worker",
  "Employee",
  "Creative",
  "Retiree",
];
const emotions = [
  { value: "Anxious", label: "Anxious", emoji: "😰" },
  { value: "Angry", label: "Angry", emoji: "😡" },
  { value: "Sad", label: "Sad", emoji: "😢" },
  { value: "Overwhelmed", label: "Overwhelmed", emoji: "😩" },
  { value: "Unmotivated", label: "Unmotivated", emoji: "😔" },
  { value: "Lonely", label: "Lonely", emoji: "😞" },
  { value: "Insecure", label: "Insecure", emoji: "😳" },
  { value: "Frustrated", label: "Frustrated", emoji: "😤" },
];

const ParameterCollection = ({
  params,
  setParams,
  disabled,
  onComplete,
}: {
  params: any;
  setParams: (p: any) => void;
  disabled?: boolean;
  onComplete: () => void;
}) => {
  const [local, setLocal] = useState<any>(params || {});
  const [errors, setErrors] = useState<any>({});
  const [showMore, setShowMore] = useState(false);

  const handleChange = (key: string, value: any) => {
    setLocal({ ...local, [key]: value });
    setErrors({ ...errors, [key]: undefined });
  };

  const validate = () => {
    const errs: any = {};
    if (!local.age) errs.age = "Select age";
    if (!local.role) errs.role = "Select at least one role";
    if (!local.emotion) errs.emotion = "Select your main emotion";
    if (!local.trigger) errs.trigger = "Describe situation or trigger";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const submit = () => {
    if (!validate()) return;
    setParams(local);
    onComplete();
  };

  return (
    <form
      className={`flex flex-col gap-4 max-w-2xl ${disabled ? "opacity-60 pointer-events-none" : ""}`}
      onSubmit={(e) => { e.preventDefault(); submit(); }}
      aria-disabled={disabled}
    >
      <fieldset>
        <label className="block text-sm mb-1 font-medium">Age Group</label>
        <select
          value={local.age || ""}
          onChange={(e) => handleChange("age", e.target.value)}
          className="mt-1 block w-full rounded shadow px-3 py-2 border focus:ring-2"
          disabled={disabled}
          required
        >
          <option value="">Select</option>
          {ages.map(a => <option value={a.value} key={a.value}>{a.label}</option>)}
        </select>
        {errors.age && <span className="text-xs text-red-600">{errors.age}</span>}
      </fieldset>
      <fieldset>
        <label className="block text-sm mb-1 font-medium">Role(s) / Profession</label>
        <div className="flex flex-wrap items-center gap-2 py-1">
          {roles.map((r) => (
            <label
              key={r}
              className={`px-3 py-1 border rounded cursor-pointer flex items-center gap-1 transition-colors
                ${local.role?.includes(r)
                ? "bg-sky-100 border-sky-400 font-bold" : "hover:bg-sky-50"}
              `}
            >
              <input
                type="checkbox"
                className="mr-1"
                checked={(local.role || []).includes(r)}
                onChange={() => {
                  const curr = local.role || [];
                  handleChange("role",
                    curr.includes(r)
                      ? curr.filter((x: string) => x !== r)
                      : [...curr, r]
                  );
                }}
                disabled={disabled}
              />{r}
            </label>
          ))}
        </div>
        {errors.role && <span className="text-xs text-red-600">{errors.role}</span>}
      </fieldset>
      <fieldset>
        <label className="block text-sm mb-1 font-medium">Current Emotion</label>
        <div className="flex flex-wrap gap-2">
          {emotions.map((emo) => (
            <button
              type="button"
              key={emo.value}
              className={`flex flex-col items-center px-4 py-2 rounded shadow-sm border text-lg transition-all
                ${local.emotion === emo.value
                ? "bg-purple-100 border-purple-400 font-bold scale-105"
                : "hover:bg-purple-50"}
              `}
              onClick={() => handleChange("emotion", emo.value)}
              disabled={disabled}
            >
              <span className="text-2xl">{emo.emoji}</span>
              <span className="text-xs">{emo.label}</span>
            </button>
          ))}
        </div>
        {errors.emotion && <span className="text-xs text-red-600">{errors.emotion}</span>}
      </fieldset>
      <fieldset>
        <label className="block text-sm mb-1 font-medium">Triggering Situation <span className="text-xs">(e.g., "Presentation failure")</span></label>
        <input
          value={local.trigger || ""}
          onChange={(e) => handleChange("trigger", e.target.value)}
          type="text"
          className="mt-1 block w-full rounded shadow px-3 py-2 border focus:ring-2"
          placeholder='E.g., "Argument with spouse"'
          required
          disabled={disabled}
        />
        {errors.trigger && <span className="text-xs text-red-600">{errors.trigger}</span>}
      </fieldset>
      <button
        type="submit"
        className="bg-black text-white py-2 px-6 rounded font-semibold shadow hover:bg-gray-900 transition-all w-min self-end mt-3"
        disabled={disabled}
      >
        Next
      </button>
    </form>
  );
};

export default ParameterCollection;

