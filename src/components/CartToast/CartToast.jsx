import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

/* ─── Close (X) icon ─────────────────────────────────────────────────────── */
function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M12 4L4 12M4 4l8 8" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── CartToast ──────────────────────────────────────────────────────────── */
export default function CartToast() {
  const { toast, hideToast } = useCart();
  const navigate = useNavigate();

  const handleView = () => {
    hideToast();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key="cart-toast"
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0,   scale: 1    }}
          exit={{   opacity: 0, y: -16,  scale: 0.96 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          /* ── positioning: fixed, top-right, just below the header ── */
          className="fixed z-[9999] top-[72px] right-4 sm:right-6 lg:right-8"
          role="status"
          aria-live="polite"
          aria-label="Cart notification"
        >
          {/*
            Outer card
            — white bg, rounded-[20px]
            — drop-shadow 0 2 10 rgba(0,65,114,0.08)
            — inner shadow 0 0 2 rgba(0,65,114,0.12)
            — gap-[8px] between image and right column
            — p-[8px]
          */}
          <div
            className="relative bg-white rounded-[20px] flex gap-2 items-start p-2 w-[336px]"
            style={{
              boxShadow:
                '0 2px 10px rgba(0,65,114,0.08), inset 0 0 2px rgba(0,65,114,0.12)',
            }}
          >
            {/* ── Product / subscription image 120×120 ── */}
            <div
              className="relative shrink-0 rounded-[12px] overflow-hidden"
              style={{
                width: 120,
                height: 120,
                boxShadow:
                  '0 2px 20px rgba(0,65,114,0.08), inset 0 0 2px rgba(0,65,114,0.12)',
              }}
            >
              <img
                src={toast.image}
                alt={toast.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* ── Right column ── */}
            <div className="flex flex-col items-start justify-between self-stretch flex-1 min-w-0">

              {/* Top: label row + close button + name + "is added to cart" */}
              <div className="flex flex-col gap-[12px] items-start pt-2 px-2 w-full">

                {/* Label row */}
                <div className="flex items-center justify-between w-full">
                  <span className="font-inter font-medium text-[12px] leading-[20px] tracking-[0.39px] text-[#808080] whitespace-nowrap">
                    {toast.label}
                  </span>
                  <button
                    type="button"
                    onClick={hideToast}
                    aria-label="Dismiss notification"
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#f5f5f5] transition-colors shrink-0"
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* Item name */}
                <p className="font-inter font-medium text-[16px] leading-[28px] tracking-[0.52px] text-black w-full truncate">
                  {toast.name}
                </p>

                {/* "is added to cart" */}
                <p className="font-inter font-medium text-[16px] leading-[28px] tracking-[0.52px] text-[#00B82E]">
                  is added to cart
                </p>
              </div>

              {/* View button */}
              <button
                type="button"
                onClick={handleView}
                className="relative w-full h-[28px] rounded-[12px] flex items-center justify-center
                           font-inter font-medium text-[16px] tracking-[0.26px] text-[#004172]
                           bg-[#EDF9FF] hover:bg-[#d6f0ff] transition-colors duration-150
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172]"
                style={{ boxShadow: 'inset 0 0 2px rgba(0,65,114,0.08)' }}
              >
                View
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
