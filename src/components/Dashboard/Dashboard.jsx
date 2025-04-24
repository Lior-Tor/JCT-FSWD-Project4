// src/components/Dashboard/Dashboard.jsx
import React, { useState } from 'react';
import PaneGrid from './PaneGrid';
import EditorPanel from './EditorPanel';
import { listFilesByUser, loadFile, saveFile } from '../../utils/storage';

export default function Dashboard({ user, onLogout }) {
  // initialize documents from localStorage
  const initialDocs = listFilesByUser(user.email).map(name => ({
    id:      name,
    content: loadFile(user.email, name),
    style:   { fontFamily: 'Arial', fontSize: 'medium', color: 'black' }
  }));
  const [documents, setDocuments] = useState(initialDocs);
  const [focusedId, setFocusedId] = useState(initialDocs[0]?.id || null);

  const handleUpdate = (id, newContent, newStyle) => {
    setDocuments(docs =>
      docs.map(d =>
        d.id === id ? { ...d, content: newContent, style: newStyle } : d
      )
    );
  };

  const handleSave = id => {
    const doc = documents.find(d => d.id === id);
    if (doc) {
      saveFile(user.email, id, doc.content);
      alert(`Saved "${id}.txt"`);
    }
  };

  const handleClose = id => {
    if (window.confirm('Save before closing?')) {
      handleSave(id);
    }
    setDocuments(docs => {
      const remaining = docs.filter(d => d.id !== id);
      setFocusedId(remaining[0]?.id || null);
      return remaining;
    });
  };

  const createNewDoc = () => {
    const name = prompt('Enter a name for your new document (without .txt):');
    if (!name) return;
    if (documents.some(d => d.id === name)) {
      setFocusedId(name);
      return;
    }
    saveFile(user.email, name, '');
    setDocuments(docs => [
      ...docs,
      { id: name, content: '', style: { fontFamily: 'Arial', fontSize: 'medium', color: 'black' } }
    ]);
    setFocusedId(name);
  };

  const openDocument = () => {
    const name = prompt('Enter the name of the document to open (without .txt):');
    if (!name) return;
    if (documents.some(d => d.id === name)) {
      setFocusedId(name);
      return;
    }
    const available = listFilesByUser(user.email);
    if (!available.includes(name)) {
      alert(`No document named "${name}" found.`);
      return;
    }
    setDocuments(docs => [
      ...docs,
      { id: name, content: loadFile(user.email, name), style: { fontFamily: 'Arial', fontSize: 'medium', color: 'black' } }
    ]);
    setFocusedId(name);
  };

  const focusedDoc = documents.find(d => d.id === focusedId);

  return (
    <div className="container">
      <div className="dashboard-header">
        <button className="btn btn-primary" onClick={createNewDoc}>
          + New Document
        </button>
        <button className="btn btn-secondary" onClick={openDocument}>
          Open Document
        </button>
        <button className="btn btn-secondary" onClick={onLogout}>
          Logout
        </button>
      </div>

      {documents.length === 0 ? (
        <p>No documents yet. Use “New” or “Open” to get started.</p>
      ) : (
        <>
          <PaneGrid
            documents={documents}
            focusedId={focusedId}
            onFocus={setFocusedId}
          />
          {focusedDoc && (
            <EditorPanel
              key={focusedDoc.id}
              doc={focusedDoc}
              onUpdate={handleUpdate}
              onSave={() => handleSave(focusedDoc.id)}
              onClose={() => handleClose(focusedDoc.id)}
            />
          )}
        </>
      )}
    </div>
  );
}
