// src/components/Workspace/Editor/Toolbar/FontSelector.jsx
import React from 'react';

const fonts = [
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Courier New', value: '"Courier New", monospace' },
  { label: 'Tahoma', value: 'Tahoma, sans-serif' },
  { label: 'Times New Roman', value: '"Times New Roman", serif' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
  { label: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
  { label: 'Impact', value: 'Impact, sans-serif' },
  { label: 'Comic Sans MS', value: '"Comic Sans MS", cursive' },
  { label: 'Lucida Console', value: '"Lucida Console", monospace' },
  { label: 'Palatino Linotype', value: '"Palatino Linotype", serif' }
];

export default function FontSelector({ currentFont, onChange }) {
  return (
    <select
      value={currentFont}
      onChange={e => onChange(e.target.value)}
    >
      {fonts.map(f => (
        <option key={f.value} value={f.value}>
          {f.label}
        </option>
      ))}
    </select>
  );
}
