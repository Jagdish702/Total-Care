import { useState, useEffect } from 'react';
import { healthConcernsApi } from '../services/api';

export function useHealthConcerns() {
  const [concerns, setConcerns] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    let cancelled = false;
    healthConcernsApi.list()
      .then(data => { if (!cancelled) setConcerns(data); })
      .catch(err  => { if (!cancelled) setError(err.message); })
      .finally(()  => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { concerns, loading, error };
}
