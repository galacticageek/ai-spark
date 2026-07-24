import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { BOOTCAMP_MODULES } from "../data/bootcampData";
import { DayId } from '../types';
import { Flame, Bookmark, Package, Terminal, Search, HelpCircle, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AppSidebarProps {
  activeTab: DayId | "hub" | "presentation" | "playground" | "bookmarks";
  setActiveTab: (tab: DayId | "hub" | "presentation" | "playground" | "bookmarks") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  progressPercent: number;
  openCheatSheet: () => void;
  onGoToLandingPage: () => void;
}

export function AppSidebar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  progressPercent,
  openCheatSheet,
  onGoToLandingPage
}: AppSidebarProps) {
  return (
    <Sidebar className="bg-white border-r border-[#E5E5E0]">
      <SidebarHeader className="p-4 border-b border-[#E5E5E0] bg-white">
        <div className="flex items-center gap-2 px-1 cursor-pointer" onClick={onGoToLandingPage}>
          <div className="w-6 h-6 bg-[#1A1A1A] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">S</span>
          </div>
          <span className="font-bold text-sm text-[#1A1A1A] tracking-tight">AI-Spark</span>
        </div>
        <div className="mt-6 px-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C8C88] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#C06C4C]" />
              1 Day Streak
            </span>
            <span className="text-xs font-mono text-[#8C8C88]">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-1.5 bg-[#F4F4F1] [&>div]:bg-[#A3B18A]" />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-[#F9F9F7]">
        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8C88]" />
            <input
              type="text"
              placeholder="Search curriculum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E5E5E0] pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#A3B18A] transition-colors rounded-none placeholder:text-[#8C8C88] text-[#1A1A1A]"
            />
          </div>
        </div>

        {/* Modules */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-[#8C8C88] px-4 pb-2">
            Curriculum
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {BOOTCAMP_MODULES.map((module) => (
                <SidebarMenuItem key={module.id}>
                  <SidebarMenuButton 
                    isActive={activeTab === module.id}
                    onClick={() => setActiveTab(module.id)}
                    className={`h-auto py-3 px-4 rounded-none transition-colors border-l-2 ${activeTab === module.id ? 'bg-white border-[#A3B18A] text-[#1A1A1A]' : 'border-transparent text-[#6B6B66] hover:bg-white hover:text-[#1A1A1A]'}`}
                  >
                    <div className="flex flex-col gap-1 w-full">
                      <span className="font-mono text-[10px] uppercase font-bold text-[#8C8C88]">
                        {module.id === 'talentbridge' ? 'Project #13' : `Day ${module.dayNumber}`}
                      </span>
                      <span className="font-semibold text-sm leading-tight truncate">{module.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-[#E5E5E0]" />

        {/* Tools & Resources */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-[#8C8C88] px-4 pb-2 mt-4">
            Resources
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'hub'}
                  onClick={() => setActiveTab('hub')}
                  className={`rounded-none ${activeTab === 'hub' ? 'bg-white text-[#1A1A1A]' : 'text-[#6B6B66] hover:bg-white'}`}
                >
                  <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                    <Package className="w-4 h-4 mr-2" />
                  </motion.div>
                  <span>Download Hub</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'playground'}
                  onClick={() => setActiveTab('playground')}
                  className={`rounded-none ${activeTab === 'playground' ? 'bg-white text-[#1A1A1A]' : 'text-[#6B6B66] hover:bg-white'}`}
                >
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                    <Terminal className="w-4 h-4 mr-2" />
                  </motion.div>
                  <span>API Simulator</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'bookmarks'}
                  onClick={() => setActiveTab('bookmarks')}
                  className={`rounded-none ${activeTab === 'bookmarks' ? 'bg-white text-[#1A1A1A]' : 'text-[#6B6B66] hover:bg-white'}`}
                >
                  <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                    <Bookmark className="w-4 h-4 mr-2" />
                  </motion.div>
                  <span>Saved Bookmarks</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={openCheatSheet}
                  className="rounded-none text-[#6B6B66] hover:bg-white"
                >
                  <motion.div whileHover={{ scale: 1.2, rotate: 15 }} whileTap={{ scale: 0.9 }}>
                    <HelpCircle className="w-4 h-4 mr-2" />
                  </motion.div>
                  <span>Cheat Sheet</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-[#E5E5E0] bg-[#F9F9F7]">
        <button
          onClick={onGoToLandingPage}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#E5E5E0] hover:border-[#A3B18A] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#8C8C88]" />
          <span>Exit Workspace</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
