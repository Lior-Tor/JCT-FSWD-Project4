// src/components/Workspace/Dashboard.jsx
import React, { useState } from 'react';
import PaneGrid from './Panes/PaneGrid';
import EditorPanel from './Editor/EditorPanel';
import { listFilesByUser, loadFile, saveFile } from '../../utils/storage';

export default function Dashboard({ user, onLogout }) {
  // Initialize documents from localStorage
  const initialDocs = listFilesByUser(user.email).map(name => {
    const { content, style } = loadFile(user.email, name); // Load the content and style of each document from localStorage
    return {
      id:      name,
      content: content,
      style:   style || { fontFamily: 'Arial', fontSize: 'medium', color: 'black' }
    };
  });
  console.log("[Dashboard] initialDocs", initialDocs);

  const [documents, setDocuments] = useState(initialDocs); // Store documents in state
  const [focusedId, setFocusedId] = useState(initialDocs[0]?.id || null); // Set the first document as focused if available
  console.log("[Dashboard] documents", documents);
  console.log("[Dashboard] focusedId", focusedId);

  // Function to handle updates to the document content and style.
  // This function is passed to the EditorPanel component to update the document state in Dashboard when changes are made in the editor.
  const handleUpdate = (id, newContent, newStyle) => {
    setDocuments(docs =>
      docs.map(d =>
        d.id === id ? { ...d, content: newContent, style: newStyle } : d
      )
    );
  };

  // Function to save the document content to localStorage
  // This function is passed to the EditorPanel component to save the document when the user clicks the save button.
  const handleSave = id => {
    const doc = documents.find(d => d.id === id); // Find the document by ID. For example: lior1
    if (doc) {
      saveFile(user.email, id, doc.content, doc.style); // Save the document content and style to localStorage
      alert(`Saved "${id}.txt"`);
    }
  };

  // Function to close a document, prompting to save if there are unsaved changes
  // This function is passed to the EditorPanel component to close the document when the user clicks the close button.
  const handleClose = id => {
    if (window.confirm('Save before closing?')) {
      handleSave(id);
    }
    setDocuments(docs => {
      const remaining = docs.filter(d => d.id !== id); // Filter out the closed document
      setFocusedId(remaining[0]?.id || null); // Set the first document as focused if available
      return remaining;
    });
  };

  // Function to create a new document, prompting for a name and checking for duplicates
  // This function is called when the user clicks the "New Document" button.
  const createNewDoc = () => {
    const name = prompt('Enter a name for your new document (without .txt):');
    
    if (!name) return; // If no name is provided, exit the function

    // Check if the document already exists. If it does, just focus it
    if (documents.some(d => d.id === name)) {
      setFocusedId(name); // Update with useState to focus the existing document
      return;
    }

    // If the document doesn't exist or is not already open, create a new one
    saveFile(user.email, name, ''); // Save an empty file to localStorage

    // Add the new document to the state
    setDocuments(docs => [
      ...docs, // Spread the existing documents
      { id: name, content: '', style: { fontFamily: 'Arial', fontSize: 'medium', color: 'black' } } // Add the new document with default content and style
    ]);
    setFocusedId(name); // Set the new document as focused
  };

  // Function to open an existing document, showing a list first
  // This function is called when the user clicks the "Open Document" button.
  const openDocument = () => {
    // Fetch all filenames for this user
    const availableFiles = listFilesByUser(user.email);

    // If none exist, inform the user
    if (availableFiles.length === 0) {
      alert('No documents found. Please create a new one first.');
      return;
    }

    // Prompt the user, showing the list of files
    const name = prompt(
      `Available documents:\n${availableFiles.join('\n')}\n\nEnter the name to open (without .txt):`
    );
    if (!name) return; // Cancelled

    // If already open, just focus it
    if (documents.some(d => d.id === name)) {
      setFocusedId(name); // Update with useState to focus the existing document
      return;
    }

    // If the document name doesn't exist, inform the user
    if (!availableFiles.includes(name)) {
      alert(`No document named "${name}" found.`);
      return;
    }

    const { content, style } = loadFile(user.email, name);
    setDocuments(docs => [
      ...docs,
      {
        id:      name,
        content: content,
        style:   style || { fontFamily:'Arial',fontSize:'medium',color:'black' }
      }
    ]);
    setFocusedId(name);
  };  

  const focusedDoc = documents.find(d => d.id === focusedId); // Find the currently focused document
  console.log("[Dashboard] focusedDoc", focusedDoc);

  return (
    <div className="container">
      <div className="dashboard-header">
        <button className="btn btn-primary" onClick={createNewDoc}>
          ➕ New Document
        </button>
        <button className="btn btn-secondary" onClick={openDocument}>
          📂 Open Document
        </button>
        <button className="btn btn-secondary" onClick={onLogout}>
          ❌ Logout
        </button>
      </div>

      {documents.length === 0 ? (
        <p>No documents yet. Use “New” or “Open” to get started.</p>
      ) : (
        <>
          <PaneGrid
            documents={documents} // Pass the documents to PaneGrid
            focusedId={focusedId} // Pass the focused document ID to PaneGrid
            onFocus={setFocusedId} // Pass the function of setFocusedId to PaneGrid
          />
          {focusedDoc && (
            <EditorPanel
              key={focusedDoc.id} // Use the document ID as the key for the EditorPanel
              doc={focusedDoc} // Pass the focused document to the EditorPanel
              onUpdate={handleUpdate} // Pass the update function to the EditorPanel in order to update the document state in Dashboard when changes are made in the editor
              onSave={() => handleSave(focusedDoc.id)} // Save the document when the save button is clicked
              onClose={() => handleClose(focusedDoc.id)} // Close the document when the close button is clicked
            />
          )}
        </>
      )}
    </div>
  );
}
