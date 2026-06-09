import { useState, useEffect } from 'react';
import { subscriptionPlansApi } from '../services/api';

export function useSubscriptionPlans() {
  const [plans, setPlans]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;
    subscriptionPlansApi.list()
      .then(data => { if (!cancelled) setPlans(data); })
      .catch(err  => { if (!cancelled) setError(err.message); })
      .finally(()  => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { plans, loading, error };
}
