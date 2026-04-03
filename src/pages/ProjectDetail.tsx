import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';           // ✅
import type { RootState, AppDispatch } from '../store';           // ✅
import { logout } from '../features/auth/authSlice';              // ✅
import api from '../api/axios';
import Header from '../components/Header';
import styles from './ProjectDetail.module.css';


interface Project { id: string; name: string; color: string; }


export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();                    // ✅
  const user = useSelector((state: RootState) => state.auth.user); // ✅

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    api.get(`/projects/${id}`)
      .then(res => setProject(res.data))
      .catch(() => navigate('/dashboard'))
      .finally(() => setLoading(false));
  }, [id]);


  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (!project) return null;


  return (
    <div className={styles.layout}>
      <Header
        title="TaskFlow"
        onMenuClick={() => navigate('/dashboard')}
        // ✅ userName et onLogout supprimés — Header les gère seul via Redux
      />
      <main className={styles.main}>
        <div className={styles.header}>
          <span
            className={styles.dot}
            style={{ background: project.color }}
          />
          <h1>{project.name}</h1>
        </div>
        <p className={styles.info}>Projet ID : {project.id}</p>
      </main>
    </div>
  );}