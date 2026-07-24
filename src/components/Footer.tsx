import React from "react";
import type { Project } from "../types";

interface FooterProps {
  project: Project;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (seconds: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  project,
  isPlaying,
  currentTime,
  volume,
  isMuted,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
  onToggleMute,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const currentVolume = isMuted ? 0 : volume;
  const progressPercent = (currentTime / project.durationSeconds) * 100;

  return (
    <footer className="h-20 bg-[#000000] border-t border-neutral-800/80 px-4 flex items-center justify-between shrink-0 select-none z-50">
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
        <button
          onClick={onToggleMute}
          className="hover:text-white transition-colors"
        >
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
  );
};
