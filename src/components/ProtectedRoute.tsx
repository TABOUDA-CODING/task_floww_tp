import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';                        // ✅
import type { RootState } from '../store.ts';                     // ✅

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.user); // ✅

  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}