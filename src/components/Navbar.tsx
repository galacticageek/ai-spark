import React, { useEffect, useRef } from 'react';
import { Search, BookOpen, Download, LayoutDashboard, Presentation, PlaySquare } from 'lucide-react';
import { DayId } from '../types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LearningStreak } from './LearningStreak';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavbarProps {
  activeTab: DayId | 'hub' | 'presentation' | 'playground' | 'talentbridge' | 'bookmarks';
  setActiveTab: (tab: DayId | 'hub' | 'presentation' | 'playground' | 'talentbridge' | 'bookmarks') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  progressPercent: number;
  openCheatSheet: () => void;
  onGoToLandingPage?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  progressPercent,
  openCheatSheet,
  onGoToLandingPage
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Razor-thin progress bar at the very top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
        <div 
          className="h-full bg-[#A3B18A] transition-all duration-500 ease-out" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E0] px-4 md:px-8 py-2 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          
          {/* Brand Logo - Minimal */}
          <button
            onClick={() => onGoToLandingPage ? onGoToLandingPage() : setActiveTab('day3')}
            className="flex items-center gap-2 group focus:outline-none shrink-0"
            id="brand-logo-btn"
            title="Return to Landing Page"
          >
            <div className="w-1.5 h-1.5 bg-[#A3B18A] group-hover:scale-150 transition-transform duration-300" />
            <span className="text-lg font-medium tracking-tight text-[#1A1A1A]">AI-Spark</span>
          </button>
          
          <LearningStreak />

          {/* Center: Search */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-[#1A1A1A] transition-colors" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search curriculum... (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 h-8 bg-transparent border-transparent hover:bg-[#F9F9F7] focus-visible:bg-[#F9F9F7] focus-visible:ring-1 focus-visible:ring-[#E5E5E0] transition-all text-xs placeholder:text-muted-foreground shadow-none"
                id="search-input"
              />
            </div>
          </div>

          {/* Right: Navigation Links & Actions */}
          <nav className="flex items-center gap-0.5 shrink-0">
            {onGoToLandingPage && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onGoToLandingPage}
                className="text-xs text-muted-foreground hover:text-[#1A1A1A] h-8"
              >
                Home
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('talentbridge')}
              className={`text-xs gap-1.5 h-8 ${activeTab === 'talentbridge' ? 'text-[#1A1A1A] font-semibold bg-[#F9F9F7]' : 'text-muted-foreground hover:text-[#1A1A1A]'}`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Project</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('presentation')}
              className={`text-xs gap-1.5 h-8 ${activeTab === 'presentation' ? 'text-[#1A1A1A] font-semibold bg-[#F9F9F7]' : 'text-muted-foreground hover:text-[#1A1A1A]'}`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Deck</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('playground')}
              className={`text-xs gap-1.5 h-8 ${activeTab === 'playground' ? 'text-[#1A1A1A] font-semibold bg-[#F9F9F7]' : 'text-muted-foreground hover:text-[#1A1A1A]'}`}
            >
              <PlaySquare className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Webhook</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('hub')}
              className={`text-xs gap-1.5 h-8 ${activeTab === 'hub' ? 'text-[#1A1A1A] font-semibold bg-[#F9F9F7]' : 'text-muted-foreground hover:text-[#1A1A1A]'}`}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Files</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('bookmarks')}
              className={`text-xs gap-1.5 h-8 ${activeTab === 'bookmarks' ? 'text-[#1A1A1A] font-semibold bg-[#F9F9F7]' : 'text-muted-foreground hover:text-[#1A1A1A]'}`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Bookmarks</span>
            </Button>

            <div className="w-[1px] h-4 bg-[#E5E5E0] mx-1.5 hidden sm:block" />

            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={openCheatSheet}
                  className="w-8 h-8 hover:bg-[#F9F9F7]"
                  id="nav-cheatsheet-btn"
                >
                  <BookOpen className="w-4 h-4 text-[#A3B18A]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="end" className="text-xs">
                Docs
              </TooltipContent>
            </Tooltip>
          </nav>
        </div>
      </header>
    </>
  );
};
