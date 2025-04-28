// src/components/Workspace/Editor/TextInputArea.jsx
import React from 'react';

export default function TextInputArea({ value, onChange }) {
  return (
    <textarea
      className="text-input-area"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
