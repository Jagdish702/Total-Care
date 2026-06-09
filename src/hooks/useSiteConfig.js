import { useState, useEffect } from 'react';
import { siteConfigApi } from '../services/api';

export function useSiteConfig(group) {
  const [config, setConfig]   = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;
    siteConfigApi.list(group)
      .then(data => { if (!cancelled) setConfig(data); })
      .catch(err  => { if (!cancelled) setError(err.message); })
      .finally(()  => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [group]);

  return { config, loading, error };
}
