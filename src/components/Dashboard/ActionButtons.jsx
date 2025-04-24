// src/components/Dashboard/ActionButtons.jsx
import React from 'react';

export default function ActionButtons({
  onDeleteChar,
  onDeleteWord,
  onDeleteAll,
  onUndo,
  onSave,
  onClose
}) {
  return (
    <div className="action-buttons">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onDeleteChar}
      >
        Delete Char
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onDeleteWord}
      >
        Delete Word
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onDeleteAll}
      >
        Delete All
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onUndo}
      >
        Undo
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onClose}
      >
        Close
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onSave}
      >
        Save
      </button>
    </div>
  );
}
