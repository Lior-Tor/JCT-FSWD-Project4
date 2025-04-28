// src/components/Workspace/Editor/Toolbar/ColorPicker.jsx
import React from 'react';

const colors = [
  { label: 'Black', value: 'black' },
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Purple', value: 'purple' },
  { label: 'Pink', value: 'pink' },
  { label: 'Orange', value: 'orange' },
  { label: 'Brown', value: 'brown' },
  { label: 'Gray', value: 'gray' },
  { label: 'White', value: 'white' }
];

export default function ColorPicker({ currentColor, onChange }) {
  return (
    <select
      value={currentColor}
      onChange={e => onChange(e.target.value)} // Call the onChange function which executes applyStyle from EditorPanel.jsx
    >
      {colors.map(c => (
        <option key={c.value} value={c.value}>
          {c.label}
        </option>
      ))}
    </select>
  );
}
