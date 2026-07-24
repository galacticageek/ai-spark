import React from 'react';
import { Bookmark, ExternalLink } from 'lucide-react';
import { BootcampModule, DayId } from '../types';
import { BOOTCAMP_MODULES } from '../data/bootcampData';

interface BookmarksViewProps {
  bookmarkedSteps: Record<string, boolean>;
  setActiveTab: (tab: DayId) => void;
  onToggleBookmark: (stepId: string) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({ bookmarkedSteps, setActiveTab, onToggleBookmark }) => {
  const bookmarkedStepData = BOOTCAMP_MODULES.flatMap(mod => 
    mod.steps.filter(s => bookmarkedSteps[s.id]).map(s => ({ ...s, module: mod }))
  );

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E5E5E0] p-6 text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FDFDFB] border border-[#E5E5E0]">
          <Bookmark className="w-5 h-5 text-[#C06C4C] fill-[#C06C4C]" />
        </div>
        <h2 className="text-xl font-light text-[#1A1A1A]">Saved Bookmarks</h2>
        <p className="text-xs text-[#8C8C88]">Steps you've saved for quick reference.</p>
      </div>

      <div className="space-y-4">
        {bookmarkedStepData.length === 0 ? (
          <div className="text-center p-12 bg-[#FDFDFB] border border-[#E5E5E0] text-sm text-[#8C8C88]">
            No bookmarks yet. Click the bookmark icon on any step to save it here.
          </div>
        ) : (
          bookmarkedStepData.map(data => (
            <div key={data.id} className="bg-white border border-[#E5E5E0] p-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold text-[#A3B18A] uppercase tracking-widest">
                    Day {data.module.dayNumber} • Step {data.stepNumber}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#1A1A1A]">{data.title}</h3>
                <p className="text-xs text-[#6B6B66] mt-1 line-clamp-2 leading-relaxed">{data.description}</p>
                <button
                  onClick={() => setActiveTab(data.module.id)}
                  className="mt-3 text-xs font-semibold text-[#A3B18A] hover:underline"
                >
                  Go to Module →
                </button>
              </div>
              <button
                onClick={() => onToggleBookmark(data.id)}
                className="p-1.5 bg-[#F4F4F1] hover:bg-rose-50 text-[#8C8C88] hover:text-rose-600 transition-colors"
                title="Remove Bookmark"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
