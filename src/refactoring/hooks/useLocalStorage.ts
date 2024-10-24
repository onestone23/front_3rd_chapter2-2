import { useState } from 'react';

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [storageValue, setStorageValue] = useState<T>(() => {
    return '' as T;
  });

  return {};
};
