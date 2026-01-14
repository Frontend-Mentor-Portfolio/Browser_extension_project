import { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterButtons from './components/FilterButtons';
import ExtensionCard from './components/ExtensionCard';
import ConfirmModal from './components/ConfirmModal';
import UndoToast from './components/UndoToast';
import AddExtensionModal from './components/AddExtensionModal';
import './App.css';

const initialExtensions = [
  {
    id: 1,
    name: 'DevLens',
    description: 'Quickly inspect page layouts and visualize element boundaries.',
    active: true,
    deleted: false,
  },
  {
    id: 2,
    name: 'StyleSpy',
    description: 'Instantly analyze and copy CSS from any webpage element.',
    active: true,
    deleted: false,
  },
  {
    id: 3,
    name: 'SpeedBoost',
    description: 'Optimizes browser resource usage to accelerate page loading.',
    active: false,
    deleted: false,
  },
  {
    id: 4,
    name: 'JSONWizard',
    description: 'Formats, validates, and prettifies JSON responses in-browser.',
    active: true,
    deleted: false,
  },
  {
    id: 5,
    name: 'TabMaster Pro',
    description: 'Organizes browser tabs into groups and sessions.',
    active: true,
    deleted: false,
  },
  {
    id: 6,
    name: 'ViewportBuddy',
    description: 'Simulates various screen resolutions directly within the browser.',
    active: false,
    deleted: false,
  },
  {
    id: 7,
    name: 'Markup Notes',
    description: 'Enables annotation and notes directly onto webpages for collaborative debugging.',
    active: true,
    deleted: false,
  },
  {
    id: 8,
    name: 'GridGuides',
    description: 'Overlay customizable grids and alignment guides on any webpage.',
    active: false,
    deleted: false,
  },
  {
    id: 9,
    name: 'Palette Picker',
    description: 'Instantly extracts color palettes from any webpage.',
    active: true,
    deleted: false,
  },
  {
    id: 10,
    name: 'LinkChecker',
    description: 'Scans and highlights broken links on any page.',
    active: true,
    deleted: false,
  },
  {
    id: 11,
    name: 'DOM Snapshot',
    description: 'Capture and export DOM structures quickly.',
    active: false,
    deleted: false,
  },
  {
    id: 12,
    name: 'ConsolePlus',
    description: 'Enhanced developer console with advanced filtering and logging.',
    active: true,
    deleted: false,
  },
];

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });
  const [filter, setFilter] = useState('All');
  const [extensions, setExtensions] = useState(() => {
    const savedExtensions = localStorage.getItem('extensions');
    return savedExtensions ? JSON.parse(savedExtensions) : initialExtensions;
  });
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [lastRemoved, setLastRemoved] = useState(null);
  const [lastRemovedIndex, setLastRemovedIndex] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('extensions', JSON.stringify(extensions));
  }, [extensions]);

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleToggle = (id) => {
    setExtensions(prevExtensions =>
      prevExtensions.map(ext =>
        ext.id === id && !ext.deleted ? { ...ext, active: !ext.active } : ext
      )
    );
  };

  const requestRemove = (id) => {
    setPendingDeleteId(id);
  };

  const confirmRemove = () => {
    if (pendingDeleteId == null) return;
    const index = extensions.findIndex(ext => ext.id === pendingDeleteId);
    const removed = index !== -1 ? extensions[index] : null;
    if (removed) {
      setLastRemoved(removed);
      setLastRemovedIndex(index);
    }
    setExtensions(prevExtensions => prevExtensions.map(ext => ext.id === pendingDeleteId ? { ...ext, deleted: true } : ext));
    setPendingDeleteId(null);
  };

  const cancelRemove = () => setPendingDeleteId(null);

  const undoRemove = () => {
    if (!lastRemoved) return;
    setExtensions(prev => {
      return prev.map((ext, idx) =>
        ext.id === lastRemoved.id ? { ...ext, deleted: false } : ext
      );
    });
    setLastRemoved(null);
    setLastRemovedIndex(null);
  };

  const closeToast = () => {
    setLastRemoved(null);
    setLastRemovedIndex(null);
  };

  const filteredExtensions = extensions.filter(ext => {
    if (filter === 'All') return true;
    if (filter === 'Active') return ext.active && !ext.deleted;
    if (filter === 'Inactive') return !ext.active && !ext.deleted;
    if (filter === 'Deleted') return ext.deleted;
    return true;
  });

  const anyDeleted = extensions.some(e => e.deleted);
  // If Deleted tab is hidden while selected, reset to All
  useEffect(() => {
    if (!anyDeleted && filter === 'Deleted') {
      setFilter('All');
    }
  }, [anyDeleted, filter]);

  return (
    <div className="app">
      <Header theme={theme} onThemeToggle={handleThemeToggle} />
      <main className="main-content">
        <div className="content-header">
          <h2 className="main-title">Extensions List</h2>
          <FilterButtons activeFilter={filter} onFilterChange={handleFilterChange} showDeleted={anyDeleted} />
        </div>
        <div className="extensions-grid">
          {filteredExtensions.map(extension => (
            <ExtensionCard
              key={extension.id}
              extension={extension}
              onToggle={handleToggle}
              onRemove={requestRemove}
              onRestore={(id) => setExtensions(prev => prev.map(ext => ext.id === id ? { ...ext, deleted: false } : ext))}
            />
          ))}
        </div>
        <div style={{ marginTop: '1rem' }}>
          <button className="filter-button" onClick={() => setAddOpen(true)}>Download more extensions</button>
        </div>
      </main>
      <ConfirmModal
        open={pendingDeleteId !== null}
        title="Remove extension?"
        message="This action cannot be undone. The extension will be removed from your list."
        confirmLabel="Remove"
        cancelLabel="Cancel"
        onConfirm={confirmRemove}
        onCancel={cancelRemove}
      />
      <UndoToast
        open={!!lastRemoved}
        text={`${lastRemoved ? lastRemoved.name : 'Extension'} removed.`}
        actionLabel="Undo"
        onAction={undoRemove}
        onClose={closeToast}
      />
      <AddExtensionModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={(payload) => {
          setExtensions(prev => {
            const nextId = prev.length ? Math.max(...prev.map(e => e.id)) + 1 : 1;
            return [...prev, { id: nextId, name: payload.name, description: payload.description, active: true, deleted: false }];
          });
          setAddOpen(false);
        }}
      />
    </div>
  );
}

export default App;
