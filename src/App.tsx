import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Insights from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ServiceDetail from "./pages/ServiceDetail";
import Assessments from "./pages/tools/Assessments";
import MentalFitnessIndexPage from "./pages/assessment/MentalFitnessIndex";
import EntrepreneurialPotential from "./pages/assessment/EntrepreneurialPotential";
import EmotionalIntelligenceEvaluator from "./pages/assessment/EmotionalIntelligenceEvaluator";
import ResilienceScoreAnalyzer from './pages/assessment/ResilienceScoreAnalyzer';
import BurnoutRiskAssessment from './pages/assessment/BurnoutRiskAssessment';
import ProductivityStyleQuiz from './pages/assessment/ProductivityStyleQuiz';
import LeadershipAssessment from './pages/assessment/LeadershipAssessment';
import MoneyFlow from './pages/assessment/MoneyFlow';
import AdminInsights from './pages/admin/Insights';
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Affirmations from "./pages/tools/Affirmations";
import Reflect from "../srcs/pages/Index";
import "../srcs/index.css"; // Import the srcs styles
import MindWoopYourWay from "./pages/MindWoopYourWay";
import MindAtomicHabits from "./pages/MindAtomicHabits";
import MindMindful from "./pages/MindMindful";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1 pt-[72px]">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tools/assessments" element={<Assessments />} />
              <Route path="/tools/affirmations" element={<Affirmations />} />
              <Route path="/srcs" element={<Reflect />} />
              <Route path="/assessment/mental-fitness-index" element={<MentalFitnessIndexPage />} />
              <Route path="/assessment/entrepreneurial-potential" element={<EntrepreneurialPotential />} />
              <Route path="/assessment/emotionalintelligenceevaluator" element={<EmotionalIntelligenceEvaluator />} />
              <Route path="/assessment/resiliencescoreanalyzer" element={<ResilienceScoreAnalyzer />} />
              <Route path="/assessment/burnoutriskassessment" element={<BurnoutRiskAssessment />} />
              <Route path="/assessment/productivity-style-quiz" element={<ProductivityStyleQuiz />} />
              <Route path="/assessment/leadership" element={<LeadershipAssessment />} />
              <Route path="/assessment/money-flow" element={<MoneyFlow />} />
              <Route path="/admin/insights" element={<AdminInsights />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/mind/woop-your-way" element={<MindWoopYourWay />} />
              <Route path="/mind/atomic-habits" element={<MindAtomicHabits />} />
              <Route path="/mind/mindful" element={<MindMindful />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
