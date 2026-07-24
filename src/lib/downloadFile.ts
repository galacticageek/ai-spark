import { DownloadableAsset } from '../types';

/**
 * Shared helper to trigger a browser file download from an in-memory asset.
 * Extracted from App.tsx, CheatSheetModal.tsx, and ResourceDownloadHub.tsx
 * to eliminate the copy-pasted Blob → URL.createObjectURL → <a> click sequence.
 */
export function downloadFile(asset: Pick<DownloadableAsset, 'fileContent' | 'mimeType' | 'filename'>) {
  const blob = new Blob([asset.fileContent], { type: asset.mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = asset.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
