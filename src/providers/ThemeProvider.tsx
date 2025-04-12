
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme state
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if we're running in the browser
    if (typeof window !== 'undefined') {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme');
      
      // Check for system preference
      if (!savedTheme) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      return (savedTheme as Theme) || 'dark';
    }
    
    // Default to dark theme if not in browser
    return 'dark';
  });

  useEffect(() => {
    // Skip if not in browser
    if (typeof window === 'undefined') return;
    
    // Update the class on the html element
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    
    // Save the theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}
