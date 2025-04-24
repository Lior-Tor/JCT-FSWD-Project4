// src/components/Dashboard/Toolbar/ColorPicker.jsx
import React from 'react';

const colors = [
  { label: 'Black', value: 'black' },
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' }
];

export default function ColorPicker({ currentColor, onChange }) {
  return (
    <select
      value={currentColor}
      onChange={e => onChange(e.target.value)}
    >
      {colors.map(c => (
        <option key={c.value} value={c.value}>
          {c.label}
        </option>
      ))}
    </select>
  );
}
