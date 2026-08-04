import React, { useState, useEffect, useCallback } from 'react';
import type { Project } from '../types';

interface VideoPlayerProps {
  project: Project;
  isPlaying: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onTogglePlay: () => void;
  onTimeUpdate: () => void;
  onLoadedMetadata: () => void;
  onEnded: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  project,
  isPlaying,
  videoRef,
  onTogglePlay,
  onTimeUpdate,
  onLoadedMetadata,
  onEnded
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!!document.fullscreenElement);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [handleFullscreenChange]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full flex items-center justify-center bg-black rounded-lg overflow-hidden shadow-2xl border border-neutral-800 ${
        isFullscreen ? 'max-h-none h-screen' : 'max-h-[80vh]'
      }`}
    >
      <video
        ref={videoRef}
        src={project.videoUrl}
        poster={project.thumbnail}
        className={`object-contain ${
          isFullscreen 
            ? 'w-screen h-screen' 
            : 'w-auto h-auto max-w-full max-h-[80vh]'
        }`}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        playsInline
      />
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
        title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      >
        {isFullscreen ? (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        )}
      </button>

      {!isPlaying && !isFullscreen && (
        <div className="absolute inset-0 z-10 group cursor-pointer bg-black/40" onClick={onTogglePlay}>
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-500 absolute inset-0 -z-10"
          />
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 transition-opacity">
            <button className="w-20 h-20 bg-[#1db954] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-[#1ed760] transition-all">
              <svg className="w-10 h-10 fill-black ml-1" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <span className="text-white font-medium text-lg tracking-wide drop-shadow-md">
              Click to Play Demo
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;