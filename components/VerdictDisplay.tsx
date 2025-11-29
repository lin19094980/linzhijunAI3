import React from 'react';
import { VerdictResult } from '../types';
import { Button } from './Button';
import { RefreshCcw, Scale, HeartHandshake, Sparkles, AlertCircle, Coffee } from 'lucide-react';

interface VerdictDisplayProps {
  verdict: VerdictResult;
  onReset: () => void;
  femaleName: string;
  maleName: string;
}

export const VerdictDisplay: React.FC<VerdictDisplayProps> = ({ verdict, onReset, femaleName, maleName }) => {
    
  // Helper to get cute avatar URLs (Synced with CaseInputForm)
  // Restricting skinColor to lighter tones (f2d3b1, ecad80)
  const getAvatar = (name: string, type: 'female' | 'male') => {
    const seed = name.trim() || (type === 'female' ? 'girl' : 'boy');
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}&skinColor=f2d3b1,ecad80&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc`;
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Judge Header */}
      <div className="text-center relative z-10">
        <div className="w-32 h-32 mx-auto bg-orange-100 rounded-full border-4 border-white overflow-hidden shadow-xl mb-6 wiggle transform hover:scale-105 transition-transform duration-300">
          <img 
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Dog%20Face.png" 
            alt="Judge Corgi" 
            className="w-full h-full object-cover p-2"
          />
        </div>
        <div className="inline-block bg-corgi-500 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg mb-6 -mt-4 relative z-20">
            ⚖️ 最终判决书
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-[2rem] shadow-xl border-2 border-white relative mx-2">
            <div className="absolute -top-3 left-6 bg-corgi-100 text-corgi-700 text-xs px-3 py-1 rounded-full font-bold border border-corgi-200">
                🐶 陪审团意见
            </div>
            {/* Using Microsoft YaHei for the Jury Opinion as requested */}
            <p 
                className="text-gray-600 leading-loose text-lg font-medium italic"
                style={{ fontFamily: '"Microsoft YaHei", "Heiti SC", sans-serif' }}
            >
                "{verdict.analysis}"
            </p>
        </div>
      </div>

      {/* Responsibility Bar Card */}
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-xl border-4 border-white/50">
        <h3 className="text-center text-gray-400 font-bold mb-6 text-sm tracking-widest uppercase">责任分配</h3>
        
        <div className="flex justify-between items-end mb-4 px-2">
            <div className="text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-girly-200 shadow-md mb-2 bg-girly-50">
                    <img src={getAvatar(femaleName, 'female')} alt="Female" className="w-full h-full object-cover" />
                </div>
                <span className="text-gray-700 font-bold text-sm mb-1">{femaleName}</span>
                <span className="text-3xl font-black text-girly-400">{verdict.femaleResponsibility}%</span>
            </div>
            
            <div className="mb-10">
                <Scale className="text-gray-300 w-8 h-8" />
            </div>
            
            <div className="text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-boy-200 shadow-md mb-2 bg-boy-50">
                    <img src={getAvatar(maleName, 'male')} alt="Male" className="w-full h-full object-cover" />
                </div>
                <span className="text-gray-700 font-bold text-sm mb-1">{maleName}</span>
                <span className="text-3xl font-black text-boy-400">{verdict.maleResponsibility}%</span>
            </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden flex shadow-inner p-1">
            <div 
                className="bg-gradient-to-r from-girly-300 to-girly-400 h-full rounded-l-full flex items-center justify-center text-white text-xs font-bold transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,182,193,0.5)] z-10" 
                style={{ width: `${verdict.femaleResponsibility}%` }}
            >
                {verdict.femaleResponsibility > 15 && "👧"}
            </div>
            <div 
                className="bg-gradient-to-r from-boy-300 to-boy-400 h-full rounded-r-full flex items-center justify-center text-white text-xs font-bold transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(77,208,225,0.5)]" 
                style={{ width: `${verdict.maleResponsibility}%` }}
            >
                {verdict.maleResponsibility > 15 && "👦"}
            </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-red-50/80 border-2 border-red-100 p-6 rounded-[2rem] shadow-sm flex items-start gap-4">
        <div className="bg-white p-2 rounded-full shadow-sm text-red-400 mt-1">
            <AlertCircle className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-lg font-bold text-red-500 mb-1">判决总结</h3>
            <p className="text-gray-700 leading-relaxed">{verdict.verdictSummary}</p>
        </div>
      </div>

      {/* Advice Box */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 p-8 rounded-[2rem] shadow-md relative mt-8 overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <HeartHandshake className="w-32 h-32 text-green-500" />
        </div>
        
        <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-green-600 font-bold mb-4">
                <Sparkles className="w-4 h-4" /> 爱的处方
            </div>
            <p className="text-gray-700 text-lg leading-relaxed font-medium">
                {verdict.advice}
            </p>
        </div>
      </div>

      {/* Donation Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl border-2 border-corgi-200 text-center mt-12 transform hover:scale-[1.01] transition-transform duration-300">
        <div className="flex flex-col items-center gap-3 mb-4 text-corgi-600">
            <div className="bg-orange-100 p-3 rounded-full">
                <Coffee className="w-8 h-8 text-corgi-500" />
            </div>
            <span className="font-bold text-lg text-gray-700">觉得判决公正吗？</span>
        </div>
        
        <div className="bg-gradient-to-tr from-gray-50 to-white p-4 rounded-xl inline-block shadow-inner border border-gray-100 mb-4">
            {/* Placeholder QR Code for "Buy me a coffee" - Replace data with real link in production */}
            <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ThankYouForSupport&color=E69500" 
                alt="打赏二维码" 
                className="w-32 h-32 rounded-lg mix-blend-multiply"
            />
        </div>
        <p className="text-gray-500 font-medium">觉得不错，欢迎打赏支持柯基法官买罐头~ 🦴</p>
        <p className="text-xs text-gray-400 mt-2">您的支持是我们继续断案的动力！</p>
      </div>

      <div className="pt-2">
        <Button onClick={onReset} fullWidth variant="secondary" className="shadow-lg shadow-girly-200">
          <RefreshCcw className="w-5 h-5" /> 审理下一个案件
        </Button>
      </div>
    </div>
  );
};