import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { DARK_MODE_KEY } from '../constants';

export function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage(DARK_MODE_KEY, true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return { darkMode, toggleDarkMode };
}
