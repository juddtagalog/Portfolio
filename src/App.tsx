import React, { useState, useRef } from 'react';
import type { NavigationTab, Project } from './types';
import { MOCK_PROJECTS, MOCK_OWNER } from './MockData';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { RightPanel } from './components/RightPanel';
import { Footer } from './components/Footer';
import { MobilePlayerModal } from './components/MobilePlayerModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('Home');
  const [selectedProject, setSelectedProject] = useState<Project>(MOCK_PROJECTS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(selectedProject.durationSeconds);
  const [volume, setVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // State for opening the Spotify magnified view on mobile
  const [isMobilePlayerOpen, setIsMobilePlayerOpen] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleSelectProject = (project: Project) => {
    if (selectedProject.id === project.id) {
      handleTogglePlay();
    } else {
      setSelectedProject(project);
      setCurrentTime(0);
      setDuration(project.durationSeconds);
      setIsPlaying(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
      }, 50);
    }
    // Automatically magnify the player when tapping a project card on mobile devices
    if (window.innerWidth < 768) {
      setIsMobilePlayerOpen(true);
    }
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleNextProject = () => {
    const currentIndex = MOCK_PROJECTS.findIndex((p: Project) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % MOCK_PROJECTS.length;
    handleSelectProject(MOCK_PROJECTS[nextIndex]);
  };

  const handlePrevProject = () => {
    const currentIndex = MOCK_PROJECTS.findIndex((p: Project) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + MOCK_PROJECTS.length) % MOCK_PROJECTS.length;
    handleSelectProject(MOCK_PROJECTS[prevIndex]);
  };

  const handleSeek = (seconds: number) => {
    setCurrentTime(seconds);
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
      if (videoRef.current) videoRef.current.muted = false;
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  const handleStartExploring = () => {
    setActiveTab('Projects');
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
      videoRef.current.volume = isMuted ? 0 : volume / 100;
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="h-screen w-screen bg-[#000000] text-white flex flex-col overflow-hidden font-sans">
      <div className="flex-1 flex overflow-hidden p-0 md:p-2 gap-2">
        {/* Hidden on mobile, visible on desktop */}
        <div className="hidden md:flex h-full">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            projects={MOCK_PROJECTS}
            selectedProject={selectedProject}
            onSelectProject={handleSelectProject}
            isPlaying={isPlaying}
          />
        </div>

        <MainContent
          activeTab={activeTab}
          owner={MOCK_OWNER}
          projects={MOCK_PROJECTS}
          selectedProject={selectedProject}
          isPlaying={isPlaying}
          onSelectProject={handleSelectProject}
          onTogglePlay={handleTogglePlay}
          onStartExploring={handleStartExploring}
        />

        {/* Hidden on mobile, visible on lg desktops */}
        <div className="hidden lg:flex h-full">
          <RightPanel
            project={selectedProject}
            isPlaying={isPlaying}
            videoRef={videoRef}
            onTogglePlay={handleTogglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleVideoEnded}
          />
        </div>
      </div>

      <Footer
        project={{ ...selectedProject, durationSeconds: duration }}
        isPlaying={isPlaying}
        currentTime={currentTime}
        volume={volume}
        isMuted={isMuted}
        activeTab={activeTab}
        onTogglePlay={handleTogglePlay}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onToggleMute={handleToggleMute}
        onOpenMobilePlayer={() => setIsMobilePlayerOpen(true)}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setIsMobilePlayerOpen(false);
        }}
      />

      {/* Magnified Project Demo View (Like Spotify Album View) */}
      <MobilePlayerModal
        project={selectedProject}
        isPlaying={isPlaying}
        isOpen={isMobilePlayerOpen}
        currentTime={currentTime}
        duration={duration}
        videoRef={videoRef}
        onClose={() => setIsMobilePlayerOpen(false)}
        onTogglePlay={handleTogglePlay}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
        onSeek={handleSeek}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnded}
      />
    </div>
  );
};

export default App;