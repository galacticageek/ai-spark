import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';
import { db } from '../lib/db';
import { useLiveQuery } from 'dexie-react-hooks';

export const LearningStreak: React.FC = () => {
  const settings = useLiveQuery(() => db.settings.toArray());
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    if (!settings) return;
    
    const lastVisit = settings.find(s => s.key === 'lastVisitDate')?.value;
    const currentStreak = settings.find(s => s.key === 'streak')?.value;
    
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      let newStreak = parseInt(currentStreak || '0', 10);
      
      if (lastVisit === yesterday.toDateString()) {
        newStreak += 1;
      } else if (!lastVisit) {
        newStreak = 1;
      } else {
        newStreak = 1;
      }
      
      db.settings.bulkPut([
        { key: 'lastVisitDate', value: today },
        { key: 'streak', value: newStreak.toString() }
      ]).then(() => setStreak(newStreak))
        .catch((err) => console.error('Failed to persist streak', err));
    } else {
      setStreak(parseInt(currentStreak || '1', 10));
    }
  }, [settings]);

  if (!settings) return null;

  return (
    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F4F1] border border-[#E5E5E0] text-xs font-bold text-[#1A1A1A]">
      <Flame className="w-3.5 h-3.5 text-[#C06C4C] fill-[#C06C4C]" />
      <span>{streak} Day Streak</span>
    </div>
  );
};
