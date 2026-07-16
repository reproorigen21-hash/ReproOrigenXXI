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
          {/* Wax seal — pressed on ancient parchment, lit by candle */}
          <motion.div
            className="intro-screen__seal"
            initial={{ scale: 0.78, opacity: 0, rotate: -4 }}
            animate={{ scale: 1, opacity: 1, rotate: -1.8 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <span className="intro-screen__seal-line">REPROORIGEN</span>
            <div className="intro-screen__seal-divider" />
            <span className="intro-screen__seal-line intro-screen__seal-line--main">XXI</span>
            <div className="intro-screen__seal-divider" />
            <span className="intro-screen__seal-line">EL ORIGEN</span>
          </motion.div>
        </div>

        <div className="intro-screen__content">
          <div className="intro-screen__brand">REPROORIGEN XXI</div>
          <div className="intro-screen__headline">El mundo oculto del origen</div>
          <div className="intro-screen__subline">Como si alguien hubiera sellado un manuscrito antiguo. Una biblioteca secreta que despierta en el siglo XXI.</div>

          <div className="intro-screen__actions">
            <button type="button" className="intro-screen__button intro-screen__button--primary" onClick={() => goToScreen('activate')}>
              Cruzar la puerta
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
