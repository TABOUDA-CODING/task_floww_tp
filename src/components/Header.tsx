import { useDispatch, useSelector } from 'react-redux';           // ✅
import type { RootState } from '../store';                        // ✅
import { logout } from '../features/auth/authSlice';              // ✅
import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  userName?: string;
  onMenuClick: () => void;
}

export default function Header({ title, onMenuClick }: HeaderProps) {
  const dispatch = useDispatch();                                  // ✅
  const user = useSelector((state: RootState) => state.auth.user); // ✅

  return (
    <header className={styles.header}>
      <button onClick={onMenuClick}>☰</button>
      <h1>{title}</h1>
      <div>
        <span>{user?.name}</span>
        <button onClick={() => dispatch(logout())}>              {/* ✅ */}
          Déconnexion
        </button>
      </div>
    </header>
  );
}