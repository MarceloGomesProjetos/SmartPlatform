// src/context/ThemeContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [dark, setDark] = useState(true);

  const toggle = () => {
    setDark(!dark);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <div className={dark ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);