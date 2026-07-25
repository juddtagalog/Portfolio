import React from 'react';
import type { NavigationTab, Project } from '../types';

interface FooterProps {
  project: Project;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  activeTab: NavigationTab;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (seconds: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onOpenMobilePlayer: () => void;
  onSelectTab: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({
  project,
  isPlaying,
  currentTime,
  volume,
  isMuted,
  activeTab,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onOpenMobilePlayer,
  onSelectTab
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentVolume = isMuted ? 0 : volume;
  const progressPercent = project.durationSeconds > 0 ? (currentTime / project.durationSeconds) * 100 : 0;

  const navTabs: { name: NavigationTab; icon: string }[] = [
    { name: 'Home', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
    { name: 'Projects', icon: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z' },
    { name: 'Resume', icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' },
    { name: 'About', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' },
  ];

  return (
    <>
      {/* ========================================================= */}
      {/* MOBILE ONLY: Floating Mini-Player & Bottom Nav Bar        */}
      {/* ========================================================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex flex-col bg-gradient-to-t from-black via-black to-black/95 border-t border-neutral-800/80 select-none">
        {/* Spotify-style Floating Mini Player Bar */}
        <div 
          onClick={onOpenMobilePlayer}
          className="mx-2 -mt-14 bg-[#3b1318] hover:bg-[#48171d] transition-colors rounded-md p-2 flex items-center justify-between shadow-2xl border border-white/10 cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-10 h-10 rounded object-cover shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-bold truncate">
                {project.title}
              </span>
              <span className="text-neutral-300 text-[10px] truncate">
                {project.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 px-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={onTogglePlay}
              className="text-white p-1 active:scale-95"
              aria-label={isPlaying ? "Pause demo" : "Play demo"}
            >
              {isPlaying ? (
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Bottom border progress bar indicator */}
          <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-white/10 overflow-hidden rounded-b-md">
            <div 
              className="h-full bg-white transition-all" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
        </div>

        {/* Bottom Navigation Tabs */}
        <nav className="flex items-center justify-around py-2 px-1">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => onSelectTab(tab.name)}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d={tab.icon} />
                </svg>
                <span className="text-[10px] font-medium tracking-tight">{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP ONLY: Classic Bottom Player Bar                   */}
      {/* ========================================================= */}
      <footer className="hidden md:flex h-20 bg-[#000000] border-t border-neutral-800/80 px-4 items-center justify-between shrink-0 select-none z-50">
        <div className="flex items-center gap-4 w-1/4 min-w-[180px]">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-14 h-14 rounded object-cover border border-neutral-800"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-white text-sm font-semibold truncate hover:underline cursor-pointer">
              {project.title}
            </span>
            <span className="text-neutral-400 text-xs truncate">
              {project.category}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center max-w-2xl w-2/4 gap-2">
          <div className="flex items-center gap-6">
            <button
              onClick={onPrev}
              className="text-neutral-400 hover:text-white transition-colors active:scale-95"
              title="Previous Project"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>
            
            <button
              onClick={onTogglePlay}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform active:scale-95 shadow-md"
            >
              {isPlaying ? (
                <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 fill-black ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              onClick={onNext}
              className="text-neutral-400 hover:text-white transition-colors active:scale-95"
              title="Next Project"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          <div className="w-full flex items-center gap-3 text-xs text-neutral-400 font-mono">
            <span className="w-8 text-right">{formatTime(currentTime)}</span>
            
            <div className="relative flex-1 flex items-center h-4 group cursor-pointer">
              <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-white group-hover:bg-[#1db954] transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max={project.durationSeconds}
                value={currentTime}
                onChange={(e) => onSeek(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            <span className="w-8">{project.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 w-1/4 text-neutral-400">
          <button onClick={onToggleMute} className="hover:text-white transition-colors">
            {currentVolume === 0 ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : currentVolume < 50 ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>

          <div className="relative w-24 flex items-center h-4 group cursor-pointer">
            <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-white group-hover:bg-[#1db954] transition-all"
                style={{ width: `${currentVolume}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={currentVolume}
              onChange={(e) => {
                if (isMuted && Number(e.target.value) > 0) onToggleMute();
                onVolumeChange(Number(e.target.value));
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </footer>
    </>
  );
};