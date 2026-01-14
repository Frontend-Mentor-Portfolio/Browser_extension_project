import './UndoToast.css';

function UndoToast({ open, text, actionLabel = 'Undo', onAction, onClose }) {
  if (!open) return null;
  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className="toast">
        <span className="toast-text">{text}</span>
        <div className="toast-actions">
          <button className="toast-btn" onClick={onAction}>{actionLabel}</button>
          <button className="toast-close" aria-label="Close" onClick={onClose}>×</button>
        </div>
      </div>
    </div>
  );
}

export default UndoToast;
