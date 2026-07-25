import React from 'react';
import type { Project } from '../types';
import { VideoPlayer } from './VideoPlayer';

interface MobilePlayerModalProps {
  project: Project;
  isPlaying: boolean;
  isOpen: boolean;
  currentTime: number;
  duration: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onClose: () => void;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (seconds: number) => void;
  onTimeUpdate: () => void;
  onLoadedMetadata: () => void;
  onEnded: () => void;
}

export const MobilePlayerModal: React.FC<MobilePlayerModalProps> = ({
  project,
  isPlaying,
  isOpen,
  currentTime,
  duration,
  videoRef,
  onClose,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  onTimeUpdate,
  onLoadedMetadata,
  onEnded
}) => {
  if (!isOpen) return null;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#501820] via-[#280c10] to-[#121212] flex flex-col justify-between p-6 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center justify-between pt-2">
        <button 
          onClick={onClose}
          className="text-white/80 hover:text-white p-2 -ml-2 active:scale-95"
          aria-label="Minimize player"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
          </svg>
        </button>
        <span className="text-xs font-bold uppercase tracking-widest text-white/80 truncate max-w-[200px]">
          {project.category}
        </span>
        <div className="w-6" />
      </div>

      <div className="my-auto py-4 flex flex-col gap-6">
        <div className="w-full shadow-2xl rounded-lg overflow-hidden border border-white/10">
          <VideoPlayer
            project={project}
            isPlaying={isPlaying}
            videoRef={videoRef}
            onTogglePlay={onTogglePlay}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onEnded={onEnded}
          />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-black text-white leading-tight">
            {project.title}
          </h2>
          <p className="text-sm text-neutral-300 line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-white/10 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 pb-6">
        <div className="flex flex-col gap-2">
          <div className="relative w-full flex items-center h-4 group cursor-pointer">
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-white transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-xs font-mono text-neutral-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-4">
          <button 
            onClick={onPrev}
            className="text-white/80 hover:text-white active:scale-95 transition-transform"
            aria-label="Previous project"
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          <button
            onClick={onTogglePlay}
            className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-transform"
            aria-label={isPlaying ? "Pause demo" : "Play demo"}
          >
            {isPlaying ? (
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button 
            onClick={onNext}
            className="text-white/80 hover:text-white active:scale-95 transition-transform"
            aria-label="Next project"
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};