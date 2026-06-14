import { useState, useEffect } from 'react';
import { productShowcaseBulletsApi } from '../services/api';

export function useProductShowcaseBullets() {
  const [bullets, setBullets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productShowcaseBulletsApi.list()
      .then(data => setBullets(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { bullets, loading };
}
