import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar.tsx";
import { DayId } from '../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: DayId | 'hub' | 'presentation' | 'playground' | 'bookmarks';
  setActiveTab: (tab: DayId | 'hub' | 'presentation' | 'playground' | 'bookmarks') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  progressPercent: number;
  openCheatSheet: () => void;
  onGoToLandingPage: () => void;
}

export const DashboardLayout = ({
  children,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  progressPercent,
  openCheatSheet,
  onGoToLandingPage
}: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        progressPercent={progressPercent}
        openCheatSheet={openCheatSheet}
        onGoToLandingPage={onGoToLandingPage}
      />
      <SidebarInset className="flex w-full flex-col bg-[#F9F9F7] min-h-screen">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
