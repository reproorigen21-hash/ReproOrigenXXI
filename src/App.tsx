import { AnimatePresence } from 'framer-motion';
import { OSProvider, useOS } from './context/OSContext';
import { ActivateExperience } from './components/ActivateExperience';
import { IntroScreen } from './components/IntroScreen';
import { OSShell } from './components/OSShell';
import { ModuleHub } from './components/ModuleHub';

function PlatformEntry() {
  const { state } = useOS();

  return (
    <AnimatePresence mode="wait">
      {state.screen === 'intro' && <IntroScreen key="intro" />}
      {state.screen === 'activate' && <ActivateExperience key="activate" />}
      {state.screen === 'platform' && (
        <div key="platform">
          <OSShell>
            <ModuleHub />
          </OSShell>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <OSProvider>
      <PlatformEntry />
    </OSProvider>
  );
}
