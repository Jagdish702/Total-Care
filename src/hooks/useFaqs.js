import { useState, useEffect } from 'react';
import { faqsApi } from '../services/api';

export function useFaqs(params = {}) {
  const [faqs, setFaqs]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const key = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    faqsApi.list(params)
      .then(data => { if (!cancelled) setFaqs(data); })
      .catch(err  => { if (!cancelled) setError(err.message); })
      .finally(()  => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [key]);

  return { faqs, loading, error };
}

export function useFaqCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    let cancelled = false;
    faqsApi.categories()
      .then(data => { if (!cancelled) setCategories(data); })
      .catch(err  => { if (!cancelled) setError(err.message); })
      .finally(()  => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { categories, loading, error };
}
