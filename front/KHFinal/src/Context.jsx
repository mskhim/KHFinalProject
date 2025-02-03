import React from 'react';
import { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Context = createContext();
export const Provider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Context.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </Context.Provider>
  );
};
