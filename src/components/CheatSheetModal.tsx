import React from 'react';
import { BookOpen, Copy, Check, Download } from 'lucide-react';
import { DOWNLOADABLE_ASSETS } from '../data/downloadableFiles';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface CheatSheetModalProps {
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'student' | 'instructor'>('student');

  const studentAsset = DOWNLOADABLE_ASSETS.find((a) => a.id === 'student_cheat_sheet_md')!;
  const instructorAsset = DOWNLOADABLE_ASSETS.find((a) => a.id === 'teaching_guide_md')!;

  const activeAsset = activeTab === 'student' ? studentAsset : instructorAsset;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeAsset.fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeAsset.fileContent], { type: activeAsset.mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeAsset.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="w-full max-w-3xl border border-[#E5E5E0] bg-white p-0 shadow-xl max-h-[85vh] flex flex-col" showCloseButton={false}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E5E0] px-6 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#1A1A1A] text-[#A3B18A]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-light text-base text-[#1A1A1A]">Bootcamp Reference Guides</h3>
              <p className="text-xs text-[#8C8C88]">Student Cheat Sheet & Instructor Teaching Methodologies</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'student' | 'instructor')}>
              <TabsList className="bg-[#F4F4F1] border border-[#E5E5E0] h-auto p-1">
                <TabsTrigger
                  value="student"
                  className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider data-active:bg-[#1A1A1A] data-active:text-white"
                  id="tab-student-cheatsheet"
                >
                  Student
                </TabsTrigger>
                <TabsTrigger
                  value="instructor"
                  className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider data-active:bg-[#1A1A1A] data-active:text-white"
                  id="tab-instructor-guide"
                >
                  Instructor
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <button
              onClick={onClose}
              className="text-xs font-bold text-[#8C8C88] hover:text-[#1A1A1A] p-1.5"
              id="close-cheatsheet-btn"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="flex-1 overflow-y-auto bg-[#1A1A1A] text-gray-100 p-4 text-xs font-mono whitespace-pre-wrap leading-relaxed border border-gray-800 mx-0">
          {activeAsset.fileContent}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-2 border-t border-[#E5E5E0] px-6 py-4 shrink-0">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 h-auto border-[#E5E5E0] hover:border-[#A3B18A]"
            id="copy-cheatsheet-text-btn"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#A3B18A]" /> : <Copy className="w-3.5 h-3.5 text-[#8C8C88]" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </Button>
          <Button
            onClick={handleDownload}
            className="px-4 py-2 bg-[#1A1A1A] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1.5 h-auto"
            id="download-cheatsheet-file-btn"
          >
            <Download className="w-3.5 h-3.5 text-[#A3B18A]" />
            <span>Download</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
