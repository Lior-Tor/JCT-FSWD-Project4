// src/components/Dashboard/Toolbar/EmojiPicker.jsx
import React, { useState } from 'react';

const emojiList = ['😀','😂','❤️','👍','🙏','🎉','😎','🔥'];

export default function EmojiPicker({ onSelect }) {
  const [choice, setChoice] = useState('');
  const handleChange = e => {
    const emoji = e.target.value;
    if (!emoji) return;
    setChoice('');
    onSelect(emoji);
  };

  return (
    <select value={choice} onChange={handleChange}>
      <option value="">Emoji</option>
      {emojiList.map((em, i) => (
        <option key={i} value={em}>
          {em}
        </option>
      ))}
    </select>
  );
}
