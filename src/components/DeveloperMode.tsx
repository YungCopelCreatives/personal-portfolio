import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal as TerminalIcon, 
  ExternalLink, 
  Github, 
  Code2, 
  Cpu, 
  Globe, 
  Database, 
  Layers, 
  Zap, 
  Shield, 
  Smartphone,
  ArrowUpRight,
  Mail,
  Twitter,
  Linkedin,
  X as CloseIcon,
  ChevronRight,
  Command,
  Award,
  Menu
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MobileMenu } from './MobileMenu';

// --- Asset Imports ---
import MM_Grid1 from '../assets/M&M Laundromats/Grid1.png';
import MM_Grid2 from '../assets/M&M Laundromats/Grid2.png';
import MM_Grid3 from '../assets/M&M Laundromats/Grid3.png';

import Taaibosch_Grid1 from '../assets/Taaibosch/Grid1.png';
import Taaibosch_Grid2 from '../assets/Taaibosch/Grid2.png';
import Taaibosch_Grid3 from '../assets/Taaibosch/Grid3.png';

import RM_Grid1 from '../assets/RM Physiotherapy/Grid1.png';
import RM_Grid2 from '../assets/RM Physiotherapy/Grid2.png';
import RM_Grid3 from '../assets/RM Physiotherapy/Grid3.png';

import LB_Grid1 from '../assets/LB Physiotherapy/Grid1.png';
import LB_Grid2 from '../assets/LB Physiotherapy/Grid2.png';
import LB_Grid3 from '../assets/LB Physiotherapy/Grid3.png';

import Boikanya_Grid1 from '../assets/Boikanya/Grid1.png';
import Boikanya_Grid2 from '../assets/Boikanya/Grid2.png';
import Boikanya_Grid3 from '../assets/Boikanya/Grid3.png';

const TECH_STACK = [
  { name: 'React', icon: <Code2 size={20} /> },
  { name: 'Next.js', icon: <Globe size={20} /> },
  { name: 'TypeScript', icon: <TerminalIcon size={20} /> },
  { name: 'Node.js', icon: <Cpu size={20} /> },
  { name: 'PostgreSQL', icon: <Database size={20} /> },
  { name: 'Tailwind', icon: <Layers size={20} /> },
  { name: 'Firebase', icon: <Zap size={20} /> },
  { name: 'Docker', icon: <Shield size={20} /> },
];

const PROJECTS = [
  {
    title: 'M&M Laundromat App',
    desc: 'Full-stack on-demand laundry platform. Engineered a cross-platform mobile application for users and a comprehensive admin dashboard for service management.',
    stack: ['React Native', 'Node.js', 'PostgreSQL', 'Figma'],
    link: '#',
    size: 'col-span-2 row-span-2',
    image: MM_Grid1,
    details: [MM_Grid2, MM_Grid3]
  },
  {
    title: 'Taaibosch Organics',
    desc: 'Developed a high-performance e-commerce website with a custom CMS. Focused on responsive design, SEO optimization, and seamless checkout integration.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Figma'],
    link: '#',
    size: 'col-span-1 row-span-1',
    image: Taaibosch_Grid1,
    details: [Taaibosch_Grid2, Taaibosch_Grid3]
  },
  {
    title: 'RM Physiotherapy',
    desc: 'Engineered a professional clinic website with an integrated booking system. Implemented custom animations and a mobile-first UI to enhance patient engagement.',
    stack: ['React', 'Framer Motion', 'Tailwind', 'Figma'],
    link: '#',
    size: 'col-span-1 row-span-1',
    image: RM_Grid1,
    details: [RM_Grid2, RM_Grid3]
  },
  {
    title: 'LB Physiotherapy',
    desc: 'Designed and developed a personal brand website for a medical professional. Implemented a custom content management system and optimized for search engine visibility.',
    stack: ['React', 'TypeScript', 'Tailwind', 'Figma'],
    link: '#',
    size: 'col-span-1 row-span-1',
    image: LB_Grid1,
    details: [LB_Grid2, LB_Grid3]
  },
  {
    title: 'Boikanya',
    desc: 'Developed a hybrid biokinetics and fitness platform. Built a responsive web application featuring service booking and product e-commerce capabilities.',
    stack: ['Next.js', 'Framer Motion', 'Tailwind', 'Figma'],
    link: '#',
    size: 'col-span-1 row-span-1',
    image: Boikanya_Grid1,
    details: [Boikanya_Grid2, Boikanya_Grid3]
  }
];

interface Certification {
  name: string;
  issuer: string;
  badgeId?: string;
  url?: string;
  type: 'embed' | 'link';
}

const CERTIFICATIONS: Certification[] = [
  {
    name: 'ISC2 Candidate',
    issuer: 'ISC2',
    badgeId: '522b649e-3fe3-4604-8d08-bfcaa8603454',
    type: 'embed'
  },
  {
    name: 'Google Cybersecurity Professional Certificate V2',
    issuer: 'Google',
    badgeId: '3e4adcce-41b3-4af1-b307-9b1e4624c44d',
    type: 'embed'
  },
  {
    name: 'Google IT Support Professional Certificate (v2)',
    issuer: 'Coursera',
    badgeId: '35c99546-1305-4bf3-b8ff-505c0a532b6a',
    type: 'embed'
  },
  {
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    badgeId: '0bcd8788-7a8d-42ad-9376-35410348c849',
    type: 'embed'
  },
  {
    name: 'AWS Educate Machine Learning Foundations',
    issuer: 'Amazon Web Services',
    badgeId: '3b43f6d2-bf9d-4644-a645-27a3a0798c23',
    type: 'embed'
  }
];

const CodeRain = ({ color = '#00D2FF' }: { color?: string }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[];:+-*=&%$#@!ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, [color]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" />;
};

const Terminal = () => {
  const [history, setHistory] = React.useState<{ cmd: string; output: string | string[] }[]>([
    { cmd: 'whoami', output: 'cebo_mlotshwa.exe' },
    { cmd: 'status', output: 'Open for new projects (Remote/Hybrid)' }
  ]);
  const [input, setInput] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    let output: string | string[] = '';

    const isCebo = cmd.startsWith('cebo ');
    const actualCmd = isCebo ? cmd.replace('cebo ', '').replace('--', '') : cmd;

    switch (actualCmd) {
      case 'help':
        output = [
          'Available commands:', 
          '  - help: Show this list', 
          '  - cebo --skills: List technical stack', 
          '  - cebo --work-history: Show employment details',
          '  - cebo --contact: Get contact info', 
          '  - cebo --hire-me: Trigger contact/hiring process',
          '  - cebo --coffee: Buy me a coffee', 
          '  - clear: Clear terminal'
        ];
        break;
      case 'skills':
        output = [
          'CORE STACK:',
          '  - Frontend: React, Next.js, TypeScript, Tailwind',
          '  - Backend: Node.js, PostgreSQL, Firebase, GraphQL',
          '  - Devops: Docker, AWS, CI/CD Pipelines',
          '  - Design: Figma, Adobe Suite'
        ];
        break;
      case 'work-history':
        output = [
          'EMPLOYMENT HISTORY:',
          '  - App Admin / Mobile Ops @ Dr Que Empire L.L.C-FZ (Dubai, 2026)',
          '    > Managed dashboard operations, resolved user issues, and provided UX/UI improvement suggestions.',
          '  - Lead Frontend Dev & Designer @ ShareCount (2024)',
          '    > Leading frontend development for high-security startup apps.',
          '  - Brand Designer @ Taaibosch Organics (2025)',
          '    > E-commerce branding, packaging design, and website design/development.',
          '  - Project Partner @ Axonite (2023)',
          '    > Collaborated on strategic project planning and execution.',
          '  - Freelance Designer & Developer @ Yung Copel Creatives (2021 - Present)',
          '    > Delivering end-to-end digital solutions across multiple industries.'
        ];
        break;
      case 'contact':
        output = [
          'GET IN TOUCH:',
          '  - Email: siyandacebo4@gmail.com',
          '  - LinkedIn: linkedin.com/in/cebo-mlotshwa',
          '  - GitHub: github.com/cebomlotshwa',
          '  - Location: Johannesburg, South Africa'
        ];
        break;
      case 'hire-me':
        output = '🚀 Initializing hiring protocol... Opening your email client.';
        window.location.href = 'mailto:siyandacebo4@gmail.com?subject=Hiring Inquiry - Cebo Mlotshwa';
        break;
      case 'coffee':
        output = '☕ Initializing caffeine protocol... (Redirecting to BuyMeACoffee.com)';
        window.open('https://www.buymeacoffee.com', '_blank');
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'whoami':
        output = 'cebo_mlotshwa.exe [Version 2.0.4]';
        break;
      case 'status':
        output = 'Currently available for: Contract, Permanent, Freelance (Remote/Hybrid)';
        break;
      default:
        output = `Command not found: ${cmd}. Type 'help' for options.`;
    }

    setHistory(prev => [...prev, { cmd: input, output }]);
    setInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-black/80 border border-developer-blue/20 rounded-xl overflow-hidden shadow-2xl font-mono text-sm backdrop-blur-md">
      <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-white/20 flex items-center gap-2">
          <Command size={10} /> bash — 80x24
        </span>
      </div>
      <div ref={scrollRef} className="p-6 h-64 overflow-y-auto scrollbar-hide space-y-2">
        {history.map((item, i) => (
          <div key={i}>
            <div className="flex gap-2 text-developer-blue/50">
              <span>cebo@root:~$</span>
              <span className="text-white">{item.cmd}</span>
            </div>
            <div className="text-developer-blue/80 pl-4">
              {Array.isArray(item.output) ? (
                item.output.map((line, j) => <div key={j}>{line}</div>)
              ) : (
                <div>{item.output}</div>
              )}
            </div>
          </div>
        ))}
        <form onSubmit={handleCommand} className="flex gap-2 text-developer-blue">
          <span>cebo@root:~$</span>
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-white"
          />
        </form>
      </div>
    </div>
  );
};

export const DeveloperMode = ({ onSwitch, onBackToSelection }: { onSwitch: () => void, onBackToSelection: () => void }) => {
  const [selectedProject, setSelectedProject] = React.useState<typeof PROJECTS[0] | null>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = "//cdn.credly.com/assets/utilities/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-charcoal text-white selection:bg-developer-blue selection:text-black min-h-screen font-mono relative overflow-hidden isolate">
      {/* Global Code Rain Background */}
      <div className="fixed inset-0 pointer-events-none z-[-10]">
        <CodeRain color="#00D2FF" />
      </div>

      {/* Grid Background */}
      <div className="fixed inset-0 grid-lines opacity-[0.03] pointer-events-none z-[-10]" />

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        items={['Projects', 'Stack', 'Certifications', 'Experience']}
        onSwitch={onSwitch}
        onBackToSelection={onBackToSelection}
        switchLabel="Designer"
        mode="developer"
      />

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
        {/* Header/Nav */}
        <header className="flex justify-between items-center mb-12 md:mb-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-developer-blue rounded-xl flex items-center justify-center text-black font-bold shadow-lg shadow-developer-blue/20">
              <TerminalIcon size={20} />
            </div>
            <span className="font-display font-bold tracking-tight">Cebo Mlotshwa</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 mr-4">
              <a href="https://github.com/cebomlotshwa" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-developer-blue transition-colors">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/cebo-mlotshwa" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-developer-blue transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
            <button
              onClick={onSwitch}
              className="hidden lg:block px-6 py-2.5 rounded-xl border border-white/10 text-[10px] font-display font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
            >
              Designer
            </button>

            {/* Mobile Burger Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white"
            >
              {isMenuOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        {/* Hero - Centered */}
        <section className="mb-32 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-developer-blue/10 border border-developer-blue/20 text-developer-blue text-[10px] font-mono mb-8 tracking-widest uppercase">
              <TerminalIcon size={12} /> Full-Stack Engineer & Product Thinker
            </div>
            <h1 className="text-3xl md:text-8xl font-display font-bold leading-[1.1] mb-10 tracking-tight">
              I build <span className="text-white/40">scalable</span> digital systems that <span className="text-developer-blue">solve problems.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Combining technical excellence with product intuition to create software that people actually love using.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-24">
              <a href="#Projects" className="px-6 py-3 md:px-8 md:py-4 bg-developer-blue text-black rounded-2xl font-bold hover:glow-blue transition-all flex items-center gap-2 text-sm md:text-base">
                Explore Work <ArrowUpRight size={20} />
              </a>
              <div className="flex items-center gap-4 px-4 py-3 md:px-6 md:py-4 bg-white/5 border border-white/10 rounded-2xl">
                <Github size={18} className="text-white/40" />
                <Linkedin size={18} className="text-white/40" />
                <Twitter size={18} className="text-white/40" />
              </div>
            </div>
          </motion.div>

          {/* Interactive Terminal */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full"
          >
            <Terminal />
          </motion.div>
        </section>

        {/* Bento Grid Projects */}
        <section id="Projects" className="mb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] text-white/20 mb-4">Selected Works</h2>
              <p className="text-3xl font-display font-bold">Featured Projects</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className={cn(
                  "group relative rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] hover:border-developer-blue/30 transition-all cursor-pointer",
                  project.size
                )}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-80" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((s, j) => (
                      <span key={j} className="px-2 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] font-mono text-white/60">
                        {s}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-developer-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/40 line-clamp-2">{project.desc}</p>
                  
                  <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="relative w-full max-w-6xl max-h-[90vh] bg-charcoal/40 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.5)] backdrop-blur-md"
              >
                {/* Green Code Rain Background */}
                <CodeRain color="#00FF41" />

                {/* Left: Scrollable Image Section */}
                <div className="w-full md:w-3/5 h-[40vh] md:h-auto overflow-y-auto scrollbar-hide bg-black/20 relative z-10 border-b md:border-b-0 md:border-r border-white/5">
                  <div className="p-6 space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title} 
                        className="w-full rounded-3xl shadow-2xl border border-white/10" 
                      />
                    </motion.div>
                    {selectedProject.details && selectedProject.details.map((img, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (idx * 0.1) }}
                      >
                        <img 
                          src={img} 
                          alt={`${selectedProject.title} detail ${idx + 1}`} 
                          className="w-full rounded-3xl shadow-2xl border border-white/10" 
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right: Scrollable Content Section */}
                <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col h-full overflow-y-auto scrollbar-hide relative z-10">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-8">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <h3 className="text-2xl md:text-5xl font-display font-bold mb-2 text-white leading-tight">
                          {selectedProject.title}
                        </h3>
                        <div className="w-20 h-1 bg-developer-blue rounded-full" />
                      </motion.div>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/40 hover:text-white transition-all group"
                      >
                        <CloseIcon size={20} className="group-hover:rotate-90 transition-transform" />
                      </button>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-6 mb-12"
                    >
                      <p className="text-lg text-white/70 leading-relaxed font-light">
                        {selectedProject.desc}
                      </p>
                      <p className="text-sm text-white/40 leading-relaxed italic border-l-2 border-developer-blue/30 pl-4">
                        "A deep dive into the technical architecture and product decisions that went into building {selectedProject.title}. 
                        Focused on performance, scalability, and exceptional user experience."
                      </p>
                    </motion.div>

                    <div className="mb-12">
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6 font-mono font-bold">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map((s, i) => (
                          <motion.span 
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + (i * 0.05) }}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white/80 font-mono backdrop-blur-md hover:border-developer-blue/40 transition-colors"
                          >
                            {s}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-auto pt-8 border-t border-white/5">
                    <motion.a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-5 bg-developer-blue text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:glow-blue transition-all shadow-lg shadow-developer-blue/20"
                    >
                      <span className="text-lg">Live Demo</span>
                      <ExternalLink size={20} />
                    </motion.a>
                    <motion.a 
                      href="https://github.com/cebomlotshwa"
                      target="_blank"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all text-white/80"
                    >
                      <span>Source Code</span>
                      <Github size={20} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Tech Stack Marquee-style Grid */}
        <section id="Stack" className="mb-32">
          <h2 className="text-sm uppercase tracking-[0.3em] text-white/20 mb-12 text-center">The Arsenal</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {TECH_STACK.map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center gap-4 hover:border-developer-blue/20 transition-all"
              >
                <div className="text-developer-blue/60">{tech.icon}</div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="Certifications" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.3em] text-white/20 mb-4">Verified Expertise</h2>
            <p className="text-3xl font-display font-bold">Professional Certifications</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-between hover:border-developer-blue/30 transition-all group"
              >
                <div className="w-full aspect-[150/270] flex items-center justify-center mb-4 overflow-hidden rounded-xl bg-black/20">
                  {cert.type === 'embed' ? (
                    <div 
                      data-iframe-width="150" 
                      data-iframe-height="270" 
                      data-share-badge-id={cert.badgeId} 
                      data-share-badge-host="https://www.credly.com"
                    />
                  ) : (
                    <a 
                      href={cert.url || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-4 text-center p-4 group-hover:scale-105 transition-transform"
                    >
                      <div className="w-24 h-24 bg-developer-blue/10 rounded-full flex items-center justify-center text-developer-blue">
                        <Award size={48} />
                      </div>
                      <span className="text-[10px] font-mono text-developer-blue uppercase tracking-widest">View Badge</span>
                    </a>
                  )}
                </div>
                <div className="text-center">
                  <h4 className="text-xs font-bold mb-1 line-clamp-2 group-hover:text-developer-blue transition-colors">{cert.name}</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience & Philosophy Bento */}
        <section id="Experience" className="mb-32">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-10 bg-white/[0.02] border border-white/5 rounded-3xl">
              <h3 className="text-sm uppercase tracking-[0.3em] text-white/20 mb-10">Experience</h3>
              <div className="space-y-10">
                {[
                  { role: 'App Admin / Mobile Ops', company: 'Dr Que Empire L.L.C-FZ', period: '2026' },
                  { role: 'Lead Frontend Dev & Designer', company: 'ShareCount', period: '2024' },
                  { role: 'Brand Designer', company: 'Taaibosch Organics', period: '2025' },
                  { role: 'Project Partner', company: 'Axonite', period: '2023' },
                  { role: 'Freelance Designer & Developer', company: 'Yung Copel Creatives', period: '2021 - Present' },
                ].map((exp, i) => (
                  <div key={i} className="flex justify-between items-start group">
                    <div>
                      <h4 className="text-xl font-bold group-hover:text-developer-blue transition-colors">{exp.role}</h4>
                      <p className="text-white/40 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-mono text-white/20">{exp.period}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-10 bg-developer-blue text-black rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] opacity-40 mb-8">Philosophy</h3>
                <p className="text-2xl font-display font-bold leading-tight">
                  "I don't just write code; I architect solutions that scale with the business."
                </p>
              </div>
              <div className="pt-8 border-t border-black/10">
                <p className="text-xs font-bold uppercase tracking-widest">Cebo Mlotshwa</p>
                <p className="text-[10px] opacity-60 uppercase tracking-widest">Creative Technologist</p>
              </div>
            </div>

            <div className="p-10 bg-white/[0.02] border border-white/5 rounded-3xl">
              <h3 className="text-sm uppercase tracking-[0.3em] text-white/20 mb-8">What I Do</h3>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="flex items-center gap-3"><Zap size={14} className="text-developer-blue" /> Scalable Web Apps</li>
                <li className="flex items-center gap-3"><Database size={14} className="text-developer-blue" /> System Architecture</li>
                <li className="flex items-center gap-3"><Smartphone size={14} className="text-developer-blue" /> Mobile Solutions</li>
                <li className="flex items-center gap-3"><Code2 size={14} className="text-developer-blue" /> API Design</li>
              </ul>
            </div>

            <div className="md:col-span-2 p-10 bg-mustard text-black rounded-3xl flex items-center justify-between">
              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] opacity-40 mb-2">Availability</h3>
                <p className="text-2xl md:text-3xl font-display font-bold">Open for new projects</p>
              </div>
              <a href="mailto:siyandacebo4@gmail.com" className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-3xl md:text-8xl font-display font-bold mb-12 tracking-tight">
              Ready to build the <br />
              <span className="text-developer-blue">next big thing?</span>
            </h2>
            <a href="mailto:siyandacebo4@gmail.com" className="inline-flex items-center gap-4 px-8 py-4 md:px-12 md:py-6 bg-white text-black rounded-2xl font-bold text-lg md:text-xl hover:bg-developer-blue transition-all">
              Get in Touch <ArrowUpRight size={24} />
            </a>
          </motion.div>
        </section>

        <footer className="py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/20 text-[10px] font-mono uppercase tracking-[0.2em]">
          <div className="flex gap-8">
            <span>Johannesburg, ZA</span>
            <span>Local Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <span>© 2026 CEBO_MLOTSHWA — ALL_RIGHTS_RESERVED</span>
          <div className="flex gap-6">
            <a href="https://github.com/cebomlotshwa" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github</a>
            <a href="https://linkedin.com/in/cebo-mlotshwa" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Linkedin</a>
          </div>
        </footer>
      </main>
    </div>
  );
};
