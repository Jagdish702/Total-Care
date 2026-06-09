import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

/* ── Add-on images ─────────────────────────────────────────────────────── */
import addonOmronImg     from '../../assets/cart/addon-omron.png';
import addonScaleImg     from '../../assets/cart/addon-scale.png';
import addonCgmImg       from '../../assets/cart/addon-cgm.png';
import addonGlucoImg     from '../../assets/cart/addon-glucobuddy.png';
import subscriptionImg   from '../../assets/cart/subscription-card.png';

/* ── Payment icons ─────────────────────────────────────────────────────── */
import payVisa  from '../../assets/cart/pay-visa.png';
import payMc    from '../../assets/cart/pay-mc.png';
import payPp    from '../../assets/cart/pay-pp.png';
import payUpi   from '../../assets/cart/pay-upi.png';

/* ═══════════════════════════════════════════════════════════════════════════
   Inline SVG icons
═══════════════════════════════════════════════════════════════════════════ */
function TrashIcon() {
  /* Exact path from Figma asset — viewBox 0 0 15.8 17.3556 */
  return (
    <svg width="16" height="17" viewBox="0 0 15.8 17.3556" fill="none" aria-hidden="true">
      <path
        d="M0.9 4.01111H2.45556M2.45556 4.01111H14.9M2.45556 4.01111V14.9C2.45556 15.3126 2.61944 15.7082 2.91117 15.9999C3.20289 16.2917 3.59855 16.4556 4.01111 16.4556H11.7889C12.2014 16.4556 12.5971 16.2917 12.8888 15.9999C13.1806 15.7082 13.3444 15.3126 13.3444 14.9V4.01111M4.78889 4.01111V2.45556C4.78889 2.043 4.95278 1.64733 5.2445 1.35561C5.53622 1.06389 5.93189 0.9 6.34444 0.9H9.45556C9.86811 0.9 10.2638 1.06389 10.5555 1.35561C10.8472 1.64733 11.0111 2.043 11.0111 2.45556V4.01111M6.34444 7.9V12.5667M9.45556 7.9V12.5667"
        stroke="#808080"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polyline points="23 4 23 10 17 10" stroke="#999" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" stroke="#999" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronDownIcon({ up }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
      style={{ transform: up ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}>
      <path d="M6 9l6 6 6-6" stroke="#808080" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="#808080" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function CashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="#808080" strokeWidth="1.6"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="#808080" strokeWidth="1.6"/>
      <circle cx="12" cy="14" r="2" stroke="#808080" strokeWidth="1.6"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Quantity Stepper
═══════════════════════════════════════════════════════════════════════════ */
function QtyStepper({ qty, onMinus, onPlus }) {
  /* Figma: each cell is w-[28px], p-[8px] all sides, border-[#e5e5e5] between cells */
  return (
    <div className="flex items-center border border-[#e5e5e5] rounded-[8px] bg-white overflow-hidden shrink-0">
      <button
        type="button"
        onClick={onMinus}
        className="w-7 p-2 flex items-center justify-center font-inter font-light text-[16px] leading-[28px] text-[#808080] tracking-[0.5184px] hover:bg-[#f5f5f5] transition-colors"
      >
        −
      </button>
      <div className="w-7 p-2 flex items-center justify-center border-l border-r border-[#e5e5e5] font-inter font-medium text-[16px] leading-[28px] text-black tracking-[0.5184px]">
        {qty}
      </div>
      <button
        type="button"
        onClick={onPlus}
        className="w-7 p-2 flex items-center justify-center font-inter font-light text-[16px] leading-[28px] text-[#808080] tracking-[0.2592px] hover:bg-[#f5f5f5] transition-colors"
      >
        +
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Disclaimer Card
═══════════════════════════════════════════════════════════════════════════ */
function DisclaimerCard({ text }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] flex gap-3 items-start p-3 w-full">
      <span className="shrink-0 mt-0.5"><RefreshIcon /></span>
      <p className="font-inter font-medium text-[12px] leading-[20px] tracking-[0.39px] text-[#999] flex-1 whitespace-pre-wrap">
        {text}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Cart Item Card — subscription or product
═══════════════════════════════════════════════════════════════════════════ */
function CartItemCard({ item, onUpdateQty, onRemove }) {
  const isSub = item.type === 'subscription';
  const fmt   = (n) => n ? `₹${Number(n).toLocaleString('en-IN')}` : '';

  /* Purple gradient style for product promo line — matches Figma exactly */
  const purpleGrad = {
    backgroundImage: 'linear-gradient(93.16deg, #B189FF 0%, #2E008B 96.07%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  /* Green gradient style for subscription price label */
  const greenGrad = {
    backgroundImage: 'linear-gradient(180deg, #10B981 0%, #00664C 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <div
      className="relative bg-white rounded-[20px] flex gap-2 items-start p-2 w-full"
      style={{ boxShadow: '0 4px 6px rgba(0,65,114,0.08), inset 0 0 2px rgba(0,65,114,0.16)' }}
    >
      {/* Product image */}
      <div className="shrink-0 rounded-[12px] overflow-hidden w-[100px] h-[100px] md:w-[180px] md:h-[150px]">
        <img
          src={item.image || subscriptionImg}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right content — fills height, space-between top and bottom */}
      <div className="flex flex-col items-start justify-between self-stretch flex-1 min-w-0 pt-1 px-1 md:pt-2 md:px-2 pb-0">

        {/* ── Top info block ─────────────────────────────── */}
        <div className="flex flex-col gap-2 md:gap-[16px] w-full">

          {/* Product name */}
          <p className="font-inter font-medium text-[14px] md:text-[18px] leading-[22px] md:leading-[28px] tracking-[0.5825px] text-black line-clamp-2 w-full">
            {item.name}
          </p>

          {/* Promo line:
              • Products  → purple gradient "First 3 months of TotalCare subscription FREE"
              • Subscriptions → green gradient priceLabel (e.g. "3 months FREE") */}
          {!isSub && (
            <p
              className="font-inter font-medium text-[12px] leading-[20px] tracking-[0.3883px] truncate w-full"
              style={purpleGrad}
            >
              First 3 months of TotalCare subscription FREE
            </p>
          )}
          {isSub && item.priceLabel && (
            <p
              className="font-inter font-medium text-[12px] leading-[20px] tracking-[0.3883px] truncate w-full"
              style={greenGrad}
            >
              {item.priceLabel}
            </p>
          )}

          {/* Description — hidden on mobile to save space */}
          {item.description && (
            <p className="hidden md:block font-inter font-light text-[16px] leading-[28px] tracking-[0.5184px] text-[#808080] w-full">
              {item.description}
            </p>
          )}
        </div>

        {/* ── Bottom row: stepper + trash | price ─────────── */}
        <div className="flex items-center justify-between w-full mt-2 md:mt-3 pb-1">

          {/* Left: qty stepper + delete icon */}
          <div className="flex items-center gap-3 md:gap-[16px]">
            <QtyStepper
              qty={item.qty}
              onMinus={() => onUpdateQty(item.id, -1)}
              onPlus={()  => onUpdateQty(item.id, +1)}
            />
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              aria-label="Remove item"
              className="relative flex items-center justify-center shrink-0 hover:opacity-70 transition-opacity"
              style={{ width: 24, height: 24 }}
            >
              <TrashIcon />
            </button>
          </div>

          {/* Right: price */}
          <div className="flex items-center gap-[5px] font-inter font-medium text-[14px] md:text-[16px] leading-[28px] tracking-[0.5184px]">
            {item.originalPrice && (
              <span className="text-[#CCC] line-through">
                {fmt(item.originalPrice * item.qty)}
              </span>
            )}
            {item.price != null && (
              <span className="text-black">
                {fmt(item.price * item.qty)}
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Add-Ons Section
═══════════════════════════════════════════════════════════════════════════ */
const ADD_ONS = [
  { id: 'ao-omron',  name: 'Omron BP Monitor',               image: addonOmronImg, price: 1800, originalPrice: 2400,  type: 'product', label: 'Product' },
  { id: 'ao-scale',  name: 'Meditive Body Composition Scale', image: addonScaleImg, price: 2999, originalPrice: 4999,  type: 'product', label: 'Product' },
  { id: 'ao-cgm',   name: 'Tracky CGM Device',               image: addonCgmImg,   price: 3500, originalPrice: 6599,  type: 'product', label: 'Product' },
  { id: 'ao-gluco', name: 'RGB GlucoBuddy Glucometer',       image: addonGlucoImg, price: 1800, originalPrice: 2400,  type: 'product', label: 'Product' },
];

function AddOnsSection({ onAddToCart, onRemove, cartItems }) {
  const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

  return (
    <div className="flex flex-col gap-3 w-full overflow-hidden">
      {/* Label + promo */}
      <div className="flex flex-col gap-[6px]">
        <p className="font-inter font-bold text-[18px] leading-[28px] tracking-[0.58px] text-[#808080]">
          Add-ons
        </p>
        <p className="font-inter font-medium text-[12px] leading-[20px] tracking-[0.39px] truncate"
          style={{
            backgroundImage: 'linear-gradient(130deg, #B189FF 0%, #2E008B 96%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
          Get first 3 months of TotalCare subscription FREE with any device purchase.
        </p>
      </div>

      {/* Horizontally scrollable cards */}
      <div className="flex gap-[10px] overflow-x-auto pb-2 -mx-1 px-1 snap-x"
        style={{ scrollbarWidth: 'none' }}>
        {ADD_ONS.map((addon) => {
          const inCart = cartItems.some(
            i => i.name === addon.name && i.type === addon.type
          );
          return (
            <div key={addon.id}
              className="relative shrink-0 snap-start bg-white rounded-[20px] flex flex-col gap-2 p-2 transition-all duration-200"
              style={{
                width: 196,
                boxShadow: '0 4px 6px rgba(0,65,114,0.08), inset 0 0 2px rgba(0,65,114,0.16)',
                border: inCart ? '1px solid #10b981' : '1px solid transparent',
              }}>

              {/* Image */}
              <div className="rounded-[12px] overflow-hidden" style={{ height: 150 }}>
                <img src={addon.image} alt={addon.name} className="w-full h-full object-cover" />
              </div>

              {/* Name + price */}
              <div className="flex flex-col gap-4 px-2 pb-1">
                <p className="font-inter font-medium text-[16px] leading-[28px] tracking-[0.52px] text-black w-full truncate">
                  {addon.name}
                </p>
                <div className="flex items-center gap-1">
                  <span className="font-inter font-medium text-[16px] text-[#CCC] line-through tracking-[0.52px]">
                    {fmt(addon.originalPrice)}
                  </span>
                  <span className="font-inter font-medium text-[16px] text-black tracking-[0.52px]">
                    {fmt(addon.price)}
                  </span>
                </div>
              </div>

              {/* Add to cart / Remove button */}
              {inCart ? (
                /* ── Remove state (Figma: gray text, no fill, drop-shadow) ── */
                <button
                  type="button"
                  onClick={() => onRemove(addon)}
                  className="relative h-8 w-full rounded-[12px] font-inter font-medium text-[16px] text-[#808080] tracking-[0.26px] flex items-center justify-center hover:bg-[#fef2f2] transition-colors duration-150"
                  style={{ boxShadow: '0 2px 2px rgba(0,65,114,0.08)' }}
                >
                  Remove
                </button>
              ) : (
                /* ── Default state (navy bg, white text) ── */
                <button
                  type="button"
                  onClick={() => onAddToCart(addon)}
                  className="relative h-8 w-full rounded-[12px] font-inter font-medium text-[16px] text-white tracking-[0.26px] flex items-center justify-center hover:brightness-110 transition-all duration-150"
                  style={{ background: '#004172', boxShadow: '0 2px 2px rgba(0,65,114,0.08), inset 0 0 2px rgba(0,65,114,0.08)' }}
                >
                  Add to cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Tab Bar
═══════════════════════════════════════════════════════════════════════════ */
function TabBar({ activeTab, onSwitch, cartCount, orderCount }) {
  const tabs = [
    { key: 'cart',   label: 'Cart',   count: cartCount  },
    { key: 'orders', label: 'Orders', count: orderCount },
  ];
  return (
    <div className="flex w-full border-b border-[#E5E5E5]">
      {tabs.map(t => (
        <button
          key={t.key}
          type="button"
          onClick={() => onSwitch(t.key)}
          className={`flex flex-1 items-center justify-between px-5 py-3 transition-colors duration-150 font-inter font-medium text-[16px] tracking-[0.52px]
            ${activeTab === t.key
              ? 'border-b-2 border-[#004172] text-[#004172] -mb-px'
              : 'text-[#808080] border-b-0'
            }`}
        >
          <span>{t.label}</span>
          <span className="bg-[#F9F9F9] rounded-[8px] px-2 py-1 font-inter font-medium text-[12px] tracking-[0.39px] text-[#999]">
            {t.count}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Empty Cart
═══════════════════════════════════════════════════════════════════════════ */
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 w-full">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#E5E5E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="3" y1="6" x2="21" y2="6" stroke="#E5E5E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 10a4 4 0 01-8 0" stroke="#E5E5E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <p className="font-inter font-medium text-[16px] text-[#808080]">Your cart is empty</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CartPanel — main sliding panel
═══════════════════════════════════════════════════════════════════════════ */
export default function CartPanel() {
  const { isCartOpen, closeCart, cartItems, cartCount, updateQty, removeFromCart, showToast } = useCart();
  const navigate = useNavigate();
  const [activeTab,     setActiveTab]     = useState('cart');
  const [addOnsVisible, setAddOnsVisible] = useState(true);

  const subscriptions = cartItems.filter(i => i.type === 'subscription');
  const products      = cartItems.filter(i => i.type === 'product');

  /* Totals */
  const total         = cartItems.reduce((s, i) => s + (i.price || 0) * i.qty,         0);
  const totalOriginal = cartItems.reduce((s, i) => s + (i.originalPrice || 0) * i.qty, 0);
  const savings       = totalOriginal - total;
  const fmt           = (n) => n ? `₹${Number(n).toLocaleString('en-IN')}` : '';

  const handleAddOnAddToCart = (addon) => {
    showToast({ ...addon, qty: 1 });
  };

  const handleAddOnRemove = (addon) => {
    const item = cartItems.find(
      i => i.name === addon.name && i.type === addon.type
    );
    if (item) removeFromCart(item.id);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10000] bg-black/30 backdrop-blur-[2px]"
            onClick={closeCart}
          />

          {/* Panel */}
          <motion.div
            key="cart-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-0 top-0 z-[10001] h-screen bg-[#F9F9F9] flex flex-col"
            style={{ width: 'min(800px, 100vw)' }}
            role="dialog"
            aria-label="Your Cart"
            aria-modal="true"
          >
            {/* ── Header ────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 md:px-8 pt-5 md:pt-8 pb-3 md:pb-4 shrink-0">
              <h2 className="font-inter font-bold text-[28px] md:text-[48px] leading-none text-black">
                Your Cart
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#E5E5E5] transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* ── Tab bar ───────────────────────────────────────────── */}
            <div className="px-4 md:px-8 shrink-0">
              <TabBar
                activeTab={activeTab}
                onSwitch={setActiveTab}
                cartCount={cartCount}
                orderCount={0}
              />
            </div>

            {/* ── Scrollable content ────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 flex flex-col gap-4 md:gap-6"
              style={{ paddingBottom: '220px' }}>

              {activeTab === 'cart' && (
                <>
                  {cartItems.length === 0 ? (
                    <EmptyCart />
                  ) : (
                    <>
                      {/* Products */}
                      {products.length > 0 && (
                        <div className="flex flex-col gap-4">
                          <p className="font-inter font-bold text-[18px] leading-[28px] tracking-[0.58px] text-[#808080]">
                            Products
                          </p>
                          {products.map(item => (
                            <CartItemCard
                              key={item.id}
                              item={item}
                              onUpdateQty={updateQty}
                              onRemove={removeFromCart}
                            />
                          ))}
                        </div>
                      )}

                      {/* Subscriptions */}
                      {subscriptions.length > 0 && (
                        <div className="flex flex-col gap-4">
                          <p className="font-inter font-bold text-[18px] leading-[28px] tracking-[0.58px] text-[#808080]">
                            Subscriptions
                          </p>
                          {subscriptions.map(item => (
                            <div key={item.id} className="flex flex-col gap-3">
                              <CartItemCard
                                item={item}
                                onUpdateQty={updateQty}
                                onRemove={removeFromCart}
                              />
                              <DisclaimerCard
                                text="Auto-renews monthly at ₹99 after trial. Cancel anytime from app settings at least 24hrs before renewal. No refund for current billing period after cancellation (T&C §2.1)"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {activeTab === 'orders' && (
                <div className="flex flex-col items-center justify-center gap-4 py-16">
                  <p className="font-inter font-medium text-[16px] text-[#808080]">No orders yet</p>
                </div>
              )}
            </div>

            {/* ── Sticky bottom section ─────────────────────────────── */}
            <div className="absolute bottom-0 left-0 right-0 bg-white flex flex-col"
              style={{ boxShadow: '0 -4px 16px rgba(0,65,114,0.06)' }}>

              {/* Collapse / expand add-ons toggle */}
              <div className="flex items-center justify-center py-1 border-b border-[#F0F0F0]">
                <button
                  type="button"
                  onClick={() => setAddOnsVisible(v => !v)}
                  className="flex items-center justify-center w-full py-1 hover:bg-[#F9F9F9] transition-colors"
                  aria-label={addOnsVisible ? 'Hide add-ons' : 'Show add-ons'}
                >
                  <ChevronDownIcon up={addOnsVisible} />
                </button>
              </div>

              {/* Add-ons */}
              <AnimatePresence initial={false}>
                {addOnsVisible && (
                  <motion.div
                    key="addons"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden px-4 md:px-8 pt-3 md:pt-4"
                  >
                    <AddOnsSection
                      onAddToCart={handleAddOnAddToCart}
                      onRemove={handleAddOnRemove}
                      cartItems={cartItems}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Divider */}
              <div className="h-px bg-[#E5E5E5] mx-4 md:mx-8 my-0" />

              {/* Summary bar — stacked on mobile, side-by-side on desktop */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-8 py-3 md:py-4 gap-3 md:gap-6">

                {/* Top row on mobile: savings + price side-by-side */}
                <div className="flex items-center justify-between md:contents gap-4">

                  {/* Savings + payment icons */}
                  <div className="flex flex-col gap-1 md:gap-2 flex-1 min-w-0">
                    {savings > 0 && (
                      <p className="font-inter font-medium text-[12px] md:text-[14px] tracking-[0.52px] truncate"
                        style={{
                          backgroundImage: 'linear-gradient(90deg, #10B981 0%, #004172 100%)',
                          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>
                        You saved {fmt(savings)} than market
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <img src={payVisa} alt="Visa"       className="h-3 object-contain" />
                      <img src={payMc}   alt="Mastercard" className="h-3 object-contain" />
                      <img src={payPp}   alt="PayPal"     className="h-3 object-contain" />
                      <img src={payUpi}  alt="UPI"        className="h-3 object-contain" />
                      <CashIcon />
                    </div>
                  </div>

                  {/* Price — right side on mobile */}
                  <div className="flex items-center gap-1 font-inter font-medium text-[20px] md:text-[24px] tracking-[0.39px] shrink-0">
                    {totalOriginal > 0 && totalOriginal !== total && (
                      <span className="text-[#CCC] line-through text-[14px] md:text-[18px]">{fmt(totalOriginal)}</span>
                    )}
                    {total > 0 && <span className="text-black">{fmt(total)}</span>}
                  </div>
                </div>

                {/* Checkout button — full width on mobile */}
                <button
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={() => { closeCart(); navigate('/checkout'); }}
                  className="w-full md:w-auto h-11 md:h-10 font-inter font-medium text-[16px] text-white tracking-[0.26px] rounded-[12px] px-10 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all duration-150"
                  style={{ background: '#004172', boxShadow: '0 2px 2px rgba(0,65,114,0.08), inset 0 0 2px rgba(0,65,114,0.08)' }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
