// src/components/Dashboard/PaneGrid.jsx
import React from 'react';
import TextPane from './TextPane';

export default function PaneGrid({ documents, focusedId, onFocus }) {
  return (
    <div className="pane-grid">
      {documents.map(doc => (
        <TextPane
          key={doc.id}
          doc={doc}
          focused={doc.id === focusedId}
          onFocus={() => onFocus(doc.id)}
        />
      ))}
    </div>
  );
}
