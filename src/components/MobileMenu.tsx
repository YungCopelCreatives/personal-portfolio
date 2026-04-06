import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X as CloseIcon } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: string[];
  onSwitch: () => void;
  onBackToSelection: () => void;
  switchLabel: string;
  mode: 'designer' | 'developer';
}

export const MobileMenu = ({ 
  isOpen, 
  onClose, 
  items, 
  onSwitch, 
  onBackToSelection, 
  switchLabel,
  mode 
}: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="fixed inset-0 z-[100] bg-charcoal flex flex-col items-center justify-center p-8 lg:hidden"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
          >
            <CloseIcon size={32} />
          </button>

          <div className="flex flex-col gap-8 text-center w-full max-w-sm">
            <div className="flex flex-col gap-6">
              {items && items.length > 0 ? (
                items.map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={onClose}
                    className="text-2xl md:text-4xl font-display font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                ))
              ) : (
                <p className="text-white/20 uppercase tracking-widest">No links available</p>
              )}
            </div>
            
            <div className="h-px w-24 bg-white/10 mx-auto my-4" />
            
            <button
              onClick={() => {
                onSwitch();
                onClose();
              }}
              className={`text-xl md:text-2xl font-display font-bold transition-colors uppercase tracking-widest ${
                mode === 'designer' ? 'text-white hover:text-developer-blue' : 'text-white hover:text-white/60'
              }`}
            >
              Switch to {switchLabel}
            </button>

            <a 
              href="mailto:siyandacebo4@gmail.com"
              className={`px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold transition-all text-lg md:text-xl text-center ${
                mode === 'designer' ? 'bg-white text-black hover:scale-105' : 'bg-developer-blue text-black hover:glow-blue'
              }`}
            >
              Hire Me
            </a>

            <button
              onClick={() => {
                onBackToSelection();
                onClose();
              }}
              className="text-lg md:text-xl font-display font-bold text-white/40 hover:text-white transition-colors"
            >
              Exit Mode
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
