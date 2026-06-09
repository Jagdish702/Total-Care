import React from 'react';

/**
 * Navigation link — active state driven by `active` prop.
 * Colors: active #004172, inactive #999999 (from Figma token Black/6).
 */
export default function NavLink({ label, href = '#', active = false, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={[
        'font-inter font-medium text-base leading-normal whitespace-nowrap',
        'tracking-[0.2592px]',
        'transition-colors duration-150',
        active
          ? 'text-[#004172]'
          : 'text-[#999999] hover:text-[#004172]',
      ].join(' ')}
    >
      {label}
    </a>
  );
}
