import { useState } from 'react';

export const useLocalStorage = <T>(key: string, defaultValue?: T): [T | undefined, (value: T) => void] => {
  const [storageValue, setStorageValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
      throw '값 없음';
    } catch (err) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStorageValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  };

  return [storageValue, setValue];
};
