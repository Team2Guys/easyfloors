'use client';
import { useEffect, useState } from 'react';

function useLocalStorage(key: string, initialValue: any): any {
  // State to store our value
  // Pass  initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // browser code
      const item = { color: 'light' };
      // Parse stored json or if none return initialValue
      return item;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // useEffect to update local storage when the state changes
  useEffect(() => {
    try {
      // Allow value to be a function so we have same API as useState
      // const valueToStore =
      //   typeof storedValue === "function"
      //     ? storedValue(storedValue)
      //     : storedValue;
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
