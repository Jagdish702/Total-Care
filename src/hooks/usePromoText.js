import { useSiteConfig } from './useSiteConfig';

const FALLBACK = '3 months of TotalCare subscription FREE';

export function usePromoText() {
  const { config } = useSiteConfig('promo');
  return config?.subscription_promo_text ?? FALLBACK;
}
