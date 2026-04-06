import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { Intro } from './components/Intro';
import { ModeSelection } from './components/ModeSelection';
import { DesignerMode } from './components/DesignerMode';
import { DeveloperMode } from './components/DeveloperMode';
import { Chatbot } from './components/Chatbot';

type AppState = 'intro' | 'selection' | 'designer' | 'developer';

export default function App() {
  const [state, setState] = useState<AppState>('intro');

  const handleIntroComplete = () => {
    setState('selection');
  };

  const handleModeSelect = (mode: 'designer' | 'developer') => {
    setState(mode);
  };

  return (
    <div className="min-h-screen bg-charcoal">
      <AnimatePresence mode="wait">
        {state === 'intro' && (
          <Intro key="intro" onComplete={handleIntroComplete} />
        )}

        {state === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            <ModeSelection onSelect={handleModeSelect} />
          </motion.div>
        )}

        {state === 'designer' && (
          <motion.div
            key="designer"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <DesignerMode onSwitch={() => setState('developer')} onBackToSelection={() => setState('selection')} />
          </motion.div>
        )}

        {state === 'developer' && (
          <motion.div
            key="developer"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <DeveloperMode onSwitch={() => setState('designer')} onBackToSelection={() => setState('selection')} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {state !== 'intro' && <Chatbot />}
    </div>
  );
}
