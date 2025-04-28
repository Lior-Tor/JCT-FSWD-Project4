// src/components/Workspace/Editor/Toolbar/SearchReplace.jsx
import React, { useState } from 'react';

export default function SearchReplace({ content, onReplace }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm === '') {
      alert('Please enter a search term');
      return;
    }
    const occurrences = content.split(searchTerm).length - 1;
    alert(`${occurrences} occurrence${occurrences !== 1 ? 's' : ''} found`);
  };

  const handleReplace = () => {
    if (searchTerm === '') {
      alert('Please enter a search term');
      return;
    }
    const updated = content.split(searchTerm).join(replaceTerm);
    onReplace(updated);
    setSearchTerm('');
    setReplaceTerm('');
  };

  return (
    <div className="toolbar-search-replace" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleSearch}
      >
        Search
      </button>

      <input
        type="text"
        placeholder="Replace"
        value={replaceTerm}
        onChange={e => setReplaceTerm(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleReplace}
      >
        Replace
      </button>
    </div>
  );
}
