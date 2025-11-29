import React, { useState } from 'react';
import { AppStep, CaseData, VerdictResult } from './types';
import { CaseInputForm } from './components/CaseInputForm';
import { LoadingScreen } from './components/LoadingScreen';
import { VerdictDisplay } from './components/VerdictDisplay';
import { judgeCase } from './services/geminiService';
import { Github } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.INPUT);
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [verdict, setVerdict] = useState<VerdictResult | null>(null);

  const handleFormSubmit = async (data: CaseData) => {
    setCaseData(data);
    setStep(AppStep.LOADING);
    
    // Call Gemini API
    const result = await judgeCase(data);
    
    setVerdict(result);
    setStep(AppStep.RESULT);
  };

  const handleReset = () => {
    setCaseData(null);
    setVerdict(null);
    setStep(AppStep.INPUT);
  };

  return (
    <div className="min-h-screen bg-corgi-100 font-sans selection:bg-girly-300 selection:text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="text-center mb-8 relative">
          <div className="inline-block relative">
            <h1 className="text-3xl md:text-4xl font-extrabold text-corgi-700 tracking-tight drop-shadow-sm">
              🐶 柯基情侣法官
            </h1>
            <span className="absolute -top-3 -right-6 bg-girly-300 text-white text-xs px-2 py-1 rounded-full transform rotate-12">
              Cute!
            </span>
          </div>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            公平 · 公正 · 卖萌 — 专治各种不服
          </p>
        </header>

        {/* Main Content Area */}
        <main>
          {step === AppStep.INPUT && (
            <CaseInputForm onSubmit={handleFormSubmit} />
          )}

          {step === AppStep.LOADING && (
            <LoadingScreen />
          )}

          {step === AppStep.RESULT && verdict && caseData && (
            <VerdictDisplay 
              verdict={verdict} 
              onReset={handleReset}
              femaleName={caseData.femaleName}
              maleName={caseData.maleName}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400 text-xs py-4">
          <p>© {new Date().getFullYear()} Corgi Couple Court.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
