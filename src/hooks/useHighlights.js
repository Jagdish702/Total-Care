import { useState, useEffect } from 'react';
import { highlightsApi } from '../services/api';

export function useHighlights() {
  const [cards, setCards]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    highlightsApi.list()
      .then(data => setCards(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { cards, loading };
}
