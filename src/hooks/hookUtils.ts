import { useCallback, useEffect } from 'react';
import { KEYS } from '../constants/constants';

export const useUtils = (executeFunction: () => void) => {
  const executeFunc = useCallback(() => {
    executeFunction()
  }, [executeFunction])

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === KEYS.ENTER) {
        executeFunc()
      }
    },
    [executeFunc]
  );

  useEffect(() => {
    document.addEventListener('keyup', handleKey);
    return () => {
      document.removeEventListener('keyup', handleKey);
    };
  }, [handleKey]);
}
