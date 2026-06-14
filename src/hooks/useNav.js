import { useState, useEffect } from 'react';
import { navApi } from '../services/api';

export function useNav() {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    navApi.flat()
      .then(data => { if (!cancelled) setItems(data); })
      .catch(err  => { if (!cancelled) setError(err.message); })
      .finally(()  => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { items, loading, error };
}
