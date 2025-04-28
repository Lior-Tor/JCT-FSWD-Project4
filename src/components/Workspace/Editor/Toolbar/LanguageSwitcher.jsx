// src/components/Workspace/Editor/Toolbar/LanguageSwitcher.jsx
import React from 'react';

const langs = [
  { label: 'English', value: 'en' },
  { label: 'Hebrew', value: 'he' }
];

export default function LanguageSwitcher({ currentLanguage, onChange }) {
  return (
    <select
      value={currentLanguage}
      onChange={e => onChange(e.target.value)}
    >
      {langs.map(l => (
        <option key={l.value} value={l.value}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
