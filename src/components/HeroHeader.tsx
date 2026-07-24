import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Download, Menu, X } from 'lucide-react';
import { DayId } from '../types';

interface HeroHeaderProps {
  onEnterWorkspace: (targetTab?: DayId | 'hub' | 'presentation' | 'playground' | 'talentbridge') => void;
  onOpenCheatSheet: () => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ onEnterWorkspace, onOpenCheatSheet }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full px-4 pt-4 pb-2 transition-all duration-300">
      <nav
        className={`mx-auto max-w-7xl px-4 py-3 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl border border-[#E5E5E0] shadow-sm max-w-5xl rounded-[2rem]'
            : 'bg-transparent border border-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#0A0A0A] overflow-hidden border border-[#222]">
              <div className="absolute inset-0 bg-[#00ffcc] opacity-20 blur-md"></div>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#00ffcc] relative z-10 drop-shadow-[0_0_5px_rgba(0,255,204,0.8)]">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-lg text-[#1A1A1A] tracking-tight">AI-Spark</span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenCheatSheet}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#6B6B66] hover:text-[#1A1A1A] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#A3B18A]" />
              <span>Reference Guides</span>
            </button>

            <button
              onClick={() => onEnterWorkspace('hub')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#6B6B66] hover:text-[#1A1A1A] transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#8C8C88]" />
              <span>Downloads</span>
            </button>

            <button
              onClick={() => onEnterWorkspace('day3')}
              className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm rounded-lg ml-2"
            >
              <span>Launch</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A3B18A]" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#1A1A1A]"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-[#E5E5E0] flex flex-col gap-4 pb-2 animate-in slide-in-from-top-2">
            <button
              onClick={onOpenCheatSheet}
              className="flex items-center gap-2 text-sm font-semibold text-[#6B6B66] hover:text-[#1A1A1A]"
            >
              <BookOpen className="w-4 h-4 text-[#A3B18A]" />
              <span>Reference Guides</span>
            </button>
            <button
              onClick={() => onEnterWorkspace('hub')}
              className="flex items-center gap-2 text-sm font-semibold text-[#6B6B66] hover:text-[#1A1A1A]"
            >
              <Download className="w-4 h-4 text-[#8C8C88]" />
              <span>Downloads</span>
            </button>
            <button
              onClick={() => onEnterWorkspace('day3')}
              className="flex items-center justify-center gap-2 px-4 py-3 mt-2 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-lg w-full"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
