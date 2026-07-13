import { createContext, ReactNode, useContext, useState } from 'react';
import type { OSState, ScreenKey } from '../types';

type OSContextValue = {
  state: OSState;
  updateOS: (updates: Partial<OSState>) => void;
  goToScreen: (screen: ScreenKey) => void;
};

const initialState: OSState = {
  screen: 'platform',
  activeModule: null,
  publicRoute: 'inicio',
  userType: '',
  interest: '',
  origin: 'direct'
};

const OSContext = createContext<OSContextValue | undefined>(undefined);

export function OSProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OSState>(initialState);

  const updateOS = (updates: Partial<OSState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const goToScreen = (screen: ScreenKey) => {
    setState((prev) => ({ ...prev, screen }));
  };

  return (
    <OSContext.Provider value={{ state, updateOS, goToScreen }}>
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within OSProvider');
  }
  return context;
}
