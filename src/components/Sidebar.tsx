import React from "react";
import type { NavigationTab, Project } from "../types";

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  projects: Project[];
  selectedProject: Project;
  onSelectProject: (project: Project) => void;
  isPlaying: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  projects,
  selectedProject,
  onSelectProject,
  isPlaying,
}) => {
  const tabs: { name: NavigationTab; icon: string }[] = [
    { name: "Home", icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" },
    {
      name: "Projects",
      icon: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z",
    },
    {
      name: "Resume",
      icon: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
    },
    {
      name: "About",
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
    },
  ];

  return (
    <aside className="w-64 bg-[#121212] h-full flex flex-col justify-between p-2 gap-2 shrink-0 select-none">
      <div className="bg-[#121212] rounded-lg p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <nav className="flex flex-col gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-4 px-3 py-3 rounded-md font-semibold transition-colors duration-200 text-left ${
                  isActive
                    ? "text-white bg-[#1f1f1f]"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <svg
                  className="w-6 h-6 fill-current shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d={tab.icon} />
                </svg>
                <span className="text-sm">{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-[#121212] rounded-lg flex-1 flex flex-col overflow-hidden p-2">
        <div className="flex items-center justify-between px-3 py-2 text-neutral-400">
          <div className="flex items-center gap-2 font-bold text-sm">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0-2-.9-2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
            </svg>
            <span>Your Projects</span>
          </div>
        </div>

        <div className="mt-2 overflow-y-auto flex-1 flex flex-col gap-1 pr-1 custom-scrollbar">
          {projects.map((project) => {
            const isSelected = selectedProject.id === project.id;
            return (
              <div
                key={project.id}
                onClick={() => {
                  onSelectProject(project);
                  setActiveTab("Projects");
                }}
                className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                  isSelected ? "bg-[#2a2a2a]" : "hover:bg-[#1a1a1a]"
                }`}
              >
                <div className="relative w-12 h-12 rounded overflow-hidden shrink-0 bg-neutral-800">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && isPlaying && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="w-3 h-3 bg-[#1db954] rounded-full animate-ping" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-sm font-medium truncate ${isSelected ? "text-[#1db954]" : "text-white"}`}
                  >
                    {project.title}
                  </span>
                  <span className="text-xs text-neutral-400 truncate">
                    {project.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
