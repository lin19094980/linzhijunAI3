import React, { useState } from 'react';
import { CaseData } from '../types';
import { Button } from './Button';
import { ScrollText, MessageCircleHeart, UserRound } from 'lucide-react';

interface CaseInputFormProps {
  onSubmit: (data: CaseData) => void;
}

export const CaseInputForm: React.FC<CaseInputFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CaseData>({
    eventDescription: '',
    femaleName: '小仙女',
    femaleArgument: '',
    maleName: '大猪蹄子',
    maleArgument: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.eventDescription || !formData.femaleArgument || !formData.maleArgument) {
      alert("请完整填写案件详情和双方陈述哦！");
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (field: keyof CaseData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Helper to get cute avatar URLs - Switched to 'adventurer' for Manga/Cartoon style
  // Restricting skinColor to lighter tones (f2d3b1, ecad80) as requested
  const getAvatar = (name: string, type: 'female' | 'male') => {
    const seed = name.trim() || (type === 'female' ? 'girl' : 'boy');
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}&skinColor=f2d3b1,ecad80&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in relative z-10">
      
      {/* Event Section */}
      <div className="bg-white p-6 rounded-[2rem] shadow-xl border-2 border-corgi-200">
        <div className="flex items-center gap-2 mb-3 text-corgi-700 font-bold">
            <ScrollText className="w-6 h-6" />
            <h3 className="text-xl">案件还原</h3>
        </div>
        <textarea
          className="w-full p-4 bg-white rounded-2xl border-2 border-gray-100 focus:border-corgi-300 transition-all outline-none text-gray-900 placeholder-gray-400 min-h-[120px] text-base font-medium shadow-inner"
          placeholder="请详细描述发生了什么事..."
          value={formData.eventDescription}
          onChange={(e) => handleChange('eventDescription', e.target.value)}
        />
      </div>

      {/* Sides Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Female Side */}
        <div className="bg-girly-100/90 backdrop-blur-sm p-6 pt-12 rounded-[2.5rem] shadow-lg border-2 border-white relative mt-8 md:mt-0 group hover:-translate-y-1 transition-transform duration-300">
           <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-28 h-28 bg-white rounded-full border-4 border-girly-200 overflow-hidden shadow-md group-hover:scale-110 transition-transform bg-girly-50">
                <img 
                    src={getAvatar(formData.femaleName, 'female')} 
                    alt="Female Avatar" 
                    className="w-full h-full object-cover"
                />
           </div>
           
           <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 bg-white/80 rounded-2xl px-4 py-3 shadow-inner">
                    <UserRound className="w-5 h-5 text-girly-400" />
                    <input 
                        type="text"
                        value={formData.femaleName}
                        onChange={(e) => handleChange('femaleName', e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-800 font-bold text-center"
                        placeholder="名字"
                    />
                </div>
                
                <div className="bg-white p-4 rounded-2xl border border-girly-200 shadow-sm">
                    <label className="text-xs font-bold text-girly-400 mb-2 block uppercase tracking-wide">她的委屈</label>
                    <textarea
                        className="w-full bg-transparent border-none focus:ring-0 outline-none text-gray-800 h-32 resize-none placeholder-gray-400"
                        placeholder="我是对的，因为..."
                        value={formData.femaleArgument}
                        onChange={(e) => handleChange('femaleArgument', e.target.value)}
                    />
                </div>
           </div>
        </div>

        {/* Male Side */}
        <div className="bg-boy-100/90 backdrop-blur-sm p-6 pt-12 rounded-[2.5rem] shadow-lg border-2 border-white relative mt-12 md:mt-0 group hover:-translate-y-1 transition-transform duration-300">
           <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-28 h-28 bg-white rounded-full border-4 border-boy-200 overflow-hidden shadow-md group-hover:scale-110 transition-transform bg-boy-50">
                <img 
                    src={getAvatar(formData.maleName, 'male')} 
                    alt="Male Avatar" 
                    className="w-full h-full object-cover"
                />
           </div>
           
           <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 bg-white/80 rounded-2xl px-4 py-3 shadow-inner">
                    <UserRound className="w-5 h-5 text-boy-400" />
                    <input 
                        type="text"
                        value={formData.maleName}
                        onChange={(e) => handleChange('maleName', e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-800 font-bold text-center"
                        placeholder="名字"
                    />
                </div>
                
                <div className="bg-white p-4 rounded-2xl border border-boy-200 shadow-sm">
                    <label className="text-xs font-bold text-boy-400 mb-2 block uppercase tracking-wide">他的辩解</label>
                    <textarea
                        className="w-full bg-transparent border-none focus:ring-0 outline-none text-gray-800 h-32 resize-none placeholder-gray-400"
                        placeholder="我是有理的，因为..."
                        value={formData.maleArgument}
                        onChange={(e) => handleChange('maleArgument', e.target.value)}
                    />
                </div>
           </div>
        </div>

      </div>

      <div className="pt-4 pb-12">
        <Button type="submit" fullWidth className="text-lg shadow-xl shadow-corgi-300/50">
            <MessageCircleHeart className="w-6 h-6 mr-2" /> 提交法院申请
        </Button>
      </div>
    </form>
  );
};