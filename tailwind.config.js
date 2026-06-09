/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        // Inter must be loaded in index.html or via @fontsource/inter
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          primary:  '#004172',   // Blue Primary/Brand
          teal:     '#008EB1',   // Blue Tertiary/10
          lightBg:  '#EDF9FF',   // Blue Secondary/3
          error:    '#D82525',   // Error/Dark (badge)
          glassBg:  'rgba(0,52,91,0.1)',
          glassFill:'rgba(255,255,255,0.8)',
        },
        neutral: {
          muted:  '#999999',   // Black/6 — inactive nav
          mid:    '#808080',   // Black/7
          dark:   '#4D4D4D',   // Black/9
          white:  '#FFFFFF',   // Black/1
        },
      },
      letterSpacing: {
        'nav':   '0.2592px',  // Web/Button tracking
        'badge': '0.2589px',  // Badge tracking
      },
      dropShadow: {
        // Figma Outer/5 effect
        'icon': ['0px 2px 8px rgba(0, 65, 114, 0.08)'],
      },
      spacing: {
        // Figma spacing tokens
        '6-custom': '24px',   // --spacing/8
        '4-custom': '16px',   // --spacing/6
      },
    },
  },
  plugins: [],
};
