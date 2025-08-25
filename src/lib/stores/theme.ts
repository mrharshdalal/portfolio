import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Theme type definition
export type Theme = 'light' | 'dark';

// Initialize theme from localStorage or default to 'light'
const defaultTheme: Theme = 'light';
const initialTheme = browser 
  ? (localStorage.getItem('theme') as Theme) || defaultTheme
  : defaultTheme;

// Create the theme store
export const theme = writable<Theme>(initialTheme);

// Theme management functions
export const toggleTheme = () => {
  theme.update(currentTheme => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    if (browser) {
      localStorage.setItem('theme', newTheme);
      updateDocumentTheme(newTheme);
    }
    return newTheme;
  });
};

export const setTheme = (newTheme: Theme) => {
  theme.set(newTheme);
  if (browser) {
    localStorage.setItem('theme', newTheme);
    updateDocumentTheme(newTheme);
  }
};

// Update document class for theme
const updateDocumentTheme = (currentTheme: Theme) => {
  if (browser) {
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};

// Initialize theme on store creation
if (browser) {
  theme.subscribe(updateDocumentTheme);
} 