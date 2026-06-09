import { createContext, useContext, useState, useCallback, useRef } from 'react';
import subscriptionImg from '../assets/cart/subscription-card.png';

const QUARTERLY_SUB = {
  label: 'Subscription',
  name: 'Quarterly',
  type: 'subscription',
  price: 0,
  originalPrice: 447,
  image: subscriptionImg,
  priceLabel: 'Start at ₹297 for 3 months (₹99/month), then continue at ₹99/month.',
  description: 'Complete care with priority support, faster consultations, and continuous health tracking',
};

const CartContext = createContext(null);

/**
 * item shape passed to showToast / addToCart:
 *  {
 *    image         : string   — image src
 *    label         : string   — "Product" | "Subscription"
 *    name          : string   — display name
 *    type          : string   — "product" | "subscription"
 *    price         : number   — discounted price (optional)
 *    originalPrice : number   — MRP (optional)
 *    description   : string   — short description (optional)
 *    priceLabel    : string   — e.g. "₹297" for subscription (optional)
 *    originalLabel : string   — e.g. "₹447" (optional)
 *  }
 */

let _idCounter = 1;

export function CartProvider({ children }) {
  const [toast,       setToast]      = useState(null);
  const [cartItems,   setCartItems]  = useState([]);
  const [isCartOpen,  setIsCartOpen] = useState(false);
  const timerRef = useRef(null);

  /* ── derived count ── */
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  /* ── toast notification (also adds to cart) ── */
  const showToast = useCallback((item) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(item);
    timerRef.current = setTimeout(() => setToast(null), 5000);

    // add to cart items (or increment qty)
    setCartItems(prev => {
      const idx = prev.findIndex(
        i => i.name === item.name && i.type === item.type
      );
      let next;
      if (idx >= 0) {
        next = prev.map((i, n) =>
          n === idx ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        next = [...prev, { ...item, qty: 1, id: _idCounter++ }];
      }

      // auto-add quarterly subscription when first product is added
      if (item.type === 'product') {
        const hasSub = next.some(i => i.type === 'subscription');
        if (!hasSub) {
          next = [...next, { ...QUARTERLY_SUB, qty: 1, id: _idCounter++ }];
        }
      }

      return next;
    });
  }, []);

  const hideToast = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(null);
  }, []);

  /* ── cart item management ── */
  const updateQty = useCallback((id, delta) => {
    setCartItems(prev => {
      const next = prev
        .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0);
      const hasProducts = next.some(i => i.type === 'product');
      if (!hasProducts) return next.filter(i => i.type !== 'subscription');
      return next;
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems(prev => {
      const next = prev.filter(i => i.id !== id);
      const hasProducts = next.some(i => i.type === 'product');
      if (!hasProducts) return next.filter(i => i.type !== 'subscription');
      return next;
    });
  }, []);

  /* ── panel toggle ── */
  const openCart  = useCallback(() => setIsCartOpen(true),  []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  return (
    <CartContext.Provider value={{
      toast, showToast, hideToast,
      cartItems, cartCount,
      updateQty, removeFromCart,
      isCartOpen, openCart, closeCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
