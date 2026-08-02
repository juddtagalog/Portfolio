import React from 'react';
import type { OwnerProfile, Project } from '../types';

interface LandingPageProps {
  owner: OwnerProfile;
  featuredProjects: Project[];
  onStartExploring: () => void;
  onSelectProject: (project: Project) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  owner,
  featuredProjects,
  onStartExploring,
  onSelectProject
}) => {
  return (
    <div className="flex flex-col gap-6 md:gap-8 -m-4 md:-m-6 pb-20 md:pb-8">
      {/* Responsive Banner & Profile Header */}
      <div className="relative h-64 md:h-80 w-full bg-neutral-900 overflow-hidden flex items-end p-4 md:p-8">
        <img
          src={owner.banner}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6 w-full">
          <img
            src={owner.avatar}
            alt={owner.name}
            className="w-24 h-24 md:w-40 md:h-40 rounded-full object-cover shadow-2xl border-4 border-neutral-900 shrink-0"
          />
          <div className="flex flex-col gap-1 md:gap-2">
            <div className="flex items-center gap-2">
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight">{owner.name}</h1>
            <p className="text-sm md:text-xl text-neutral-300 font-medium">{owner.role}</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-4 md:px-8 flex flex-col gap-6 md:gap-8">
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={onStartExploring}
            className="w-12 h-12 md:w-14 md:h-14 bg-[#1db954] hover:bg-[#1ed760] text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all shrink-0"
            aria-label="Explore all projects"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7 fill-current ml-1" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <span className="text-white font-bold text-sm md:text-base tracking-wide">Explore All Projects</span>
        </div>

        {/* 2-Column on Mobile, 4-Column on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {owner.stats.map((stat, idx) => (
            <div key={idx} className="bg-[#181818] p-4 md:p-5 rounded-lg border border-neutral-800 flex flex-col gap-1">
              <span className="text-2xl md:text-3xl font-black text-[#1db954]">{stat.value}</span>
              <span className="text-[10px] md:text-xs font-semibold text-neutral-400 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 md:gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-white">About Me</h2>
          <p className="text-neutral-300 leading-relaxed max-w-4xl text-sm md:text-base">{owner.bio}</p>
        </div>

        <div className="flex flex-col gap-2 md:gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-white">Technical Arsenal</h2>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {owner.skills.map((skill) => (
              <span
                key={skill}
                className="bg-[#242424] hover:bg-[#2a2a2a] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-neutral-700/60 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Responsive Grid for Featured Work */}
        <div className="flex flex-col gap-3 md:gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-white">Featured Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {featuredProjects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="bg-[#181818] p-3 md:p-4 rounded-lg hover:bg-[#242424] transition-all cursor-pointer group flex flex-col gap-3 border border-neutral-800/50 md:border-none"
              >
                <div className="w-full aspect-video rounded overflow-hidden bg-neutral-800 relative">
                  <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-white text-sm md:text-base group-hover:text-[#1db954] transition-colors">{project.title}</h3>
                  <span className="text-xs text-neutral-400 mt-0.5">{project.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};