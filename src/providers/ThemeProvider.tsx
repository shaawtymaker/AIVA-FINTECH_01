
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme state with a default value
  const [theme, setTheme] = useState<Theme>('dark');
  
  // Load the theme from localStorage on mount
  useEffect(() => {
    try {
      // Check if we're running in the browser
      if (typeof window !== 'undefined' && window.localStorage) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        
        // Check for system preference
        if (!savedTheme) {
          const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          setTheme(isDarkMode ? 'dark' : 'light');
        } else {
          setTheme((savedTheme as Theme) || 'dark');
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  // Update the HTML class and localStorage when theme changes
  useEffect(() => {
    try {
      // Skip if not in browser
      if (typeof window === 'undefined' || !window.document) return;
      
      // Update the class on the html element
      const root = window.document.documentElement;
      root.classList.remove('dark', 'light');
      root.classList.add(theme);
      
      // Save the theme preference
      if (window.localStorage) {
        localStorage.setItem('theme', theme);
      }
    } catch (error) {
      console.error('Error updating theme:', error);
    }
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
