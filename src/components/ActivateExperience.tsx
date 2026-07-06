import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../context/OSContext';

export function ActivateExperience() {
  const { goToScreen } = useOS();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isTransitioning) return;

    const timer = window.setTimeout(() => {
      goToScreen('platform');
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [isTransitioning, goToScreen]);

  return (
    <motion.section
      className="screen screen-activate activate-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="activate-screen__container">
        <AnimatePresence mode="wait">
          {isTransitioning ? (
            <motion.div
              key="message"
              className="activate-screen__message"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              “No heredamos el futuro.
              <br />Lo construimos.
              <br />Pueblo a pueblo.
              <br />Árbol a árbol.
              <br />Persona a persona.”
            </motion.div>
          ) : (
            <motion.button
              key="button"
              className="activate-screen__button"
              onClick={() => setIsTransitioning(true)}
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              Activar la experiencia
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
