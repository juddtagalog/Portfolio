import React from "react";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  isPlaying: boolean;
  onSelect: () => void;
  onTogglePlay: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isSelected,
  isPlaying,
  onSelect,
  onTogglePlay,
}) => {
  return (
    <div
      onClick={onSelect}
      className="group p-4 bg-[#181818] hover:bg-[#282828] transition-all duration-300 rounded-lg cursor-pointer flex flex-col relative"
    >
      <div className="relative w-full aspect-square rounded-md overflow-hidden bg-neutral-800 mb-4 shadow-lg">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePlay();
          }}
          className={`absolute bottom-2 right-2 w-12 h-12 bg-[#1db954] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#1ed760] ${
            isSelected && isPlaying
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          {isSelected && isPlaying ? (
            <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 fill-black ml-1" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
      <h3
        className={`font-bold text-base truncate mb-1 ${isSelected ? "text-[#1db954]" : "text-white"}`}
      >
        {project.title}
      </h3>
      <p className="text-neutral-400 text-sm line-clamp-2">
        {project.description}
      </p>
    </div>
  );
};
