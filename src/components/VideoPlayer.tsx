import React from 'react';
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
  return (
    <div className="relative w-full max-h-[80vh] flex items-center justify-center bg-black rounded-lg overflow-hidden shadow-2xl border border-neutral-800">
      <video
        ref={videoRef}
        src={project.videoUrl}
        poster={project.thumbnail}
        className="w-auto h-auto max-w-full max-h-[80vh] object-contain"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        playsInline
      />

      {!isPlaying && (
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