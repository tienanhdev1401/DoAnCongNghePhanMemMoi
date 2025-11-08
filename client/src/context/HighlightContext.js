import React, { createContext, useState } from 'react';

export const HighlightContext = createContext();

export const HighlightProvider = ({ children }) => {
  const [highlightedText, setHighlightedText] = useState('');

  const handleSelection = () => {
    const selected = window.getSelection().toString();
    if (selected) {
      setHighlightedText(selected);
    }
  };

  return (
    <HighlightContext.Provider value={{ highlightedText, setHighlightedText, handleSelection }}>
      {children}
    </HighlightContext.Provider>
  );
};
