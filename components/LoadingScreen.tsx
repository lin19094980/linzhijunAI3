import React, { useEffect, useState } from 'react';
import { Gavel } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [loadingText, setLoadingText] = useState("柯基法官正在赶来...");

  useEffect(() => {
    const messages = [
      "柯基法官正在戴假发...",
      "正在召集毛绒玩具陪审团...",
      "正在仔细嗅探案件线索...",
      "正在为了公正吃掉零食...",
      "法庭即将开庭，请肃静..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLoadingText(messages[i % messages.length]);
      i++;
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 animate-fade-in">
      <div className="relative mb-10">
         {/* 3D Corgi Avatar */}
        <div className="w-48 h-48 rounded-full flex items-center justify-center animate-bounce-slow filter drop-shadow-xl">
             <img 
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Dog%20Face.png" 
                alt="Judge Corgi" 
                className="w-full h-full object-contain"
            />
        </div>
        <div className="absolute -right-2 -top-2 bg-white p-3 rounded-full shadow-lg animate-pulse border-2 border-corgi-200">
            <Gavel className="w-8 h-8 text-corgi-500" />
        </div>
      </div>
      
      <h2 className="text-3xl font-black text-gray-700 mb-4 tracking-tight">案件审理中</h2>
      <p className="text-corgi-600 font-bold text-lg min-h-[3rem] transition-all duration-500 bg-white/50 px-6 py-2 rounded-full backdrop-blur-sm">
        {loadingText}
      </p>
      
      <div className="mt-8 w-64 h-4 bg-gray-200/50 rounded-full overflow-hidden border border-white shadow-inner">
        <div className="h-full bg-gradient-to-r from-corgi-300 to-corgi-500 animate-[loading_2s_ease-in-out_infinite]" style={{width: '50%'}}></div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};