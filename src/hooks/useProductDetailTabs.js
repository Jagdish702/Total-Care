import { useState, useEffect } from 'react';
import { productDetailTabsApi } from '../services/api';

export function useProductDetailTabs() {
  const [tabs, setTabs]       = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    productDetailTabsApi.list()
      .then(data => { if (!cancelled) setTabs(data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { tabs, loading };
}
