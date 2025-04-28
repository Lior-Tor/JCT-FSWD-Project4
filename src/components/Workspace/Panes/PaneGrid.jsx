// src/components/Workspace/Panes/PaneGrid.jsx
import React from 'react';
import TextPane from './TextPane';

// PaneGrid component to display a grid of text panes
// It takes in documents (loaded from localStorage), the currently focused document ID, and a function to handle focus changes
export default function PaneGrid({ documents, focusedId, onFocus }) {
  return (
    <div className="pane-grid">
      {documents.map(doc => (
        <TextPane
          key={doc.id} // Use the document ID as the key for each pane. For example: lior1
          doc={doc} // Pass the document object to the TextPane component. For example: { id: 'lior1', content: 'Lior1' }
          focused={doc.id === focusedId} // Check if the document is currently focused. Returns true or false.
          onFocus={() => onFocus(doc.id)} // Call the onFocus function (setFocusedId) with the document ID when the pane is focused
        />
      ))}
    </div>
  );
}
