// src/components/Workspace/Panes/DisplayArea.jsx
import React from 'react';

export default function DisplayArea({ content, style }) {
  const fontSizes = { small: '0.8rem', medium: '1rem', large: '1.25rem' };

  return (
    <div
      style={{
        fontFamily: style.fontFamily,
        fontSize: fontSizes[style.fontSize] || fontSizes.medium,
        color: style.color,
        whiteSpace: 'pre-wrap' // Preserve whitespace and line breaks of the TextInputArea.jsx component
      }}
    >
      {content}
    </div>
  );
}
