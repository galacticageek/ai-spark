import React from 'react';
import { DayId } from '../types';
import { Calendar, Layers, Zap, Clock, TrendingUp, CheckCircle, Award } from 'lucide-react';
import { TextFade } from './ui/text-fade';

interface HeroBannerProps {
  activeTab: DayId | 'hub' | 'presentation' | 'playground' | 'talentbridge' | 'bookmarks';
  setActiveTab: (tab: DayId | 'hub' | 'presentation' | 'playground' | 'talentbridge' | 'bookmarks') => void;
  completedCount: number;
  totalStepsCount: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  activeTab,
  setActiveTab,
  completedCount,
  totalStepsCount
}) => {
  const tabs: { id: DayId; label: string; tag: string; num: string }[] = [
    { id: 'day3', label: 'Day 3: Custom GPT', tag: 'Foundations & Training', num: '03' },
    { id: 'day4', label: 'Day 4: Lovable', tag: 'Web Forms & Automation', num: '04' },
    { id: 'day5', label: 'Day 5: n8n Pipeline', tag: 'Multi-Node Pipeline', num: '05' },
    { id: 'day6', label: 'Day 6: Pitch Deck', tag: 'Pitch Deck & Rollout', num: '06' },
    { id: 'talentbridge', label: 'Project #13', tag: 'Full Enterprise System', num: '13' }
  ];

  return (
    <div className="bg-[#FFFFFF] border-b border-[#E5E5E0] pt-8 pb-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Text */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1  bg-[#F4F4F1] border border-[#E5E5E0] text-[10px] text-[#8C8C88] uppercase tracking-widest font-semibold mb-3">
              <Calendar className="w-3 h-3 text-[#A3B18A]" />
              <span>AI Bootcamp Curriculum Guide</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-[#1A1A1A] tracking-tight mb-2">
              <TextFade textContent="Master Automated Systems with" /> <span className="font-medium text-[#1A1A1A] underline decoration-[#A3B18A] decoration-2 underline-offset-4">AI-Spark</span>
            </h1>
            <p className="text-sm text-[#6B6B66] max-w-2xl leading-relaxed mt-1">
              <TextFade textContent="Step-by-step click paths, interactive n8n node blueprinters, live API testing, Lovable site prompt builders, and downloadable deployment assets." />
            </p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            <div className="p-4  border border-[#E5E5E0] bg-[#FDFDFB] text-center">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#8C8C88] mb-1">Annual Savings</div>
              <div className="text-lg font-mono font-medium text-[#1A1A1A] flex items-center justify-center gap-1">
                <TrendingUp className="w-4 h-4 text-[#A3B18A]" />
                $42,000+
              </div>
            </div>
            <div className="p-4  border border-[#E5E5E0] bg-[#FDFDFB] text-center">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#8C8C88] mb-1">Speed Boost</div>
              <div className="text-lg font-mono font-medium text-[#C06C4C] flex items-center justify-center gap-1">
                <Zap className="w-4 h-4 text-[#C06C4C]" />
                99.8%
              </div>
            </div>
            <div className="p-4  border border-[#E5E5E0] bg-[#FDFDFB] text-center col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#8C8C88] mb-1">Modules Done</div>
              <div className="text-lg font-mono font-medium text-[#A3B18A] flex items-center justify-center gap-1">
                <Award className="w-4 h-4 text-[#A3B18A]" />
                {completedCount}/{totalStepsCount}
              </div>
            </div>
          </div>
        </div>

        {/* Day Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-[#E5E5E0] pt-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-2.5  border text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                    : 'bg-[#F4F4F1] text-[#2D2D2D] border-[#E5E5E0] hover:bg-white hover:border-[#A3B18A]'
                }`}
                id={`tab-select-${tab.id}`}
             >
                <span className={`font-mono text-xs ${isActive ? 'text-[#A3B18A]' : 'text-[#8C8C88]'}`}>
                  {tab.num}
                </span>
                <div className="text-left">
                  <div className="font-semibold leading-none mb-1">{tab.label}</div>
                  <div className={`text-[10px] tracking-wide ${isActive ? 'text-gray-300' : 'text-[#8C8C88]'}`}>
                    {tab.tag}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
