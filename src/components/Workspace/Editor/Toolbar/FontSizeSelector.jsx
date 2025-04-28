import React from 'react';

const sizes = [
  { label: 'Small',  value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large',  value: 'large' },
];

export default function FontSizeSelector({ currentSize, onChange }) {
  return (
    <select
      value={currentSize}
      onChange={e => onChange(e.target.value)}
      title="Font size"
    >
      {sizes.map(s => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
