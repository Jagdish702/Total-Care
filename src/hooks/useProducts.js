import { useState, useEffect } from 'react';
import { productsApi } from '../services/api';

export function useProducts(options = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetch_ = options.type === 'bundle'
      ? productsApi.bundles
      : options.type === 'individual'
        ? productsApi.individual
        : () => productsApi.list(options.type ? { type: options.type } : {});

    fetch_()
      .then(data => { if (!cancelled) setProducts(data); })
      .catch(err  => { if (!cancelled) setError(err.message); })
      .finally(()  => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [options.type]);

  return { products, loading, error };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    let cancelled = false;
    setLoading(true);
    setError(null);
    setProduct(null);

    productsApi.getById(id)
      .then(data => { if (!cancelled) setProduct(data); })
      .catch(err  => { if (!cancelled) setError(err.message); })
      .finally(()  => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [id]);

  return { product, loading, error };
}
