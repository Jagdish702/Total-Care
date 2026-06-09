/**
 * Header icon components — exact SVG paths from src/assets/icons/*.svg
 * Colors use currentColor so hover:text-[#004172] on the parent button works.
 */

// ── Grid Menu icon (mobile — Figma node 450:5268 "26") ────────
// Replaces the hamburger on mobile screens.
// 2 × 2 rounded square grid identical to the Figma mobile header.
export function GridMenuIcon({ className = '' }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="3"  y="3"  width="8" height="8" rx="2" fill="currentColor" />
      <rect x="13" y="3"  width="8" height="8" rx="2" fill="currentColor" />
      <rect x="3"  y="13" width="8" height="8" rx="2" fill="currentColor" />
      <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" />
    </svg>
  );
}

// ── Offer icon (24 × 24, fill-based) ─────────────────────────────────────
export function OfferIcon({ className = '' }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M21.6902 3.00108C21.8492 2.98697 22.0374 3.11274 21.9936 3.29055C21.9374 3.52906 21.5436 3.62769 21.3323 3.71446C20.1283 4.20886 19.8868 5.11356 19.6146 6.28963C19.2933 7.67807 19.1299 9.34901 18.1855 10.4864C17.981 10.7326 17.7113 10.9186 17.4498 11.1005C17.3674 11.29 17.2284 11.9588 17.176 12.1873L16.6757 14.3772C16.6108 14.6607 16.5451 15.0214 16.4267 15.2854C16.3884 15.3709 16.2432 15.4767 16.1606 15.5295C15.6315 15.8681 15.0923 16.1997 14.5594 16.5323L11.3821 18.514L8.57526 20.2657C8.2274 20.482 7.87565 20.6916 7.53054 20.912C7.37025 21.0144 7.19071 21.1708 6.99187 21.1345C6.70956 20.989 5.9566 19.6668 5.75175 19.3377L3.83111 16.2577C3.48672 15.6702 2.1097 13.6563 2.00485 13.1902C1.98716 13.1116 2.02038 13.0392 2.06371 12.9751C2.12209 12.8888 2.21356 12.8252 2.29938 12.7684C3.10101 12.2381 11.1308 7.2296 11.2623 7.21211C11.4051 7.19311 11.5825 7.22455 11.7238 7.25082C12.7249 7.43684 13.7249 7.71067 14.7177 7.94002C15.5993 8.14366 16.5165 8.30773 17.3832 8.5626C17.5443 8.60996 17.7003 8.67229 17.8389 8.76811C17.9819 9.02662 17.6784 10.0277 17.6 10.3499C19.0584 8.73864 18.6886 6.30305 19.6713 4.46254C20.0721 3.71188 20.8976 3.25792 21.6902 3.00108ZM2.94896 13.3094L5.82972 17.9356C6.24454 18.6037 6.85105 19.5093 7.21801 20.1774C8.1436 19.5594 9.11774 18.99 10.0548 18.3905C10.3546 18.1987 10.9581 17.8564 11.2111 17.6668L14.0382 15.91C14.5671 15.5804 15.2234 15.1947 15.7239 14.8423C15.7997 14.5895 16.5226 11.474 16.5135 11.4C16.3191 11.4092 16.0652 11.4138 15.8761 11.4326C15.5636 11.7539 15.2606 12.0257 14.78 12.0323C14.471 12.0366 14.0835 11.8916 13.8617 11.6728C13.0322 10.8544 13.5925 9.46322 14.7556 9.46622C15.1049 9.46877 15.4389 9.61018 15.6839 9.85924C15.961 10.141 16.0782 10.5433 16.0315 10.9313C16.2393 10.9057 16.4824 10.904 16.6395 10.7713C16.755 10.5712 16.9343 9.58237 17.0131 9.29059C16.4601 9.16919 11.6916 8.00665 11.4648 8.02918C11.2126 8.13822 10.7853 8.42411 10.5365 8.57921L8.88104 9.6124L2.94896 13.3094ZM15.0234 10.1193C15.038 10.3423 15.037 10.4164 15.1092 10.6302C15.2106 10.7247 15.2876 10.808 15.4283 10.832C15.4238 10.5597 15.3225 10.2027 15.0234 10.1193ZM14.4593 10.1029C14.3258 10.2099 14.2312 10.2803 14.1561 10.4404C13.9535 10.8724 14.172 11.3632 14.6688 11.4107C14.7025 11.4138 14.7363 11.4162 14.7701 11.4179C14.9247 11.3936 15.0656 11.3725 15.2215 11.3561C14.2301 10.8201 14.6799 10.3494 14.4593 10.1029Z"
        fill="currentColor"
      />
      <path
        d="M9.42334 10.7487C9.9063 10.6968 10.0331 10.9267 10.0193 11.3711C9.9658 13.078 9.89236 14.7833 9.87222 16.4913C9.8685 16.8082 9.89714 17.1491 9.61049 17.3416C9.41507 17.3994 9.08085 17.4015 9.03282 17.2235C8.89242 16.7026 8.99196 15.4929 9.01071 14.985L9.07037 12.9227C9.09129 12.289 9.08984 11.6471 9.15701 11.0159C9.16992 10.8944 9.33002 10.8062 9.42334 10.7487Z"
        fill="currentColor"
      />
      <path
        d="M7.1353 11.5964C7.82063 11.4357 8.50574 11.8638 8.66173 12.5502C8.81769 13.2367 8.38486 13.9188 7.69737 14.07C7.01656 14.2198 6.34248 13.7921 6.18805 13.1123C6.03359 12.4326 6.45661 11.7556 7.1353 11.5964ZM7.03365 13.2189C7.18741 13.3748 7.419 13.4244 7.62315 13.3454C7.81011 13.273 7.94276 13.1045 7.96934 12.9058C7.9959 12.7071 7.91213 12.5097 7.75078 12.3907C7.5894 12.2717 7.37606 12.2501 7.1941 12.3342C7.03167 12.4093 6.91599 12.5588 6.88407 12.7349C6.85213 12.911 6.90793 13.0916 7.03365 13.2189Z"
        fill="currentColor"
      />
      <path
        d="M11.3814 13.8215C11.8362 13.7571 12.2903 13.9438 12.5683 14.3095C12.8464 14.6752 12.9049 15.1626 12.7213 15.5837C12.5376 16.0048 12.1406 16.2936 11.6834 16.3387C10.997 16.4064 10.3824 15.9128 10.3002 15.228C10.218 14.5431 10.6984 13.9182 11.3814 13.8215ZM11.6824 15.6169C11.8365 15.5821 11.9683 15.4829 12.0443 15.3445C12.1203 15.206 12.1332 15.0416 12.0798 14.8929C11.9833 14.6245 11.6979 14.4741 11.4219 14.5463C11.1311 14.6223 10.9548 14.9175 11.0259 15.2096C11.097 15.5017 11.3891 15.6829 11.6824 15.6169Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ── Bell icon (50 × 52 viewBox, SVG filter baked in) ──────────────────────
export function BellIcon({ className = '' }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="13 12 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      className={className}
      aria-hidden="true"
    >
      <g filter="url(#bell-filter)">
        <path
          d="M26.4382 31.7889C26.2819 32.0583 26.0576 32.2819 25.7877 32.4374C25.5178 32.5928 25.2118 32.6747 24.9004 32.6747C24.5889 32.6747 24.283 32.5928 24.0131 32.4374C23.7432 32.2819 23.5189 32.0583 23.3626 31.7889M30.2337 20.2334C30.2337 18.8189 29.6718 17.4623 28.6716 16.4621C27.6714 15.4619 26.3149 14.9 24.9004 14.9C23.4859 14.9 22.1293 15.4619 21.1292 16.4621C20.129 17.4623 19.5671 18.8189 19.5671 20.2334C19.5671 26.4556 16.9004 28.2334 16.9004 28.2334H32.9004C32.9004 28.2334 30.2337 26.4556 30.2337 20.2334Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="bell-filter"
          x="-3.09961"
          y="-2.21094"
          width="56"
          height="56"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="8" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.254902 0 0 0 0 0.447059 0 0 0 0.08 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.254902 0 0 0 0 0.447059 0 0 0 0.16 0"
          />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
        </filter>
      </defs>
    </svg>
  );
}

// ── Cart icon (24 × 24, stroke-based) ────────────────────────────────────
export function CartIcon({ className = '' }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="24" height="24" fill="white" />
      <path
        d="M3 3.74988H6.27273L8.46545 14.7053C8.54027 15.082 8.7452 15.4204 9.04436 15.6612C9.34351 15.902 9.71784 16.03 10.1018 16.0226H18.0545C18.4385 16.03 18.8129 15.902 19.112 15.6612C19.4112 15.4204 19.6161 15.082 19.6909 14.7053L21 7.84079H7.09091M10.3636 20.1135C10.3636 20.5654 9.99732 20.9317 9.54545 20.9317C9.09359 20.9317 8.72727 20.5654 8.72727 20.1135C8.72727 19.6616 9.09359 19.2953 9.54545 19.2953C9.99732 19.2953 10.3636 19.6616 10.3636 20.1135ZM19.3636 20.1135C19.3636 20.5654 18.9973 20.9317 18.5455 20.9317C18.0936 20.9317 17.7273 20.5654 17.7273 20.1135C17.7273 19.6616 18.0936 19.2953 18.5455 19.2953C18.9973 19.2953 19.3636 19.6616 19.3636 20.1135Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Profile icon (48 × 50 viewBox, SVG filter baked in) ──────────────────
export function ProfileIcon({ className = '' }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="13 12 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      className={className}
      aria-hidden="true"
    >
      <g filter="url(#profile-filter)">
        <path
          d="M30.9004 30.65V28.9C30.9004 27.9718 30.5316 27.0815 29.8753 26.4252C29.2189 25.7688 28.3286 25.4 27.4004 25.4H20.4004C19.4721 25.4 18.5819 25.7688 17.9255 26.4252C17.2691 27.0815 16.9004 27.9718 16.9004 28.9V30.65M27.4004 18.4C27.4004 20.333 25.8334 21.9 23.9004 21.9C21.9674 21.9 20.4004 20.333 20.4004 18.4C20.4004 16.467 21.9674 14.9 23.9004 14.9C25.8334 14.9 27.4004 16.467 27.4004 18.4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="profile-filter"
          x="-4.09961"
          y="-3.22498"
          width="56"
          height="56"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="8" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.254902 0 0 0 0 0.447059 0 0 0 0.08 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.254902 0 0 0 0 0.447059 0 0 0 0.16 0"
          />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
        </filter>
      </defs>
    </svg>
  );
}
