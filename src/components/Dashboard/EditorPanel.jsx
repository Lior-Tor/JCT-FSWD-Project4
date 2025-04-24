// src/components/Dashboard/EditorPanel.jsx
import React, { useState } from 'react';
import TextInputArea from './TextInputArea';
import Keyboard from './Keyboard';
import ActionButtons from './ActionButtons';
import FontSelector from './Toolbar/FontSelector';
import ColorPicker from './Toolbar/ColorPicker';
import LanguageSwitcher from './Toolbar/LanguageSwitcher';
import EmojiPicker from './Toolbar/EmojiPicker';
import SearchReplace from './Toolbar/SearchReplace';

export default function EditorPanel({ doc, onUpdate, onSave, onClose }) {
  const [editBuffer, setEditBuffer] = useState(doc.content);
  const [style, setStyle] = useState(doc.style);
  const [language, setLanguage] = useState('en');
  const [undoStack, setUndoStack] = useState([]);

  const pushUndo = prev => setUndoStack(stack => [...stack, prev]);

  const applyBuffer = newText => {
    pushUndo(editBuffer);
    setEditBuffer(newText);
    onUpdate(doc.id, newText, style);
  };

  const applyStyle = delta => {
    const updated = { ...style, ...delta };
    setStyle(updated);
    onUpdate(doc.id, editBuffer, updated);
  };

  const deleteChar = () => {
    if (editBuffer) applyBuffer(editBuffer.slice(0, -1));
  };

  const deleteWord = () => {
    const parts = editBuffer.trimEnd().split(' ');
    parts.pop();
    applyBuffer(parts.join(' ') + ' ');
  };

  const deleteAll = () => applyBuffer('');

  const undo = () => {
    if (!undoStack.length) return;
    const last = undoStack[undoStack.length - 1];
    setUndoStack(stack => stack.slice(0, -1));
    setEditBuffer(last);
    onUpdate(doc.id, last, style);
  };

  const handleKeyPress = char => {
    applyBuffer(editBuffer + char);
  };

  return (
    <div className="editor-container">
      <div className="editor-controls">
        <div className="toolbar">
          <FontSelector
            currentFont={style.fontFamily}
            onChange={f => applyStyle({ fontFamily: f })}
          />
          <ColorPicker
            currentColor={style.color}
            onChange={c => applyStyle({ color: c })}
          />
          <LanguageSwitcher
            currentLanguage={language}
            onChange={setLanguage}
          />
          <EmojiPicker onSelect={handleKeyPress} />
          <SearchReplace
            content={editBuffer}
            onReplace={applyBuffer}
          />
        </div>

        <TextInputArea
          value={editBuffer}
          onChange={applyBuffer}
        />

        <ActionButtons
          onDeleteChar={deleteChar}
          onDeleteWord={deleteWord}
          onDeleteAll={deleteAll}
          onUndo={undo}
          onClose={onClose}
          onSave={onSave}
        />
      </div>

      <div className="keyboard-container">
        <Keyboard language={language} onKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}
