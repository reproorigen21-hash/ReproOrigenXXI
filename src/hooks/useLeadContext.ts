import { useOS } from '../context/OSContext';

export function useLeadContext() {
  const { state } = useOS();

  const hiddenContext = {
    activeModule: state.activeModule ?? 'none',
    publicRoute: state.publicRoute,
    userType: state.userType || 'unknown',
    interest: state.interest || 'none',
    origin: state.origin || 'platform'
  };

  return { hiddenContext };
}
