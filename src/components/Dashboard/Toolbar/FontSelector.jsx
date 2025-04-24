// src/components/Dashboard/Toolbar/FontSelector.jsx
import React from 'react';

const fonts = [
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Courier New', value: '"Courier New", monospace' },
  { label: 'Tahoma', value: 'Tahoma, sans-serif' }
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
