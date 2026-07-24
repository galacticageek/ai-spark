import React from 'react';
import { Bot, Sparkles, Send } from 'lucide-react';
import { motion } from 'motion/react';

export const MiniDashboard: React.FC = () => {
  return (
    <div className="relative w-full max-w-sm mx-auto space-y-3 rounded-2xl bg-white/40 p-4 border border-white/40 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div className="flex items-center gap-2 text-orange-500">
          <Bot className="w-5 h-5 text-[#A3B18A]" />
          <div className="text-sm font-bold text-[#1A1A1A]">AI Workflow Setup</div>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
        </div>
      </div>
      
      <div className="space-y-4 pt-2">
        {/* User Message */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-end"
        >
          <div className="bg-[#1A1A1A] text-white text-xs p-3 rounded-xl rounded-tr-none shadow-sm max-w-[85%]">
            Generate a 3-module communication framework for TechFlow India.
          </div>
        </motion.div>

        {/* AI Response */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex justify-start"
        >
          <div className="bg-white border border-[#E5E5E0] text-[#1A1A1A] text-xs p-3 rounded-xl rounded-tl-none shadow-sm max-w-[90%] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#A3B18A] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Drafting Plan...</span>
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 bg-[#F4F4F1] rounded w-full"></div>
              <div className="h-1.5 bg-[#F4F4F1] rounded w-5/6"></div>
              <div className="h-1.5 bg-[#F4F4F1] rounded w-4/6"></div>
            </div>
            <div className="flex items-center gap-2 pt-2 mt-2 border-t border-[#F4F4F1]">
              <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-bold uppercase tracking-wider rounded">Module 1 Ready</span>
              <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-bold uppercase tracking-wider rounded">Module 2 Ready</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative mt-4">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Sparkles className="w-4 h-4 text-[#8C8C88]" />
        </div>
        <input 
          disabled
          type="text" 
          placeholder="Refining output..." 
          className="w-full h-10 pl-9 pr-10 text-xs bg-white/60 border border-white/40 rounded-xl focus:outline-none placeholder:text-[#8C8C88]"
        />
        <button className="absolute inset-y-1.5 right-1.5 w-7 h-7 bg-[#A3B18A] flex items-center justify-center rounded-lg text-white shadow-sm opacity-50">
          <Send className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
