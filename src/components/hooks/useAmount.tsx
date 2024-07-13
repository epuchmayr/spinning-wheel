


import { useState, useCallback } from 'react';


export const useAmount = (defaultValue) => {
  const [amount, setAmount] = useState(defaultValue);

  const updateAmount = useCallback((newAmount) => {
    setAmount(newAmount);
  }, []);

  return [amount, updateAmount];
}