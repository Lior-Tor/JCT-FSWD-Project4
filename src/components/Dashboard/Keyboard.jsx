// src/components/Dashboard/Keyboard.jsx
import React, { useState } from 'react';

const layouts = {
  en: {
    row1: ['1','2','3','4','5','6','7','8','9','0'],
    row2: ['q','w','e','r','t','y','u','i','o','p','[',']'],
    row3: ['a','s','d','f','g','h','j','k','l',';',"'" ],
    row4: ['z','x','c','v','b','n','m',',','.','/']
  },
  he: {
    row1: ['1','2','3','4','5','6','7','8','9','0'],
    row2: ['ק','ר','א','ט','ו','ן','ם','פ','[',']'],
    row3: ['ש','ד','ג','כ','ע','י','ח','ל','ך',';',"'" ],
    row4: ['ז','ס','ב','ה','נ','מ','צ','ת','ץ',',','.','/']
  },
  emoji: {
    row1: ['😀','😂','❤️','👍','🙏','🎉','😎','🔥']
  }
};

// punctuation-to-shift map shared across languages
const shiftMap = {
  '[': '{',
  ']': '}',
  ';': ':',
  "'": '"',
  ',': '<',
  '.': '>',
  '/': '?'
};

export default function Keyboard({ language = 'en', onKeyPress }) {
  const [capsLock, setCapsLock] = useState(false);
  const [shift, setShift] = useState(false);

  const handleKey = key => {
    let char = key;

    // letters: only English has casing
    if (/^[a-z]$/i.test(key)) {
      const upper = (capsLock && !shift) || (!capsLock && shift);
      char = upper ? key.toUpperCase() : key.toLowerCase();
    }
    // punctuation: apply shift mapping if active
    else if (shift && shiftMap[key]) {
      char = shiftMap[key];
    }

    onKeyPress(char);
    if (shift) setShift(false);
  };

  // Emoji layout
  if (language === 'emoji') {
    return (
      <div className="keyboard">
        {layouts.emoji.row1.map((k,i) => (
          <button key={i} onClick={() => onKeyPress(k)}>
            {k}
          </button>
        ))}
      </div>
    );
  }

  // Hebrew & English share row logic
  const { row1, row2, row3, row4 } = layouts[language] || layouts.en;
  const isEnglish = language === 'en';

  return (
    <div className={`keyboard ${isEnglish ? 'en' : 'he'}`}>
      {/* Row 1 */}
      <div className="keyboard-row">
        {row1.map((k,i) => (
          <button key={i} onClick={() => handleKey(k)}>{k}</button>
        ))}
      </div>
      {/* Row 2 */}
      <div className="keyboard-row">
        {row2.map((k,i) => (
          <button key={i} onClick={() => handleKey(k)}>
            {isEnglish && /^[a-z]$/i.test(k) && (capsLock||shift)
              ? k.toUpperCase()
              : k}
          </button>
        ))}
      </div>
      {/* Row 3 */}
      <div className="keyboard-row">
        {isEnglish && (
          <button onClick={() => setCapsLock(!capsLock)}>
            Caps{capsLock ? ' On' : ''}
          </button>
        )}
        {row3.map((k,i) => (
          <button key={i} onClick={() => handleKey(k)}>
            {isEnglish && /^[a-z]$/i.test(k) && (capsLock||shift)
              ? k.toUpperCase()
              : k}
          </button>
        ))}
      </div>
      {/* Row 4 */}
      <div className="keyboard-row">
        <button onClick={() => setShift(!shift)}>Shift</button>
        {row4.map((k,i) => (
          <button key={i} onClick={() => handleKey(k)}>
            {isEnglish && /^[a-z]$/i.test(k) && (capsLock||shift)
              ? k.toUpperCase()
              : k}
          </button>
        ))}
        <button onClick={() => setShift(!shift)}>Shift</button>
      </div>
      {/* Space */}
      <div className="keyboard-row">
        <button className="space-key" onClick={() => handleKey(' ')}>
          Space
        </button>
      </div>
    </div>
  );
}
