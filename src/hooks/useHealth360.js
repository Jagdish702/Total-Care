import { useState, useEffect } from 'react';
import { health360Api } from '../services/api';

export function useHealth360() {
  const [frames, setFrames]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    health360Api.list()
      .then(data => setFrames(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { frames, loading };
}
