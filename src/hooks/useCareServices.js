import { useState, useEffect } from 'react';
import { careServicesApi } from '../services/api';

export function useCareServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    let cancelled = false;
    careServicesApi.list()
      .then(data => { if (!cancelled) setServices(data); })
      .catch(err  => { if (!cancelled) setError(err.message); })
      .finally(()  => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { services, loading, error };
}
