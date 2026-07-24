import React, { useState, useEffect, Suspense, lazy } from 'react';
import { DayId, BootcampModule } from './types';
import { BOOTCAMP_MODULES } from './data/bootcampData';
import { DOWNLOADABLE_ASSETS } from './data/downloadableFiles';
import { LandingPage } from './components/LandingPage';
import { StepByStepGuide } from './components/StepByStepGuide';
import { N8nWorkflowVisualizer } from './components/n8nWorkflowVisualizer';
import { ApiTestPlayground } from './components/ApiTestPlayground';
import { PresentationDeckViewer } from './components/PresentationDeckViewer';
import { ResourceDownloadHub } from './components/ResourceDownloadHub';
const QuizModal = lazy(() => import('./components/QuizModal').then(module => ({ default: module.QuizModal })));
const CheatSheetModal = lazy(() => import('./components/CheatSheetModal').then(module => ({ default: module.CheatSheetModal })));
import { BookmarksView } from './components/BookmarksView';
import { DashboardLayout } from './components/DashboardLayout';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Search, Coffee } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './lib/db';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster, toast } from 'sonner';

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'workspace'>('landing');
  const [activeTab, setActiveTab] = useState<DayId | 'hub' | 'presentation' | 'playground' | 'talentbridge' | 'bookmarks'>('day3');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeQuizModule, setActiveQuizModule] = useState<BootcampModule | null>(null);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);

  // Load progress from Dexie
  const progressItems = useLiveQuery(() => db.progress.toArray());
  const completedSteps = (progressItems || []).reduce((acc, curr) => {
    acc[curr.stepId] = curr.isCompleted;
    return acc;
  }, {} as Record<string, boolean>);

  // Load bookmarks
  const bookmarksList = useLiveQuery(() => db.bookmarks.toArray());
  const bookmarkedSteps = (bookmarksList || []).reduce((acc, curr) => {
    acc[curr.stepId] = true;
    return acc;
  }, {} as Record<string, boolean>);

  // Save progress to Dexie
  const handleToggleStep = async (stepId: string) => {
    const isCompleted = !completedSteps[stepId];
    await db.progress.put({ stepId, isCompleted });
    if (isCompleted) {
      toast.success('Step completed! Great job.');
    }
  };

  // Toggle bookmark
  const handleToggleBookmark = async (stepId: string) => {
    if (bookmarkedSteps[stepId]) {
      await db.bookmarks.delete(stepId);
      toast('Bookmark removed');
    } else {
      await db.bookmarks.put({ stepId, timestamp: Date.now() });
      toast.success('Step saved to bookmarks');
    }
  };

  // Calculate total step progress percentage
  const totalSteps = BOOTCAMP_MODULES.reduce((acc, m) => acc + m.steps.length, 0);
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = totalSteps> 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  // Handle workflow JSON download
  const handleDownloadWorkflow = () => {
    const asset = DOWNLOADABLE_ASSETS.find((a) => a.id === 'n8n_workflow_json');
    if (!asset) return;
    const blob = new Blob([asset.fileContent], { type: asset.mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = asset.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Get current active module based on tab
  const currentModule = BOOTCAMP_MODULES.find((m) => m.id === activeTab);

  if (viewMode === 'landing') {
    return (
      <TooltipProvider>
        <>
          <LandingPage
            onEnterWorkspace={(targetTab) => {
              if (targetTab) setActiveTab(targetTab);
              setViewMode('workspace');
            }}
            onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
          />
          {/* Cheat Sheet Modal */}
          {isCheatSheetOpen && (
            <Suspense fallback={null}>
              <CheatSheetModal onClose={() => setIsCheatSheetOpen(false)} />
            </Suspense>
          )}
        </>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <DashboardLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        progressPercent={progressPercent}
        openCheatSheet={() => setIsCheatSheetOpen(true)}
        onGoToLandingPage={() => setViewMode('landing')}
      >
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-[#E5E5E0] bg-[#FDFDFB] px-4 py-3">
          <SidebarTrigger className="text-[#8C8C88] hover:text-[#1A1A1A] hover:bg-[#F4F4F1] h-8 w-8 transition-colors" />
          <div className="w-px h-5 bg-[#E5E5E0]" />
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <h2 className="font-semibold text-sm text-[#1A1A1A] truncate">
              {activeTab === 'hub' && 'Download Hub'}
              {activeTab === 'playground' && 'API Simulator'}
              {activeTab === 'bookmarks' && 'Saved Bookmarks'}
              {activeTab === 'presentation' && 'Presentation Deck'}
              {activeTab === 'talentbridge' && 'Project #13 — TalentBridge'}
              {currentModule && `Day ${currentModule.dayNumber}: ${currentModule.title}`}
            </h2>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#8C8C88] hover:text-[#1A1A1A] underline shrink-0"
            >
              Clear search
            </button>
          )}
        </header>

        {/* Content */}
        <ErrorBoundary>
          {searchQuery.trim() !== '' ? (
            <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 space-y-6">
              <div className="bg-white border border-[#E5E5E0] space-y-4 p-6">
                <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-3">
                  <h3 className="font-bold text-sm text-[#1A1A1A] flex items-center gap-2 uppercase tracking-widest">
                    <Search className="w-4 h-4 text-[#A3B18A]" />
                    Results for &ldquo;{searchQuery}&rdquo;
                  </h3>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-[#8C8C88] hover:text-[#1A1A1A] underline"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-3">
                  {BOOTCAMP_MODULES.flatMap((mod) =>
                    mod.steps
                      .filter(
                        (s) =>
                          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (s.clickPath && s.clickPath.toLowerCase().includes(searchQuery.toLowerCase()))
                      )
                      .map((step) => (
                        <div
                          key={step.id}
                          onClick={() => {
                            setActiveTab(mod.id);
                            setSearchQuery('');
                          }}
                          className="p-4 bg-[#F9F8F6] hover:bg-white border border-[#E5E5E0] cursor-pointer transition-all flex items-center justify-between gap-4"
                        >
                          <div>
                            <div className="text-[10px] font-bold text-[#C06C4C] uppercase">
                              Day {mod.dayNumber} • Step {step.stepNumber}
                            </div>
                            <h4 className="font-bold text-sm text-[#1A1A1A]">{step.title}</h4>
                            <p className="text-xs text-[#6B6B66] line-clamp-1">{step.description}</p>
                          </div>
                          <span className="text-xs text-[#1A1A1A] font-semibold bg-white px-3 py-1 border border-[#E5E5E0] shrink-0">
                            Go to Step →
                          </span>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </main>
          ) : (
            <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 space-y-8">
              {/* Day Modules */}
              {currentModule && (
                <StepByStepGuide
                  module={currentModule}
                  completedSteps={completedSteps}
                  bookmarkedSteps={bookmarkedSteps}
                  onToggleStep={handleToggleStep}
                  onToggleBookmark={handleToggleBookmark}
                  onDownloadWorkflow={handleDownloadWorkflow}
                  onTakeQuiz={(mod) => setActiveQuizModule(mod)}
                />
              )}

              {/* TalentBridge Project #13 */}
              {activeTab === 'talentbridge' && (
                <div className="space-y-8">
                  <N8nWorkflowVisualizer onDownloadWorkflow={handleDownloadWorkflow} />
                  <ApiTestPlayground />
                </div>
              )}

              {/* Presentation Deck */}
              {activeTab === 'presentation' && <PresentationDeckViewer />}

              {/* API Playground */}
              {activeTab === 'playground' && <ApiTestPlayground />}

              {/* Download Hub */}
              {activeTab === 'hub' && <ResourceDownloadHub />}

              {/* Bookmarks */}
              {activeTab === 'bookmarks' && (
                <BookmarksView
                  bookmarkedSteps={bookmarkedSteps}
                  setActiveTab={setActiveTab}
                  onToggleBookmark={handleToggleBookmark}
                />
              )}
            </main>
          )}
        </ErrorBoundary>

        {/* Footer */}
        <footer className="border-t border-[#E5E5E0] bg-white py-6 px-6 text-xs text-[#8C8C88]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-semibold text-[#1A1A1A]">AI-Spark</span>
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider">
              <span>Fueled by code &amp;</span>
              <Coffee className="w-3.5 h-3.5 mx-0.5 text-[#C06C4C]" />
              <span>by Oliver Oinam</span>
            </div>
          </div>
        </footer>

        {/* Quiz Modal */}
        {activeQuizModule && (
          <Suspense fallback={null}>
            <QuizModal
              module={activeQuizModule}
              onClose={() => setActiveQuizModule(null)}
              onCompleteQuiz={() => setActiveQuizModule(null)}
            />
          </Suspense>
        )}

        {/* Cheat Sheet Modal */}
        {isCheatSheetOpen && (
          <Suspense fallback={null}>
            <CheatSheetModal onClose={() => setIsCheatSheetOpen(false)} />
          </Suspense>
        )}
      </DashboardLayout>
      <Toaster position="bottom-right" />
    </TooltipProvider>
  );
}
