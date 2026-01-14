import { useState } from 'react';
import './AddExtensionModal.css';

function AddExtensionModal({ open, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    onAdd({ name: name.trim(), description: description.trim() });
    setName('');
    setDescription('');
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="add-title">
      <div className="modal-card">
        <h3 id="add-title" className="modal-title">Download more extensions</h3>
        <p className="modal-message">Add a new extension by providing a name and short description.</p>
        <form onSubmit={submit} className="add-form">
          <label>
            <span>Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., ImageInspector" />
          </label>
          <label>
            <span>Description</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief summary of what it does" rows={3} />
          </label>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-danger">Add Extension</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExtensionModal;
