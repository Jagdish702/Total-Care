import { useState, useEffect } from 'react';
import { worksWithImagesApi } from '../services/api';

export function useWorksWithImages() {
  const [imageMap, setImageMap] = useState({});

  useEffect(() => {
    worksWithImagesApi.getAll()
      .then(data => {
        if (Array.isArray(data)) {
          const map = {};
          data.forEach(item => { map[item.productId] = item.imageUrl; });
          setImageMap(map);
        }
      })
      .catch(() => {});
  }, []);

  return imageMap;
}
