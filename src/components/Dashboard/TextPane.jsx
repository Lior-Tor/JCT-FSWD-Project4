// src/components/Dashboard/TextPane.jsx
import React from 'react';
import DisplayArea from './DisplayArea';

export default function TextPane({ doc, focused, onFocus }) {
  return (
    <div
      className={`text-pane ${focused ? 'focused' : ''}`}
      onClick={onFocus}
    >
      <DisplayArea content={doc.content} style={doc.style} />
    </div>
  );
}
