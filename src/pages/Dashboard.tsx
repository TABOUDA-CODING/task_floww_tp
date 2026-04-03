import { useState } from 'react';
import useProjects from '../hooks/useProjects';   // ✅
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import styles from './Dashboard.module.css';


export default function Dashboard() {
  // ✅ tout vient du hook
  const { projects, columns, loading, error, addProject, renameProject, deleteProject } = useProjects();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm,    setShowForm]    = useState(false);


  if (loading) return <div className={styles.loading}>Chargement...</div>;


  return (
    <div className={styles.layout}>
      <Header
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen(p => !p)}
      />
      <div className={styles.body}>
        <Sidebar
          projects={projects}
          isOpen={sidebarOpen}
          onRename={renameProject}
          onDelete={deleteProject}
        />
        <div className={styles.content}>
          <div className={styles.toolbar}>

            {error && (
              <p className={styles.error}>{error}</p>
            )}

            {!showForm ? (
              <button
                className={styles.addBtn}
                onClick={() => setShowForm(true)}
              >
                + Nouveau projet
              </button>
            ) : (
              <form
                className={styles.inlineForm}
                onSubmit={e => {
                  e.preventDefault();
                  const form  = e.currentTarget;
                  const name  = (form.elements.namedItem('name')  as HTMLInputElement).value.trim();
                  const color = (form.elements.namedItem('color') as HTMLInputElement).value;
                  if (!name) return;
                  addProject(name, color);
                  setShowForm(false);
                }}
              >
                <input name="name"  placeholder="Nom du projet" autoFocus />
                <input name="color" type="color" defaultValue="#1B8C3E" />
                <button type="submit">Créer</button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Annuler
                </button>
              </form>
            )}
          </div>
          <MainContent columns={columns} />
        </div>
      </div>
    </div>
  );
}