import { useState } from "react";
import WoopStepper from "../components/WoopStepper";
import WoopPersonalizeForm from "../components/WoopPersonalizeForm";
import WoopWish from "../components/WoopWish";
import WoopOutcome from "../components/WoopOutcome";
import WoopObstacle from "../components/WoopObstacle";
import WoopPlan from "../components/WoopPlan";
import WoopSummaryCard from "../components/WoopSummaryCard";
import { cn } from "../lib/utils";

const steps = [
  "Personalize",
  "Wish",
  "Outcome",
  "Obstacle",
  "Plan",
  "Summary",
];

const Index = () => {
  const [currentStep, setStep] = useState(0);
  // Central WOOP state
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    lifeStage: "",
    roles: [],
    goalDomain: "",
    goalTimeframe: "",
    reflectionIntensity: "Moderate",
  });
  const [wish, setWish] = useState("");
  const [outcome, setOutcome] = useState("");
  const [mood, setMood] = useState(5);
  const [obstacle, setObstacle] = useState("");
  const [plan, setPlan] = useState("");

  const next = () => setStep((s) => Math.min(steps.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const goTo = (i: number) => setStep(i);

  // Gather all data for the summary card
  const summaryData = {
    ...personalInfo,
    wish,
    outcome,
    mood,
    obstacle,
    plan,
  };

  return (
    <div className={cn(
      "min-h-screen w-full bg-gradient-to-bl from-gray-50 via-gray-200 to-gray-100 font-inter",
      "flex flex-col items-center justify-start pb-12"
    )}>
      <div className="w-full max-w-4xl mt-10 px-0 md:px-8">
        <WoopStepper step={currentStep} steps={steps} />
        <div className="relative transition-all animate-fade-in mt-8">
          {currentStep === 0 && (
            <WoopPersonalizeForm
              value={personalInfo}
              onChange={setPersonalInfo}
              onNext={next}
            />
          )}
          {currentStep === 1 && (
            <WoopWish
              value={wish}
              onChange={setWish}
              onNext={next}
              onBack={back}
              user={personalInfo}
            />
          )}
          {currentStep === 2 && (
            <WoopOutcome
              value={outcome}
              mood={mood}
              onChange={setOutcome}
              onMood={setMood}
              onNext={next}
              onBack={back}
              user={personalInfo}
            />
          )}
          {currentStep === 3 && (
            <WoopObstacle
              wish={wish}
              value={obstacle}
              onChange={setObstacle}
              onNext={next}
              onBack={back}
            />
          )}
          {currentStep === 4 && (
            <WoopPlan
              obstacle={obstacle}
              value={plan}
              onChange={setPlan}
              onNext={next}
              onBack={back}
            />
          )}
          {currentStep === 5 && (
            <WoopSummaryCard
              data={summaryData}
              onRestart={() => {
                setStep(0);
                setWish(""); setOutcome("");
                setObstacle(""); setPlan("");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
