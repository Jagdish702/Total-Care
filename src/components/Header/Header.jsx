import React, { useState } from 'react';
import NavLink from './NavLink';
import { OfferIcon, BellIcon, CartIcon, ProfileIcon, GridMenuIcon } from './icons';
import { useCart } from '../../context/CartContext';

import cureBayLogo from '../../assets/images/curebay-logo.png';

// ---------------------------------------------------------------------------
// Navigation data
// ---------------------------------------------------------------------------
const NAV_ITEMS = [
  { label: 'Home',         href: '/',             active: false },
  { label: 'Total Care',   href: '/total-care',   active: true  },
  { label: 'Our Services', href: '/our-services', active: false },
  { label: 'Our Team',     href: '/our-team',     active: false },
  { label: 'About Us',     href: '/about-us',     active: false },
  { label: 'Join Us',      href: '/join-us',      active: false },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CartBadge({ count }) {
  if (!count) return null;
  return (
    <span
      aria-label={`${count} item${count !== 1 ? 's' : ''} in cart`}
      className="absolute -top-[5px] -right-[5px] z-10
                 flex items-center justify-center
                 min-w-[12px] h-3 px-[3px] rounded-full
                 bg-[#d82525] text-white font-inter font-medium
                 text-[8px] leading-[13.333px] tracking-[0.2589px]"
    >
      {count}
    </span>
  );
}

/**
 * IconButton — renders an SVG icon child with optional badge and drop-shadow.
 *
 * Usage:
 *   <IconButton label="Notifications" dropShadow>
 *     <BellIcon />
 *   </IconButton>
 */
function IconButton({ label, badge, dropShadow = false, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={[
        'relative w-6 h-6 flex-shrink-0 flex items-center justify-center',
        'text-[#999999] hover:text-[#004172] transition-colors duration-150',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172] rounded',
        dropShadow ? 'drop-shadow-[0px_2px_8px_rgba(0,65,114,0.08)]' : '',
      ].join(' ')}
    >
      {children}
      {badge !== undefined && <CartBadge count={badge} />}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

export default function Header({ onProfileClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  return (
    <header className="bg-white w-full sticky top-0 z-50">
      {/* ── Desktop / Tablet bar ── */}
      <div
        className="flex items-center justify-between
                   px-10 md:px-8 lg:px-16 xl:px-[120px]
                   py-3 lg:py-4"
      >
        {/* Logo */}
        <a href="/" aria-label="CureBay home" className="flex-shrink-0">
          <img
            src={cureBayLogo}
            alt="CureBay"
            width={120}
            height={36}
            className="object-contain"
            style={{ width: '120px', height: '36.098px' }}
          />
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} {...item} />
          ))}
        </nav>

        {/* Desktop Action Icons */}
        <div className="hidden lg:flex items-center gap-6">
          <IconButton label="Offers">
            <OfferIcon />
          </IconButton>

          <IconButton label="Notifications">
            <BellIcon />
          </IconButton>

          <IconButton label="Cart" badge={cartCount} onClick={openCart}>
            <CartIcon />
          </IconButton>

          <IconButton label="My Account" onClick={onProfileClick}>
            <ProfileIcon />
          </IconButton>
        </div>

        {/* Mobile: grid menu icon only (Figma node 450:5268) */}
        <div className="lg:hidden flex items-center">
          <IconButton
            label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <GridMenuIcon
              className={`transition-colors duration-150 ${
                mobileOpen ? 'text-[#004172]' : 'text-[#808080]'
              }`}
            />
          </IconButton>
        </div>
      </div>

      {/* ── Mobile Left Drawer ── */}

      {/* Backdrop — dims page; click to close */}
      <div
        className={`fixed inset-0 lg:hidden transition-opacity duration-300 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 59, background: 'rgba(0,0,0,0.32)' }}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel — slides in from the LEFT */}
      <nav
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        className="fixed top-0 left-0 bottom-0 lg:hidden
                   bg-white flex flex-col
                   transition-transform duration-300 ease-in-out"
        style={{
          width: 'min(280px, 85vw)',
          zIndex: 60,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: '4px 0 28px rgba(0,65,114,0.12)',
        }}
      >
        {/* ── Drawer header: Logo + close button ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <img
            src={cureBayLogo}
            alt="CureBay"
            className="object-contain"
            style={{ width: '100px', height: '30px' }}
          />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center
                       text-gray-400 hover:text-[#004172]
                       rounded transition-colors duration-150"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Nav links ── */}
        <div className="flex flex-col gap-1 px-3 py-3 flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              {...item}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </div>

        {/* ── Bottom action icons ── */}
        <div className="flex items-center gap-5 px-5 py-4 border-t border-gray-100 flex-shrink-0">
          <IconButton label="Offers">
            <OfferIcon />
          </IconButton>
          <IconButton label="Notifications">
            <BellIcon />
          </IconButton>
          <IconButton label="Cart" badge={cartCount} onClick={() => { setMobileOpen(false); openCart(); }}>
            <CartIcon />
          </IconButton>
          <IconButton label="My Account" onClick={() => { setMobileOpen(false); onProfileClick?.(); }}>
            <ProfileIcon />
          </IconButton>
        </div>
      </nav>
    </header>
  );
}
