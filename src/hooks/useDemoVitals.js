import { useState, useEffect } from 'react';
import { demoVitalsApi } from '../services/api';

export function useDemoVitals() {
  const [vitals, setVitals]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    demoVitalsApi.list()
      .then(data => { if (!cancelled) setVitals(data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { vitals, loading };
}
