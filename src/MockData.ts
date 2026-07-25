import type { Project, OwnerProfile } from './types';

export const MOCK_OWNER: OwnerProfile = {
  name: 'Judd Tagalog',
  role: 'Software Engineering Student & Full-Stack Developer',
  avatar: import.meta.env.BASE_URL + 'assets/headshot.jpg',
  banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80',
  bio: 'Innovative Software Engineering student at iAcademy Cebu and a consistent Dean’s Lister with a strong foundation in full-stack development and game design. Proven experience in delivering functional software solutions, ranging from web development to award winning mobile applications.',
  stats: [
  ],
  skills: [
    'Java', 'C++', 'Dart', 'TypeScript', 'GDScript', 'Python', 'PHP', 'C#',
    'Flutter', 'React', 'Next.js', 'Spring Boot', 'Laravel', 'Tailwind CSS',
    'Supabase', 'PostgreSQL', 'Docker', 'Godot', 'Firebase', 'n8n'
  ],
  experience: [
    {
      role: 'Software Engineer',
      company: 'iDiscount Mobile Philippines, now UniDeals',
      period: '05/2025 – Present',
      technologies: ['Flutter', 'Supabase'],
      bullets: [
        'Responsible for the validation and testing of user registration and OTP (One-Time Password) services.'
      ]
    },
    {
      role: 'Contractual Developer',
      company: 'Proudbisayabai',
      period: '09/2025 – 12/2025',
      technologies: ['TypeScript', 'React', 'Next.js', 'Supabase'],
      bullets: [
        'Reworked the article content creation to implement a drag and drop creation style.',
        'Responsible for database design using Supabase.'
      ]
    }
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science major in Software Engineering',
      school: 'iAcademy Cebu',
      period: '2023 – 2027 (Ongoing - 3rd Year)',
      details: "Consistent Dean's Lister"
    }
  ],
  extracurriculars: [
    { event: 'UP GameJam 2026 (Peek a boo)', role: 'Participant', date: '01/2026' },
    { event: 'Visayas Startup Awards 2025', role: 'Finalist via iDiscount', date: '08/2025' },
    { event: 'AI4Devs', role: 'Workshop and Hackathon', date: '06/2025 – 07/2025' },
    { event: 'Global GameJam 2025 (Bubble Dash)', role: 'Participant', date: '01/2025' },
    { event: 'Geeks On A Beach 2024', role: 'Registration Staff', date: '11/2024' },
    { event: 'Idea Programming Club', role: 'Secretary', date: '08/2024 – 08/2025' }
  ]
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Peek a boo',
    category: 'Game Development',
    thumbnail: import.meta.env.BASE_URL + 'assets/peek_a_boo.png',
    videoUrl: import.meta.env.BASE_URL + 'assets/videos/lucky-defense-bot-demo .mp4',
    description: 'PS2 graphic inspired maze horror survival game. Created monster entities and monster behavior logic alongside a custom monster manager and spawner to allocate threats throughout the maze.',
    techStack: ['GDScript', 'Godot'],
    duration: '0:15',
    durationSeconds: 15
  },
  {
    id: '2',
    title: 'Proud Bisaya Bai website rework',
    category: 'Full-Stack Platform',
    thumbnail: import.meta.env.BASE_URL + 'assets/pbb-screenshot.png',
    videoUrl: import.meta.env.BASE_URL + 'assets/videos/lucky-defense-bot-demo .mp4',
    description: 'A rework of the then Proud Bisaya Bai website. Was part of a team of contractual developers and was responsible for reworking their article creation, to a drag and drop system.',
    techStack: ['Next.js', 'TypeScript', 'React', 'Supabase'],
    duration: '0:45',
    durationSeconds: 45
  },
  {
    id: '3',
    title: 'Lucky Defense Bot V2',
    category: 'Automation & Algorithms',
    thumbnail: import.meta.env.BASE_URL + 'assets/lucky-defense-bot-screenshot.png',
    videoUrl: import.meta.env.BASE_URL + 'assets/videos/lucky-defense-bot-demo .mp4',
    description: 'An automation project designed to farm resources in the Lucky Defense game. Contributed to core unit processing algorithms and automated loop sequences in earlier versions.',
    techStack: ['Java', 'ADB', 'Mumu Emulator'],
    duration: '0:15',
    durationSeconds: 15
  },
  {
    id: '4',
    title: 'Linya',
    category: 'Web Development',
    thumbnail: import.meta.env.BASE_URL + 'assets/linya-landing-page.jpeg',
    videoUrl: import.meta.env.BASE_URL + 'assets/videos/linya.mp4',
    description: 'School publication website featuring a dynamic homepage with article fetching algorithms sorted by most visited, latest news, and categorized campus updates.',
    techStack: ['PHP', 'Laravel', 'PostgreSQL', 'Docker'],
    duration: '0:15',
    durationSeconds: 15
  },
  {
    id: '5',
    title: 'Project Gaia',
    category: 'IoT & Machine Learning',
    thumbnail: import.meta.env.BASE_URL + 'assets/project_gaia_home_page.png',
    videoUrl: import.meta.env.BASE_URL + 'assets/videos/project_gaia-no-audio.mp4',
    description: 'IoT companion app connecting ESP32 sensors to monitor a plant’s real-time environment. Implemented custom splash screens and plant classification using image recognition via Gemini API.',
    techStack: ['Flutter', 'Firebase', 'ESP32', 'Gemini API'],
    duration: '0:60',
    durationSeconds: 60
  },
  {
    id: '6',
    title: 'Sugbo Intern',
    category: 'Mobile Internship Search Platform',
    thumbnail: import.meta.env.BASE_URL + 'assets/sugbo intern login page.png',
    videoUrl: import.meta.env.BASE_URL + 'assets/videos/sugbo-intern.mp4',
    description: 'Internship search platform built for Cebu-based students. Implemented internship postings for companies, resume submission workflows, and application tracking modules.',
    techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Flutter'],
    duration: '0:45',
    durationSeconds: 45,
  }
];