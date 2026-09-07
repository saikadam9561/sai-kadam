import { Project, Skill, EducationItem, JourneyStep, Achievement, GitRepo } from '../types';

export const personalInfo = {
  name: 'Sainath Kadam',
  title: 'B.Tech CSE Student',
  roles: [
    'B.Tech CSE Student',
    'Programmer',
    'Web Developer',
    'Future Software Engineer'
  ],
  heroTagline: 'Building the Future with Code.',
  bioShort:
    "I'm a Computer Science Engineering student passionate about programming, web development, problem solving, and building practical technology projects.",
  aboutWhoAmI:
    "I'm currently pursuing B.Tech in Computer Science Engineering. I enjoy learning new technologies, solving programming problems, and converting ideas into useful applications.",
  email: 'saikadam9561@gmail.com',
  github: 'https://github.com/sainath-kadam',
  linkedin: 'https://linkedin.com/in/sainath-kadam',
  instagram: 'https://instagram.com/sainath_kadam',
  location: 'Maharashtra, India',
  availability: 'Open for Internships & Projects',
  stats: [
    { label: 'B.Tech CSE Student', value: '3rd Year', sub: 'Engineering Candidate', icon: 'GraduationCap' },
    { label: 'Programming Learner', value: '500+', sub: 'Problems Solved', icon: 'Terminal' },
    { label: 'Web Developer', value: '10+', sub: 'Modern Web Apps', icon: 'Code2' },
    { label: 'Project Builder', value: '100%', sub: 'Practical Solutions', icon: 'Rocket' },
  ]
};

export const skillsData: Skill[] = [
  {
    id: 'c',
    name: 'C',
    category: 'Languages',
    icon: 'Terminal',
    color: '#00599C',
    level: 'Advanced Basics',
    description: 'System-level programming, pointers, low-level memory allocation & computational fundamentals.',
    projectsCount: 4,
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Languages',
    icon: 'Cpu',
    color: '#00599C',
    level: 'Proficient',
    description: 'Object-oriented programming, STL vectors/maps, complexity optimization & DSA problem solving.',
    projectsCount: 6,
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Languages',
    icon: 'Coffee',
    color: '#EA2D2E',
    level: 'Intermediate',
    description: 'Robust OOP architecture, JVM lifecycle, Collections Framework, exception handling & multithreading.',
    projectsCount: 5,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Languages',
    icon: 'FileCode2',
    color: '#3776AB',
    level: 'Proficient',
    description: 'Automation scripts, algorithm rapid prototyping, file manipulation, and data processing.',
    projectsCount: 7,
  },
  {
    id: 'html',
    name: 'HTML5',
    category: 'Web Tech',
    icon: 'Layout',
    color: '#E34F26',
    level: 'Advanced',
    description: 'Semantic document structuring, modern Web APIs, accessibility standards, and SEO compliance.',
    projectsCount: 12,
  },
  {
    id: 'css',
    name: 'CSS3',
    category: 'Web Tech',
    icon: 'Palette',
    color: '#1572B6',
    level: 'Advanced',
    description: 'Flexbox, CSS Grid, responsive design, 3D transforms, fluid layouts & Tailwind utility patterns.',
    projectsCount: 12,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Web Tech',
    icon: 'Braces',
    color: '#F7DF1E',
    level: 'Proficient',
    description: 'ES6+ modern syntax, asynchronous Promises/async-await, DOM events & modular client architecture.',
    projectsCount: 10,
  },
  {
    id: 'react',
    name: 'React',
    category: 'Web Tech',
    icon: 'Atom',
    color: '#61DAFB',
    level: 'Proficient',
    description: 'Component lifecycles, custom hooks, state synchronization, virtual DOM & single-page workflows.',
    projectsCount: 8,
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Tools & Core CS',
    icon: 'GitBranch',
    color: '#F05032',
    level: 'Proficient',
    description: 'Distributed version control, branch management, cherry-picking, interactive rebasing & conflict resolution.',
    projectsCount: 14,
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Tools & Core CS',
    icon: 'Github',
    color: '#F0F6FC',
    level: 'Proficient',
    description: 'CI/CD workflows, open source collaboration, pull requests, issue tracking & code review.',
    projectsCount: 14,
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Tools & Core CS',
    icon: 'Database',
    color: '#336791',
    level: 'Intermediate',
    description: 'Relational database schema design, complex JOIN queries, indexing, normalization & ACID transactions.',
    projectsCount: 5,
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Tools & Core CS',
    icon: 'Binary',
    color: '#007ACC',
    level: 'Expert Daily Driver',
    description: 'Extension ecosystem, debugging configurations, multi-cursor workflows & integrated terminals.',
    projectsCount: 15,
  },
];

export const projectsData: Project[] = [
  {
    id: 'smart-farmer',
    title: 'Smart Farmer Procurement System',
    tagline: 'Digital token & queue management platform empowering agricultural produce delivery',
    problemSolved: 'Eliminates 12+ hour mandi queues, transport bottlenecks, and intermediary pricing exploitation for rural farmers.',
    description:
      'A comprehensive digital platform designed to modernize crop procurement centers. Farmers book time slots digitally, receive instant SMS tokens, view live queue statuses, and track official minimum support price (MSP) payouts with full offline resilience.',
    features: [
      'Digital token booking with localized SMS confirmations',
      'Real-time live queue tracking and estimated wait times',
      'Procurement center load balancing & scheduled arrival slots',
      'Offline-first PWA caching for remote rural network conditions',
      'Transparent payment & produce grading status ledger'
    ],
    technologies: ['React', 'Node.js', 'Tailwind CSS', 'IndexedDB', 'REST API', 'WebSockets'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/sainath-kadam/smart-farmer-procurement',
    liveDemoUrl: 'https://smart-farmer-demo.vercel.app',
    previewType: 'interactive',
    accentColor: '#10b981',
    metrics: 'Reduces wait times by up to 70%'
  },
  {
    id: 'weather-app',
    title: 'Weather Application',
    tagline: 'Precision meteorological forecasting with interactive micro-climate tracking',
    problemSolved: 'Provides clean, instantaneous weather predictions and air-quality insights without ad clutter or slow data overhead.',
    description:
      'A high-performance weather intelligence application integrating multiple meteorological API endpoints. Provides real-time atmospheric metrics, UV index, hourly forecasts, interactive humidity and wind radars, with automatic geolocation detection.',
    features: [
      'Live weather telemetry via OpenWeatherMap API integration',
      'Dynamic day/night atmospheric particle UI transitions',
      'Detailed 5-day predictive forecasting and precipitation trends',
      'Air Quality Index (AQI) radar breakdown and outdoor safety advice',
      'Responsive design with localized search across global cities'
    ],
    technologies: ['React', 'JavaScript (ES6+)', 'OpenWeather API', 'Tailwind CSS', 'Lucide Icons'],
    category: 'Frontend',
    githubUrl: 'https://github.com/sainath-kadam/weather-intelligence-app',
    liveDemoUrl: 'https://weather-sainath.vercel.app',
    previewType: 'interactive',
    accentColor: '#38bdf8',
    metrics: '< 100ms API response parsing'
  },
  {
    id: 'student-portfolio',
    title: '3D Interactive Student Portfolio',
    tagline: 'Futuristic Apple-minimal personal portfolio engineered with Three.js',
    problemSolved: 'Replaces flat, forgettable resume PDFs with an interactive, recruiter-friendly 3D engineering portfolio.',
    description:
      'The exact interactive website you are viewing! Features an interactive 3D developer workspace, floating programming symbols, 3D microchip and technology spheres, reactive cursor tilt physics, and responsive glassmorphism UI.',
    features: [
      'Interactive Three.js 3D developer workspace & laptop scene',
      '3D rotating silicon microchip & interactive technology constellation',
      'Full semantic responsiveness across mobile, tablet, and ultra-wide screens',
      'Accessible navigation with section tracking and keyboard support',
      'Lightweight performance optimizations with high FPS rendering'
    ],
    technologies: ['React', 'Three.js', 'Tailwind CSS', 'Motion', 'HTML5', 'TypeScript'],
    category: 'Frontend',
    githubUrl: 'https://github.com/sainath-kadam/3d-student-portfolio',
    liveDemoUrl: 'https://sainath-kadam.dev',
    previewType: 'interactive',
    accentColor: '#818cf8',
    metrics: '60 FPS WebGL rendering'
  },
  {
    id: 'algo-visualizer',
    title: 'Algorithm & Pathfinding Visualizer',
    tagline: 'Interactive 2D/3D computational graph explorer for Dijkstra & A* search',
    problemSolved: 'Transforms abstract Computer Science graph theory and data structures into intuitive, visual step-by-step animations.',
    description:
      'An educational simulation platform allowing computer science students to visualize Dijkstra, A* search, Breadth-First Search (BFS), and Depth-First Search (DFS) in real time with custom wall obstacles and weight cost adjustments.',
    features: [
      'Real-time visualization of Dijkstra, A*, BFS, and DFS pathfinding',
      'Interactive maze generation using recursive division and Prim’s algorithm',
      'Variable speed execution slider and step-by-step debugger mode',
      'Node visit counter and path cost mathematical summary'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Graph Data Structures'],
    category: 'Algorithms / Core CS',
    githubUrl: 'https://github.com/sainath-kadam/algo-pathfinding-visualizer',
    liveDemoUrl: 'https://algo-visualizer-sainath.vercel.app',
    previewType: 'interactive',
    accentColor: '#a855f7',
    metrics: 'Visualizes 2,500+ graph nodes'
  }
];

export const educationData: EducationItem = {
  degree: 'Bachelor of Technology (B.Tech)',
  field: 'Computer Science and Engineering',
  institution: 'Engineering College & University',
  period: '2023 – 2027 (Currently Pursuing)',
  grade: 'CGPA: 8.8+ / 10.0',
  currentStatus: 'Pre-final Year Undergraduate',
  description:
    'Pursuing rigorous foundational training in theoretical and applied Computer Science. Focuses on systems programming, algorithmic efficiency, modern software architecture, and practical engineering solutions.',
  coreSubjects: [
    'Data Structures & Algorithms (DSA)',
    'Object-Oriented Programming (OOP in C++ & Java)',
    'Database Management Systems (DBMS & SQL)',
    'Operating Systems & Kernel Concepts',
    'Computer Networks (TCP/IP & Web Protocols)',
    'Software Engineering & System Design',
    'Theory of Computation & Discrete Mathematics'
  ],
  keyHighlights: [
    'Consistent academic excellence with a strong focus on algorithmic problem solving',
    'Lead contributor to student technical symposiums and coding hackathons',
    'Active member of the University Coding Club & Technical Society',
    'Built multiple practical applications solving community & college challenges'
  ]
};

export const journeyData: JourneyStep[] = [
  {
    step: 1,
    title: 'Programming Fundamentals',
    period: 'Semester 1',
    technologies: ['Flowcharts', 'Pseudocode', 'Computational Logic', 'Binary Math'],
    description: 'Started the journey by understanding how computers process instructions, building algorithmic thinking, truth tables, and fundamental logic gates.',
    keyMilestones: ['Constructed basic sorting and searching logic', 'Developed mathematical problem-solving skills'],
    status: 'completed'
  },
  {
    step: 2,
    title: 'C / C++',
    period: 'Semester 2',
    technologies: ['C', 'C++', 'Pointers', 'Memory Management', 'STL'],
    description: 'Mastered low-level memory allocation, pointers, memory addressing, and modern object-oriented paradigms with C++ Standard Template Library (STL).',
    keyMilestones: ['Implemented linked lists, stacks, and binary trees from scratch', 'Solved 150+ computational problems'],
    status: 'completed'
  },
  {
    step: 3,
    title: 'Python',
    period: 'Semester 3',
    technologies: ['Python 3', 'File I/O', 'Data Structures', 'Automation'],
    description: 'Embraced rapid application scripting, data manipulation, file handling, and modular development using Python’s clean syntax.',
    keyMilestones: ['Automated daily student workflows and data extraction', 'Explored algorithm prototyping'],
    status: 'completed'
  },
  {
    step: 4,
    title: 'Java',
    period: 'Semester 3 – 4',
    technologies: ['Java', 'JVM Architecture', 'Collections Framework', 'Multithreading'],
    description: 'Deepened knowledge of enterprise-grade Object-Oriented software engineering, abstract classes, interfaces, and multithreaded concurrency.',
    keyMilestones: ['Built desktop CRUD applications with JDBC database connectivity', 'Mastered robust exception handling'],
    status: 'completed'
  },
  {
    step: 5,
    title: 'Web Development',
    period: 'Semester 4',
    technologies: ['HTML5', 'CSS3', 'Modern JavaScript (ES6+)', 'DOM API'],
    description: 'Entered modern web engineering, mastering responsive mobile-first layouts, asynchronous programming, fetch APIs, and semantic web principles.',
    keyMilestones: ['Built responsive websites from scratch without heavy frameworks', 'Created interactive DOM utilities'],
    status: 'completed'
  },
  {
    step: 6,
    title: 'React & Modern Development',
    period: 'Semester 5',
    technologies: ['React', 'Tailwind CSS', 'Vite', 'TypeScript', 'State Management'],
    description: 'Adopted component-driven declarative UIs, reactive hook state cycles, virtual DOM optimization, and modern production tooling.',
    keyMilestones: ['Engineered scalable single-page applications', 'Integrated complex REST APIs and modular architectures'],
    status: 'completed'
  },
  {
    step: 7,
    title: 'Real-World Projects & Systems',
    period: 'Current & Future',
    technologies: ['Full-Stack Architectures', 'Three.js 3D', 'Cloud Deployment', 'System Design'],
    description: 'Designing end-to-end practical software like the Smart Farmer Procurement System and advanced 3D interactive web experiences.',
    keyMilestones: ['Building software that addresses genuine community bottlenecks', 'Preparing for high-impact software engineering roles'],
    status: 'in-progress'
  }
];

export const achievementsData: Achievement[] = [
  {
    id: 'programming-projects',
    icon: 'Trophy',
    title: 'Programming Projects',
    subtitle: '10+ Practical Solutions',
    metric: '10+ Apps Built',
    description: 'Engineered full-stack and frontend applications addressing real-world agricultural, weather, and educational challenges.',
    badge: '🏆 Engineering Excellence'
  },
  {
    id: 'coding-practice',
    icon: 'Terminal',
    title: 'Coding Practice',
    subtitle: 'Algorithmic DSA Mastery',
    metric: '500+ Problems',
    description: 'Solved hundreds of algorithmic challenges across platforms in C++, Java, and Python covering arrays, trees, dynamic programming, and graphs.',
    badge: '💻 Problem Solver'
  },
  {
    id: 'web-dev',
    icon: 'Globe',
    title: 'Web Development',
    subtitle: 'Modern UI & 3D Interactivity',
    metric: '60 FPS 3D Web',
    description: 'Mastered modern React, Three.js 3D graphics, responsive Tailwind CSS layouts, and client-side performance tuning.',
    badge: '🌐 Modern Frontend'
  },
  {
    id: 'technical-learning',
    icon: 'BookOpen',
    title: 'Technical Learning',
    subtitle: 'Core CS Foundations',
    metric: '8.8+ CGPA',
    description: 'Consistently maintained top academic marks in core computer science subjects: Operating Systems, Computer Networks, and DBMS.',
    badge: '📚 Academic Top Tier'
  },
  {
    id: 'project-building',
    icon: 'Rocket',
    title: 'Project Building',
    subtitle: 'Smart Agriculture Impact',
    metric: 'Community Impact',
    description: 'Conceptualized and engineered the Smart Farmer Procurement System to digitize token queues for rural harvesting centers.',
    badge: '🚀 Societal Impact'
  }
];

export const githubStatsData = {
  username: 'sainath-kadam',
  reposCount: 24,
  starsCount: 48,
  totalContributions: 680,
  currentStreak: '42 Days',
  topLanguages: [
    { name: 'C++', percentage: 35, color: '#00599C' },
    { name: 'JavaScript / React', percentage: 30, color: '#61DAFB' },
    { name: 'Python', percentage: 15, color: '#3776AB' },
    { name: 'Java', percentage: 12, color: '#EA2D2E' },
    { name: 'HTML & CSS', percentage: 8, color: '#E34F26' }
  ],
  featuredRepos: [
    {
      name: 'smart-farmer-procurement',
      description: 'Digital token & queue management platform empowering agricultural produce delivery.',
      stars: 18,
      forks: 5,
      language: 'JavaScript / React',
      languageColor: '#F7DF1E',
      updatedAt: '2 days ago',
      url: 'https://github.com/sainath-kadam/smart-farmer-procurement'
    },
    {
      name: 'dsa-problem-solving-cpp',
      description: 'Curated repository containing 500+ tested implementations of data structures and algorithms in C++.',
      stars: 14,
      forks: 4,
      language: 'C++',
      languageColor: '#00599C',
      updatedAt: 'Yesterday',
      url: 'https://github.com/sainath-kadam/dsa-problem-solving-cpp'
    },
    {
      name: 'weather-intelligence-app',
      description: 'Real-time meteorological analytics dashboard with atmospheric radar and UV index forecasting.',
      stars: 9,
      forks: 2,
      language: 'React / Tailwind',
      languageColor: '#61DAFB',
      updatedAt: '3 weeks ago',
      url: 'https://github.com/sainath-kadam/weather-intelligence-app'
    },
    {
      name: 'algo-pathfinding-visualizer',
      description: 'Interactive computational visualizer for Dijkstra, A*, BFS, and DFS graph algorithms.',
      stars: 12,
      forks: 3,
      language: 'TypeScript',
      languageColor: '#3178C6',
      updatedAt: '1 month ago',
      url: 'https://github.com/sainath-kadam/algo-pathfinding-visualizer'
    }
  ]
};
