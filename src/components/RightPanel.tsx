import React from 'react';
import type { Project } from '../types';
import { VideoPlayer } from './VideoPlayer';

interface RightPanelProps {
  project: Project;
  isPlaying: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  onTogglePlay: () => void;
  onTimeUpdate: () => void;
  onLoadedMetadata: () => void;
  onEnded: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  project,
  isPlaying,
  videoRef,
  onTogglePlay,
  onTimeUpdate,
  onLoadedMetadata,
  onEnded
}) => {
  return (
    <aside className="w-96 bg-[#121212] rounded-lg p-6 flex flex-col gap-6 overflow-y-auto shrink-0 border border-neutral-800/60 custom-scrollbar">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1db954]">
          Now Showing Demo
        </span>
        <h2 className="text-2xl font-black text-white leading-tight">
          {project.title}
        </h2>
        <span className="text-sm text-neutral-400 font-medium">
          {project.category}
        </span>
      </div>

      <VideoPlayer
        project={project}
        isPlaying={isPlaying}
        videoRef={videoRef}
        onTogglePlay={onTogglePlay}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      />

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
          Technologies Used
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-[#1f1f1f] text-neutral-200 text-xs font-semibold px-3 py-1.5 rounded-full border border-neutral-700/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
          Project Overview
        </h3>
        <p className="text-neutral-300 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>
    </aside>
  );
};