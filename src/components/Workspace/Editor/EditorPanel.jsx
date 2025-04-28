// src/components/Workspace/Editor/EditorPanel.jsx
import React, { useState } from 'react';
import TextInputArea from './TextInputArea';
import Keyboard from './Keyboard';
import ActionButtons from './ActionButtons';
import FontSelector from './Toolbar/FontSelector';
import ColorPicker from './Toolbar/ColorPicker';
import FontSizeSelector from './Toolbar/FontSizeSelector';
import LanguageSwitcher from './Toolbar/LanguageSwitcher';
import EmojiPicker from './Toolbar/EmojiPicker';
import SearchReplace from './Toolbar/SearchReplace';

export default function EditorPanel({ doc, onUpdate, onSave, onClose }) {
  const [editBuffer, setEditBuffer] = useState(doc.content);
  const [style, setStyle] = useState(doc.style);
  const [language, setLanguage] = useState('en');
  const [undoStack, setUndoStack] = useState([]);

  // Push the current editBuffer to the undo stack before applying a new one. For example: "Hello" -> "Helloo"
  const pushUndo = prev => setUndoStack(stack => [...stack, prev]);
  console.log("[EditorPanel] undoStack", undoStack);

  // Apply the new text to the editBuffer and update the document.
  const applyBuffer = newText => {
    pushUndo(editBuffer); // Save the current editBuffer to the undo stack before applying the new one.
    setEditBuffer(newText); // Update the editBuffer with the new text. For example: "Hello" -> "Helloo"
    onUpdate(doc.id, newText, style); // Call the onUpdate function to update the document in the parent component (handleUpdate in Dashboard.jsx).
  };

  // Apply the new style to the document and update the state.
  const applyStyle = delta => {
    // Merge the current style with the new style. For example: { fontFamily: 'Arial' } + { color: 'red' } = { fontFamily: 'Arial', color: 'red' }
    const updated = { ...style, ...delta };
    setStyle(updated); // Update the style state with the new style
    onUpdate(doc.id, editBuffer, updated); // Call the onUpdate function to update the document in the parent component (handleUpdate in Dashboard.jsx).
  };

  const deleteChar = () => {
    if (editBuffer) applyBuffer(editBuffer.slice(0, -1)); // Remove the last character from the editBuffer. For example: "Hello" -> "Hell"
  };

  const deleteWord = () => {
    const parts = editBuffer.trimEnd().split(' '); // Split the editBuffer into words. For example: "Hello World" -> ["Hello", "World"]
    parts.pop(); // Remove the last word from the array. For example: ["Hello", "World"] -> ["Hello"]
    applyBuffer(parts.join(' ') + ' '); // Join the remaining words back into a string and add a space at the end. For example: ["Hello"] -> "Hello "
  };

  const deleteAll = () => applyBuffer(''); // Clear the editBuffer by setting it to an empty string.

  const undo = () => {
    if (!undoStack.length) return; // If the undo stack is empty, do nothing.
    const last = undoStack[undoStack.length - 1]; // Get the last item from the undo stack. For example: ["Hello", "Helloo"] -> "Hello"
    setUndoStack(stack => stack.slice(0, -1)); // Remove the last item from the undo stack.
    setEditBuffer(last); // Update the editBuffer with the last item from the undo stack. For example: "Helloo" -> "Hello"
    onUpdate(doc.id, last, style); // Call the onUpdate function to update the document in the parent component (handleUpdate in Dashboard.jsx).
  };

  // Handle key presses from the keyboard component and update the editBuffer accordingly.
  const handleKeyPress = char => {
    applyBuffer(editBuffer + char);
  };

  return (
    <div className="editor-container">
      <div className="editor-controls">
        <div className="toolbar">
          <FontSelector
            currentFont={style.fontFamily} // Get the current font family from the style state. For example: 'Arial'
            onChange={f => applyStyle({ fontFamily: f })} // Update the font family in the style state when the user selects a new font.
          />
          <FontSizeSelector
            currentSize={style.fontSize} // Get the current font size from the style state. For example: medium
            onChange={size => applyStyle({ fontSize: size })} // Update the font size in the style state when the user selects a new size.
          />
          <ColorPicker
            currentColor={style.color} // Get the current color from the style state. For example: 'red'
            onChange={c => applyStyle({ color: c })} // Update the color in the style state when the user selects a new color.
          />
          <LanguageSwitcher
            currentLanguage={language} // Get the current language from the state. For example: 'en'
            onChange={setLanguage} // Update the language state when the user selects a new language.
          />
          <EmojiPicker
            onSelect={handleKeyPress} // Handle emoji selection and update the editBuffer accordingly.
          />
          <SearchReplace
            content={editBuffer} // Pass the current editBuffer to the SearchReplace component for searching and replacing text.
            onReplace={applyBuffer} // Handle text replacement and update the editBuffer accordingly.
          />
        </div>

        <TextInputArea
          value={editBuffer} // Write the current editBuffer to the TextInputArea component so we can edit it directly.
          onChange={applyBuffer} // Handle text input changes and update the editBuffer accordingly.
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
