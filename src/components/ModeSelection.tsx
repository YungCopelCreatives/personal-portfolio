import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Phone, Mail, Instagram, Dribbble, Beaker as Behance, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ModeSelectionProps {
  onSelect: (mode: 'designer' | 'developer') => void;
}

export const ModeSelection = ({ onSelect }: ModeSelectionProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 1
      }));
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse follow effect
        const dx = mousePos.current.x - p.x;
        const dy = mousePos.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x -= dx * 0.02;
          p.y -= dy * 0.02;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isClicking ? '#00D2FF' : 'rgba(255, 255, 255, 0.2)';
        ctx.fill();

        // Lines
        particles.forEach(p2 => {
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 210, 255, ${0.1 * (1 - dist2 / 100)})`;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isClicking]);

  return (
    <div className="relative min-h-screen bg-charcoal flex flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Profile Toggle */}
      <button 
        onClick={() => setIsProfileOpen(true)}
        className="absolute top-8 right-8 p-2 text-white/60 hover:text-white transition-colors z-50"
      >
        <User size={24} strokeWidth={1.5} />
      </button>

      {/* Center Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center">
          <button
            onClick={() => onSelect('designer')}
            className="group relative px-10 py-4 md:px-16 md:py-6 rounded-2xl btn-gradient-border transition-all hover:scale-105"
          >
            <span className="relative z-10 text-lg md:text-xl font-display font-bold tracking-widest uppercase text-white group-hover:text-developer-blue transition-colors">
              Designer
            </span>
          </button>

          <button
            onClick={() => onSelect('developer')}
            className="group relative px-10 py-4 md:px-16 md:py-6 rounded-2xl btn-gradient-border transition-all hover:scale-105"
          >
            <span className="relative z-10 text-lg md:text-xl font-display font-bold tracking-widest uppercase text-white group-hover:text-developer-blue transition-colors">
              Developer
            </span>
          </button>
        </div>
      </motion.div>

      {/* Profile Sidebar */}
      <AnimatePresence>
        {isProfileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-charcoal border-l border-white/10 z-50 p-12 flex flex-col"
            >
              <button 
                onClick={() => setIsProfileOpen(false)}
                className="self-end text-white/40 hover:text-white mb-12"
              >
                Close
              </button>

              <div className="space-y-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Contact</p>
                  <div className="space-y-4">
                    <a href="tel:+27629875647" className="flex items-center gap-4 text-white/80 hover:text-mustard transition-colors">
                      <Phone size={18} strokeWidth={1.5} />
                      <span>+27 62 987 5647</span>
                    </a>
                    <a href="mailto:siyandacebo4@gmail.com" className="flex items-center gap-4 text-white/80 hover:text-mustard transition-colors">
                      <Mail size={18} strokeWidth={1.5} />
                      <span>siyandacebo4@gmail.com</span>
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Social</p>
                  <div className="grid grid-cols-2 gap-4">
                    <a href="https://wa.me/27629875647" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                      <MessageCircle size={18} /> WhatsApp
                    </a>
                    <a href="https://dribbble.com/cebomlotshwa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                      <Dribbble size={18} /> Dribbble
                    </a>
                    <a href="https://behance.net/cebomlotshwa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                      <Behance size={18} /> Behance
                    </a>
                    <a href="https://instagram.com/cebomlotshwa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                      <Instagram size={18} /> Instagram
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
