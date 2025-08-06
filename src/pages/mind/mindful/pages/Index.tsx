import React, { useState } from "react";
import CBTStepper from "../components/CBTStepper";
import ParameterCollection from "../components/inputs/ParameterCollection";
import ThoughtCapture from "../components/CBTModules/ThoughtCapture";
import DistortionDetector from "../components/CBTModules/DistortionDetector";
import SocraticReframe from "../components/CBTModules/SocraticReframe";
import EmotionalShift from "../components/CBTModules/EmotionalShift";
import ReflectionAction from "../components/CBTModules/ReflectionAction";
import AcademicBadges from "../components/CBTModules/AcademicBadges";

const moduleTitles = [
  "Personalize",
  "Thought Capture",
  "Distortion Detector",
  "Reframe",
  "Emotional Shift",
  "Reflection & Action",
];

const Index = () => {
  // State storage for the whole session
  const [userParams, setUserParams] = useState<any>(null);
  const [thought, setThought] = useState<string>("");
  const [detectedDistortions, setDetectedDistortions] = useState<string[]>([]);
  const [distortionDesc, setDistortionDesc] = useState<string | null>(null);
  const [socraticAnswers, setSocraticAnswers] = useState<any>({});
  const [emotionalShift, setEmotionalShift] = useState<{before: number, after: number, beforeMood: string, afterMood: string}>({before: 5, after: 5, beforeMood: '', afterMood: ''});
  const [reflection, setReflection] = useState<string>("");
  const [suggestedAction, setSuggestedAction] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Simple actions to jump between steps
  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, moduleTitles.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-inter">
      <main className="flex flex-1 w-full max-w-6xl mx-auto gap-12 py-14 px-4 lg:px-10 animate-fade-in">
        <aside className="hidden md:block w-60 sticky top-24 self-start">
          <CBTStepper
            currentStep={currentStep}
            moduleTitles={moduleTitles}
            onStepClick={setCurrentStep}
          />
        </aside>
        <section className="flex-1 flex flex-col gap-10">
          {/* Module 1: Personalization */}
          <div className={`rounded-2xl shadow bg-white px-8 py-8 transition-all duration-300 animate-fade-in ${currentStep === 0 ? "" : "opacity-60 pointer-events-none"} border border-gray-200`}>
            <h2 className="text-2xl font-playfair mb-4 flex items-center gap-2 text-black">1. Personalize Your Session</h2>
            <ParameterCollection
              params={userParams}
              setParams={setUserParams}
              disabled={currentStep !== 0}
              onComplete={nextStep}
            />
          </div>
          {/* Module 2: Thought Capture */}
          <div className={`rounded-2xl shadow bg-white px-8 py-8 transition-all duration-300 animate-fade-in ${currentStep === 1 ? "" : "opacity-60 pointer-events-none"} border border-gray-200`}>
            <h2 className="text-2xl font-playfair mb-4 flex items-center gap-2 text-black">2. Thought Capture</h2>
            <ThoughtCapture
              thought={thought}
              setThought={setThought}
              disabled={currentStep !== 1}
              onComplete={nextStep}
              onBack={prevStep}
              setAutoDetectedDistortions={setDetectedDistortions}
            />
          </div>
          {/* Module 3: Distortion Detector */}
          <div className={`rounded-2xl shadow bg-white px-8 py-8 transition-all duration-300 animate-fade-in ${currentStep === 2 ? "" : "opacity-60 pointer-events-none"} border border-gray-200`}>
            <h2 className="text-2xl font-playfair mb-4 flex items-center gap-2 text-black">3. Distortion Detector</h2>
            <DistortionDetector
              thought={thought}
              detectedDistortions={detectedDistortions}
              onSelect={setDetectedDistortions}
              onComplete={nextStep}
              onBack={prevStep}
              setDistortionDesc={setDistortionDesc}
              disabled={currentStep !== 2}
            />
          </div>
          {/* Module 4: CBT Socratic Reframe */}
          <div className={`rounded-2xl shadow bg-white px-8 py-8 transition-all duration-300 animate-fade-in ${currentStep === 3 ? "" : "opacity-60 pointer-events-none"} border border-gray-200`}>
            <h2 className="text-2xl font-playfair mb-4 flex items-center gap-2 text-black">4. CBT Socratic Reframe</h2>
            <SocraticReframe
              thought={thought}
              distortion={detectedDistortions[0]}
              distortionDesc={distortionDesc}
              answers={socraticAnswers}
              setAnswers={setSocraticAnswers}
              onComplete={(reframe, suggest) => {
                setSocraticAnswers((prev:any)=>({...prev, reframe}));
                setSuggestedAction(suggest);
                nextStep();
              }}
              onBack={prevStep}
              disabled={currentStep !== 3}
              userParams={userParams}
            />
          </div>
          {/* Module 5: Emotional Shift */}
          <div className={`rounded-2xl shadow bg-white px-8 py-8 transition-all duration-300 animate-fade-in ${currentStep === 4 ? "" : "opacity-60 pointer-events-none"} border border-gray-200`}>
            <h2 className="text-2xl font-playfair mb-4 flex items-center gap-2 text-black">5. Emotional Shift</h2>
            <EmotionalShift
              shift={emotionalShift}
              setShift={setEmotionalShift}
              onComplete={nextStep}
              onBack={prevStep}
              disabled={currentStep !== 4}
              emotion={userParams?.emotion || ""}
            />
          </div>
          {/* Module 6: Reflection & Action */}
          <div className={`rounded-2xl shadow bg-white px-8 py-8 transition-all duration-300 animate-fade-in ${currentStep === 5 ? "" : "opacity-60 pointer-events-none"} border border-gray-200`}>
            <h2 className="text-2xl font-playfair mb-4 flex items-center gap-2 text-black">6. Reflection & Action</h2>
            <ReflectionAction
              reflection={reflection}
              setReflection={setReflection}
              action={suggestedAction}
              reframe={socraticAnswers?.reframe || ""}
              onBack={prevStep}
              disabled={currentStep !== 5}
              moodBefore={emotionalShift.before}
              moodAfter={emotionalShift.after}
              onRestart={()=> {
                setCurrentStep(0);
                setUserParams(null);
                setThought("");
                setDetectedDistortions([]);
                setDistortionDesc(null);
                setSocraticAnswers({});
                setEmotionalShift({before: 5, after: 5, beforeMood: '', afterMood: ''});
                setReflection("");
                setSuggestedAction("");
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
