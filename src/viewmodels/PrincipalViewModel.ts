import { useState, useEffect } from 'react';

export function usePrincipalViewModel() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // lógica inicial
  }, []);

  return { state };
}