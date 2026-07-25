import React from 'react';
import type { NavigationTab, Project, OwnerProfile } from '../types';
import { ProjectCard } from './ProjectCard';
import { LandingPage } from './LandingPage';

interface MainContentProps {
  activeTab: NavigationTab;
  owner: OwnerProfile;
  projects: Project[];
  selectedProject: Project;
  isPlaying: boolean;
  onSelectProject: (project: Project) => void;
  onTogglePlay: () => void;
  onStartExploring: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  activeTab,
  owner,
  projects,
  selectedProject,
  isPlaying,
  onSelectProject,
  onTogglePlay,
  onStartExploring
}) => {
  return (
    <main className="flex-1 bg-[#121212] rounded-lg overflow-y-auto p-6 flex flex-col gap-8 custom-scrollbar">
      {activeTab === 'Home' && (
        <LandingPage
          owner={owner}
          featuredProjects={projects}
          onStartExploring={onStartExploring}
          onSelectProject={onSelectProject}
        />
      )}

      {activeTab === 'Projects' && (
        <>
          <div className="flex items-end justify-between bg-gradient-to-b from-[#1e3a29] to-[#121212] -mx-6 -mt-6 p-8 rounded-t-lg">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                Portfolio Showcase
              </span>
              <h1 className="text-5xl font-extrabold text-white tracking-tight">
                Featured Projects
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white">All Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isSelected={selectedProject.id === project.id}
                  isPlaying={isPlaying && selectedProject.id === project.id}
                  onSelect={() => onSelectProject(project)}
                  onTogglePlay={() => {
                    if (selectedProject.id !== project.id) {
                      onSelectProject(project);
                    }
                    onTogglePlay();
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'Resume' && (
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 text-white py-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
            <div>
              <h1 className="text-4xl font-bold">{owner.name}</h1>
              <p className="text-neutral-400 mt-1">{owner.role}</p>
            </div>
            <a
              href="/Portfolio/assets/JUDD_NALLOS_TAGALOG_Resume.pdf"
              download
              className="bg-[#1db954] hover:bg-[#1ed760] text-black font-bold px-6 py-3 rounded-full transition-all hover:scale-105"
            >
              Download PDF
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-[#1db954]">Experience</h2>
            <div className="flex flex-col gap-4">
              {owner.experience.map((exp, idx) => (
                <div key={idx} className="bg-[#181818] p-6 rounded-lg border border-neutral-800 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-md text-neutral-300 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm font-mono text-neutral-400 bg-neutral-900 px-3 py-1 rounded">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-neutral-300 text-sm flex flex-col gap-1">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="bg-neutral-800 text-neutral-300 text-xs px-2.5 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-[#1db954]">Education</h2>
            {owner.education.map((edu, idx) => (
              <div key={idx} className="bg-[#181818] p-6 rounded-lg border border-neutral-800 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                  <p className="text-md text-neutral-300">{edu.school}</p>
                  <p className="text-sm text-[#1db954] font-semibold mt-1">{edu.details}</p>
                </div>
                <span className="text-sm font-mono text-neutral-400 bg-neutral-900 px-3 py-1 rounded">{edu.period}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'About' && (
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 text-white py-4">
          <h1 className="text-4xl font-bold border-b border-neutral-800 pb-4">About Me</h1>
          <div className="text-neutral-300 flex flex-col gap-4 text-lg leading-relaxed">
            <p>{owner.bio}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white">Extracurriculars & Hackathons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {owner.extracurriculars.map((item, idx) => (
                <div key={idx} className="bg-[#181818] p-4 rounded-lg border border-neutral-800 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white">{item.event}</h4>
                    <span className="text-sm text-neutral-400">{item.role}</span>
                  </div>
                  <span className="text-xs font-mono text-[#1db954] bg-neutral-900 px-2 py-1 rounded">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};