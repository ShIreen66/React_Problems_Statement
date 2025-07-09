import { useAuthContext } from '../context/AuthContext';

// This hook simply re-exports useAuthContext for consistency
const useAuth = () => {
  return useAuthContext();
};

export default useAuth;
