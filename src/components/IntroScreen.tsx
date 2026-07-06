import { motion } from 'framer-motion';
import { useOS } from '../context/OSContext';

export function IntroScreen() {
  const { goToScreen, updateOS } = useOS();

  return (
    <motion.section
      className="screen screen-intro intro-screen"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="intro-screen__container">
        <div className="intro-screen__visual">
          <div className="intro-screen__seal">
            <span>EL SELLO</span>
            <span>DEL SIGLO</span>
          </div>
        </div>

        <div className="intro-screen__content">
          <div className="intro-screen__brand">REPROORIGEN XXI</div>
          <div className="intro-screen__headline">El Sello del Siglo</div>
          <div className="intro-screen__subline">La inteligencia deja huella.</div>

          <div className="intro-screen__actions">
            <button type="button" className="intro-screen__button intro-screen__button--primary" onClick={() => goToScreen('activate')}>
              Activar la experiencia
            </button>
            <button
              type="button"
              className="intro-screen__button intro-screen__button--secondary"
              onClick={() => {
                updateOS({ origin: 'intro' });
                goToScreen('platform');
              }}
            >
              Explorar el Ecosistema
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
