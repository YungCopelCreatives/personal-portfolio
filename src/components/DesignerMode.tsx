import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowDown, 
  Download, 
  Figma, 
  Chrome, 
  Palette, 
  Layout, 
  Box, 
  Layers, 
  Monitor, 
  Briefcase, 
  User, 
  Award, 
  FileText,
  ChevronRight,
  Search,
  PenTool,
  ArrowUpRight,
  Menu,
  X as CloseIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MobileMenu } from './MobileMenu';

// --- Portfolio Thumbnails (Cover2) ---
import AM_Thumb from '../assets/Cover2/AM.png';
import Kai_Thumb from '../assets/Cover2/Kai.png';
import Boikanya_Thumb from '../assets/Cover2/Boikanya.png';
import Taaibosch_Thumb from '../assets/Cover2/Taaibosch.png';
import RM_Thumb from '../assets/Cover2/RM.png';
import LB_Thumb from '../assets/Cover2/LB.png';
import Velocity_Thumb from '../assets/Cover2/VGA.png';
import D48_Thumb from '../assets/Cover2/D48.png';
import WasteHunt_Thumb from '../assets/Cover2/WasteHunt.png';
import Atlantic_Thumb from '../assets/Cover2/Atlantic.png';

// --- Asset Mapping for Vite (Ensures images are bundled correctly for Vercel) ---
// This uses Vite's eager glob import to find all Grid images in assets
const assetFiles = import.meta.glob('../assets/**/*.png', { eager: true, as: 'url' });

const PROJECTS = [
  { 
    id: 1, 
    title: 'Anderson Media', 
    slug: 'AndersonMedia',
    thumbnail: AM_Thumb,
    assetFolder: 'Anderson Media',
    type: 'Branding & Visual Identity', 
    duration: '1–3 Weeks',
    tools: ['Photoshop', 'Illustrator', 'Canva', 'Figma'],
    designFocus: ['Branding & Visual Identity'],
    color: 'bg-white/5',
    description: 'Anderson Media is a personal brand centered around media production. The identity was built using the initials “AM,” incorporating a camera-inspired visual concept to reflect the brand’s core services.',
    palette: ['#000000', '#FEBD59', '#FFFFFF'],
    typography: 'Poppins',
    year: '2023',
    gridCount: 6
  },
  { 
    id: 2, 
    title: 'Kai Industries', 
    slug: 'KaiIndustries',
    thumbnail: Kai_Thumb,
    assetFolder: 'Kai Industries',
    type: 'Logo design', 
    duration: '1–2 Weeks',
    tools: ['Illustrator', 'Photoshop', 'Figma'],
    designFocus: ['Logo Design', 'Brand Identity', 'Visual Systems'],
    color: 'bg-white/5',
    description: 'Kai Industries required a sophisticated and modern logo design that reflects industrial strength and innovation.',
    palette: ['#1A1A1A', '#E5E5E5', '#007AFF'],
    typography: 'Space Grotesk',
    year: '2026',
    gridCount: 3
  },
  { 
    id: 3, 
    title: 'Boikanya', 
    slug: 'Boikanya',
    thumbnail: Boikanya_Thumb,
    assetFolder: 'Boikanya',
    type: 'Branding & Product Identity', 
    duration: '1–3 Weeks',
    tools: ['Photoshop', 'Illustrator', 'Canva', 'Figma'],
    designFocus: ['Branding & Product Identity', 'Website design'],
    color: 'bg-white/5',
    description: 'Boikanya is a hybrid biokinetics and fitness brand designed to operate across both service delivery and product sales.',
    palette: ['#637047', '#939C71', '#CEC1A5', '#F3E8D7'],
    typography: 'Museo Moderno',
    year: '2025',
    gridCount: 6
  },
  { 
    id: 4, 
    title: 'Taaibosch Organics', 
    slug: 'Taaibosch',
    thumbnail: Taaibosch_Thumb,
    assetFolder: 'Taaibosch',
    type: 'Branding & Packaging Design', 
    duration: '1–3 Weeks',
    tools: ['Photoshop', 'Illustrator', 'Canva', 'Figma'],
    designFocus: ['E-commerce Branding', 'Packaging Design'],
    color: 'bg-white/5',
    description: 'Taaibosch Organics is an e-commerce brand focused on organic supplements and wellness products.',
    palette: ['#306B43', '#93B29D', '#FFFFFF'],
    typography: 'Adam Script',
    year: '2025',
    gridCount: 6
  },
  { 
    id: 5, 
    title: 'RM Physiotherapy', 
    slug: 'RMPhysiotherapy',
    thumbnail: RM_Thumb,
    assetFolder: 'RM Physiotherapy',
    type: 'Branding & Website Design', 
    duration: '1–3 Weeks',
    tools: ['Photoshop', 'Illustrator', 'Canva', 'Figma'],
    designFocus: ['Branding', 'Website design and development'],
    color: 'bg-white/5',
    description: 'RM Physiotherapy is a family-oriented clinic requiring a warm, welcoming identity.',
    palette: ['#145E80', '#74BF54', '#FFFFFF'],
    typography: 'Red Hat Display',
    year: '2024',
    gridCount: 5
  },
  { 
    id: 6, 
    title: 'LB Physiotherapy', 
    slug: 'LBPhysiotherapy',
    thumbnail: LB_Thumb,
    assetFolder: 'LB Physiotherapy',
    type: 'Branding & Identity Design', 
    duration: '1–3 Weeks',
    tools: ['Photoshop', 'Illustrator', 'Canva', 'Figma'],
    designFocus: ['Branding & Identity Design', 'Website Design and development'],
    color: 'bg-white/5',
    description: 'LB Physiotherapy required a strong, personal identity tied directly to the practitioner.',
    palette: ['#193262', '#12849E', '#FFFFFF'],
    typography: 'Agrandir Wide',
    year: '2023 - 2024',
    gridCount: 6
  },
  { 
    id: 7, 
    title: 'Velocity Glass & Aluminium', 
    slug: 'Velocity',
    thumbnail: Velocity_Thumb,
    assetFolder: 'Velocity',
    type: 'Branding & Visual Identity', 
    duration: '1–3 Weeks',
    tools: ['Photoshop', 'Illustrator', 'Canva', 'Figma'],
    designFocus: ['Branding & Visual Identity'],
    color: 'bg-white/5',
    description: 'Velocity Glass & Aluminium required a clean and industry-relevant identity.',
    palette: ['#000000', '#4063BE', '#FFFFFF'],
    typography: 'Aileron',
    year: '2023',
    gridCount: 6
  },
  { 
    id: 8, 
    title: 'M&M Laundromat App', 
    slug: 'MMLaundromats',
    thumbnail: Atlantic_Thumb,
    assetFolder: 'M&M Laundromats',
    type: 'App Design & Branding', 
    duration: '1–3 Weeks',
    tools: ['Photoshop', 'Illustrator', 'Canva', 'Figma'],
    designFocus: ['App Design and Development', 'Branding'],
    color: 'bg-white/5',
    description: 'M&M Laundromat is an on-demand laundry service platform designed to streamline the entire process.',
    palette: ['#005162', '#FFFFFF', '#67C3CF'],
    typography: 'Banger',
    year: '2025 - 2026',
    gridCount: 3
  },
  { 
    id: 9, 
    title: 'D48 Midrand', 
    slug: 'D48Midrand',
    thumbnail: D48_Thumb,
    assetFolder: 'D48 Midrand',
    type: 'Branding & Menu Design', 
    duration: '1–3 Weeks',
    tools: ['Photoshop', 'Illustrator', 'Canva', 'Figma'],
    designFocus: ['Branding & Menu Design'],
    color: 'bg-white/5',
    description: 'D48 Midrand required a simple, memorable identity that is easy to recognize.',
    palette: ['#000000', '#FFFFFF'],
    typography: 'Druzhba Retro, Horizon',
    year: '2024',
    gridCount: 3
  },
  { 
    id: 10, 
    title: 'Waste Hunt', 
    slug: 'WasteHunt',
    thumbnail: WasteHunt_Thumb,
    assetFolder: 'Waste HUnt',
    type: 'Branding & Visual Identity', 
    duration: '1–3 Weeks',
    tools: ['Photoshop', 'Illustrator', 'Canva', 'Figma'],
    designFocus: ['Branding & Visual Identity'],
    color: 'bg-white/5',
    description: 'Waste Hunt is a waste management solution focused on environmental sustainability.',
    palette: ['#2D5A27', '#FFFFFF', '#000000'],
    typography: 'Inter',
    year: '2023',
    gridCount: 6
  },
];

const EXPERIENCE = [
  { id: 1, role: 'Brand Identity Designer', company: 'Kai Industries', category: 'Brand Design', period: '2026' },
  { id: 2, role: 'Lead Designer & Frontend Dev', company: 'ShareCount (Startup)', category: 'App Design', period: '2024' },
  { id: 3, role: 'Freelance Designer & Developer', company: 'Yung Copel Creatives', category: 'Brand Design', period: '2021 - Present' },
];

const NAV_ITEMS = ['Portfolio', 'About', 'Experience', 'Capabilities', 'Tools', 'Resume', 'Contact'];

const CaseStudyModal = ({ project, onClose }: { project: typeof PROJECTS[0], onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-charcoal overflow-y-auto"
    >
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[110] w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform"
      >
        <ChevronRight className="rotate-180" size={24} />
      </button>

      <div className="max-w-7xl mx-auto px-8 md:px-24 py-32">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-white/40 mb-6 block">{project.type} — {project.year}</span>
          <h1 className="text-4xl md:text-[12vw] font-display font-bold leading-[0.85] mb-16 tracking-tighter uppercase">
            {project.title.split(' ')[0]}<br />
            <span className="text-white/20">{project.title.split(' ')[1] || ""}</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-24 mb-32">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-white/40 mb-6 font-bold">The Challenge</h3>
              <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/80">
                {project.description}
              </p>
            </div>
            <div className="space-y-12">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-bold">Duration</h3>
                  <p className="text-lg font-medium">{project.duration}</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-bold">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 border border-white/10 rounded-md">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-white/40 mb-6 font-bold">Color Palette</h3>
                <div className="flex gap-4">
                  {project.palette.map((color, i) => (
                    <div key={i} className="group flex flex-col gap-2">
                      <div className="w-16 h-16 rounded-2xl border border-white/10" style={{ backgroundColor: color }} />
                      <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity uppercase">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-white/40 mb-6 font-bold">Typography</h3>
                <p className="text-xl font-serif italic text-white/60">{project.typography}</p>
              </div>
            </div>
          </div>

          {/* Main Showcase */}
          <div className="aspect-[16/9] bg-white/5 rounded-[3rem] overflow-hidden mb-32 relative group">
            <img 
              src={project.thumbnail} 
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>

          {/* Mockup Grid - Vercel Safe Mapping */}
          <div className="mb-32">
            <h3 className="text-xs uppercase tracking-widest text-white/40 mb-8 font-bold text-center">Brand Mockups</h3>
            <div className={cn(
              "grid gap-4 overflow-hidden rounded-[2rem]",
              project.gridCount === 1 ? "grid-cols-1" : project.gridCount === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-2 md:grid-cols-3"
            )}>
              {Array.from({ length: project.gridCount || 6 }).map((_, i) => {
                const idx = i + 1;
                // Vercel/Linux safe path lookup
                // This searches for the image in the eager-loaded glob map
                const folder = project.assetFolder;
                const matches = Object.entries(assetFiles).filter(([path]) => 
                  path.includes(folder) && (path.includes(`Grid${idx}.png`) || path.includes(`Grid${idx} `))
                );
                const imgSrc = matches.length > 0 ? (matches[0][1] as string) : 'https://picsum.photos/800/800';

                return (
                  <div key={idx} className="aspect-square bg-white/5 overflow-hidden relative group rounded-2xl">
                    <img 
                      src={imgSrc} 
                      alt={`Mockup ${idx}`}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-12 bg-white/5 rounded-[2rem] border border-white/10">
              <h4 className="text-4xl font-display font-bold mb-4">01</h4>
              <p className="text-sm text-white/40 leading-relaxed">Research & Discovery phase focused on user behavior and market trends.</p>
            </div>
            <div className="p-12 bg-white/5 rounded-[2rem] border border-white/10">
              <h4 className="text-4xl font-display font-bold mb-4">02</h4>
              <p className="text-sm text-white/40 leading-relaxed">Iterative design process with high-fidelity prototyping and user testing.</p>
            </div>
            <div className="p-12 bg-white/5 rounded-[2rem] border border-white/10">
              <h4 className="text-4xl font-display font-bold mb-4">03</h4>
              <p className="text-sm text-white/40 leading-relaxed">Final delivery including comprehensive brand guidelines and asset library.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const DesignerMode = ({ onSwitch, onBackToSelection }: { onSwitch: () => void, onBackToSelection: () => void }) => {
  const [activeSection, setActiveSection] = useState('Portfolio');
  const [projectFilter, setProjectFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const PROJECT_CATEGORIES = ['All', 'Brand Design', 'App Design', 'Marketing Material'];

  const filteredProjects = projectFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => {
        const type = p.type.toLowerCase();
        if (projectFilter === 'App Design') return type.includes('app');
        if (projectFilter === 'Brand Design') return type.includes('brand') || type.includes('identity');
        if (projectFilter === 'Marketing Material') return type.includes('marketing');
        return true;
      });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    NAV_ITEMS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="design-grid min-h-screen text-white selection:bg-white selection:text-black">
      
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
      {/* Sticky Left Nav - Desktop */}
      <nav className="fixed left-0 top-0 h-full w-24 hidden lg:flex flex-col items-center justify-center z-40 border-r border-white/5 bg-charcoal/80 backdrop-blur-md">
        <div className="flex flex-col gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={cn(
                "relative group flex items-center justify-center w-12 h-12 transition-all",
                activeSection === item ? "text-white" : "text-white/20 hover:text-white/60"
              )}
            >
              <span className={cn(
                "w-1 h-1 rounded-full bg-current transition-all",
                activeSection === item ? "scale-[3]" : "group-hover:scale-150"
              )} />
            </a>
          ))}
          <button 
            onClick={onBackToSelection}
            className="mt-8 text-white/20 hover:text-white transition-colors"
          >
            <CloseIcon size={20} />
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        items={NAV_ITEMS}
        onSwitch={onSwitch}
        onBackToSelection={onBackToSelection}
        switchLabel="Developer"
        mode="designer"
      />

      <main className="lg:pl-24 pt-12 md:pt-24">
        {/* Header */}
        <header className="flex justify-between items-center px-8 md:px-24 py-12 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black font-bold">
              <Palette size={20} />
            </div>
            <span className="font-display font-bold tracking-tight text-white">Cebo Mlotshwa</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onSwitch}
              className="hidden lg:block px-6 py-2.5 rounded-xl border border-white/10 text-[10px] font-display font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
            >
              Developer
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white"
            >
              {isMenuOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        {/* Hero */}
        <section id="Hero" className="min-h-[70vh] flex flex-col justify-center px-8 md:px-24 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-8xl font-display font-bold leading-[0.9] mb-8 max-w-4xl">
              Designing <span className="text-white/20">brands.</span><br />
              Crafting visual experiences.
            </h1>
            <p className="text-lg md:text-2xl text-white/40 max-w-2xl mb-12 font-light leading-relaxed">
              I translate complex ideas into simple, emotional, and impactful visual stories that resonate with people.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#Contact" 
                className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-white/80 transition-all text-center"
              >
                Hire Me
              </a>
              <a 
                href="#Portfolio" 
                className="px-8 py-4 border border-white/10 rounded-full font-medium hover:bg-white/5 transition-all text-center"
              >
                View Work
              </a>
            </div>
          </motion.div>
        </section>

        {/* Portfolio Grid */}
        <section id="Portfolio" className="py-16 border-t border-white/5">
          <div className="px-8 md:px-24 mb-12 flex flex-wrap gap-4">
            {PROJECT_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setProjectFilter(cat)}
                className={cn(
                  "px-8 py-3 rounded-full text-sm uppercase tracking-widest transition-all border font-bold",
                  projectFilter === cat 
                    ? "bg-white text-black border-white" 
                    : "border-white/10 text-white/40 hover:border-white/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative aspect-square border border-white/5 overflow-hidden cursor-pointer"
                >
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 bg-black/40">
                    <p className="text-xs uppercase tracking-widest text-white/60 mb-2">{project.type}</p>
                    <h3 className="text-3xl font-display font-bold">{project.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* About */}
        <section id="About" className="py-20 px-8 md:px-24 border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="aspect-[3/4] bg-white/5 rounded-2xl overflow-hidden grayscale">
              <img 
                src="https://picsum.photos/seed/design-cebo/800/1200" 
                alt="About" 
                className="w-full h-full object-cover opacity-50"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-6xl font-display font-bold text-white mb-8">From passion to purpose.</h2>
              <div className="space-y-6 text-lg text-white/40 leading-relaxed">
                <p>My journey into design wasn't just about making things look good; it was about understanding the silent language of visuals.</p>
                <p>Based in Johannesburg, I've spent years honing my craft, moving from raw curiosity to a structured approach.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="Experience" className="py-20 px-8 md:px-24 border-t border-white/5">
          <h2 className="text-xs uppercase tracking-widest text-white/20 mb-16 font-bold">Experience</h2>
          <div className="space-y-4">
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                className="p-8 border border-white/5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-white/[0.02] transition-colors"
              >
                <div>
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <p className="text-white/40">{exp.company}</p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-xs uppercase tracking-widest text-white/20 mb-1">{exp.category}</p>
                  <p className="text-sm font-mono text-white/40">{exp.period}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer id="Contact" className="py-32 px-8 md:px-24 text-center border-t border-white/5">
          <h2 className="text-3xl md:text-8xl font-display font-bold mb-12">Let's build something <br /><span className="text-white/20">meaningful.</span></h2>
          <div className="flex gap-6 justify-center">
            <a href="mailto:siyandacebo4@gmail.com" className="px-12 py-5 bg-white text-black rounded-full font-bold hover:bg-white/80 transition-colors">Hire Me</a>
          </div>
          <div className="mt-32 pt-12 border-t border-white/5 flex justify-between text-white/20 text-xs uppercase tracking-widest">
            <span>© 2026 Cebo Mlotshwa</span>
            <span>Johannesburg / RSA</span>
          </div>
        </footer>
      </main>
    </div>
  );
};
