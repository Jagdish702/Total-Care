import { useState, useEffect } from 'react';

import doctorImg  from '../../assets/app-download/doctor.png';
import phoneImg   from '../../assets/app-download/phone.png';
import qrCodeImg  from '../../assets/app-download/qr-code.png';

/* ─── Mobile layout (Figma 2343:11781) ─────────────────────────────────── */
function MobileLayout() {
  return (
    <section
      className="w-full flex flex-col items-center justify-end px-6 pb-12 pt-[60px]"
      style={{
        /* Outer bg: white center → very light mint green at edges, over #f9f9f9 */
        background:
          'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(255,255,255,1) 36.6%, rgba(235,248,243,1) 100%), #f9f9f9',
      }}
    >
      {/* ── Dark card — fixed 354 × 715 px, centred ── */}
      <div
        className="flex flex-col items-center justify-end overflow-visible shrink-0 relative"
        style={{
          width: '100%',
          maxWidth: '354px',
          height: '715px',
          borderRadius: '48px',
          padding: '24px',
          gap: '24px',
          /*
           * Figma gradient: radial ellipse centred at 50% 16% of card.
           * Matrix analysis → horizontal radius ≈ 139% of card width,
           * vertical radius ≈ 42% of card height.
           */
          background:
            'radial-gradient(ellipse 139% 42% at 50% 16%, rgba(48,149,106,1) 0%, rgba(36,112,80,1) 25%, rgba(24,75,53,1) 50%, rgba(18,56,40,1) 62.5%, rgba(12,37,27,1) 75%, rgba(6,19,13,1) 87.5%, rgba(3,9,7,1) 93.75%, rgba(0,0,0,1) 100%)',
        }}
      >

        {/* ── Hero: inline-grid so doctor + phone share the same cell ── */}
        {/*
          Figma pixel measurements (card = 354 px wide):
            Doctor container: 270.65 × 359.43 px  — col 1 row 1, ml 0   mt 0
            Phone container:   87.34 × 192.43 px  — col 1 row 1, ml 212.66 mt 144.83
          Grid auto-size = max(270.65, 212.66+87.34) × max(359.43, 144.83+192.43)
                         = 300.00 × 359.43 px
        */}
        <div
          className="shrink-0"
          style={{ display: 'inline-grid', placeItems: 'start', lineHeight: 0, marginTop: '-40px' }}
        >
          {/* Doctor */}
          <div
            style={{
              gridColumn: 1, gridRow: 1,
              width: '270.65px', height: '390px',
              marginLeft: 0, marginTop: 0,
              position: 'relative',
            }}
          >
            {/*
              Figma uses size-full with NO object-fit → browser default "fill"
              which stretches the image to fill the container, showing the whole doctor.
            */}
            <img
              src={doctorImg}
              alt=""
              style={{
                width: '100%', height: '100%',
                display: 'block',
                pointerEvents: 'none', userSelect: 'none',
              }}
            />
            {/* Razor-thin bottom fade — Figma: 91.28% transparent → 99.4% black */}
            <div
              aria-hidden
              style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(180.85deg, rgba(0,0,0,0) 91.28%, rgb(0,0,0) 99.4%)',
              }}
            />
          </div>

          {/* Phone screenshot */}
          <div
            style={{
              gridColumn: 1, gridRow: 1,
              width: '87.34px', height: '192.43px',
              marginLeft: '212.66px', marginTop: '144.83px',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <img
              src={phoneImg}
              alt=""
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none', userSelect: 'none',
              }}
            />
          </div>
        </div>

        {/* ── Text content + QR card ── */}
        <div className="flex flex-col w-full" style={{ gap: '48px' }}>

          {/* Headlines */}
          <div className="flex flex-col w-full" style={{ gap: '24px' }}>
            {/* Mobile/H1-B — 32 px bold, #3cba84 */}
            <p
              className="font-inter font-bold text-[#3cba84] w-full"
              style={{ fontSize: '32px', lineHeight: 1, whiteSpace: 'pre-wrap' }}
            >
              {'Get the  \nTotalCare app '}
            </p>
            {/* Mobile/H1-L — 32 px light, white */}
            <p
              className="font-inter font-light text-white w-full"
              style={{ fontSize: '32px', lineHeight: 1 }}
            >
              and get your first doctor consultation free within 24 hours.
            </p>
          </div>

          {/* QR disclaimer card */}
          <div
            className="bg-white flex items-center w-full shrink-0"
            style={{
              border: '1px solid #e5e5e5',
              borderRadius: '24px',
              padding: '12px',
              gap: '12px',
            }}
          >
            {/* QR code — self-stretch so it fills card row height, then aspect-ratio sets width */}
            <div style={{ alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  aspectRatio: '153.846 / 144.88',
                  height: '100%',
                  position: 'relative',
                  flexShrink: 0,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={qrCodeImg}
                  alt="Scan to download TotalCare"
                  style={{
                    position: 'absolute',
                    width: '105.82%', height: '106.95%',
                    left: '-2.91%', top: '-3.74%',
                    maxWidth: 'none', pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 flex flex-col min-w-0" style={{ gap: '16px' }}>
              {/* Mobile/Body-B */}
              <p
                className="font-inter font-bold text-black w-full"
                style={{ fontSize: '14px', lineHeight: '24px', letterSpacing: '0.4536px' }}
              >
                Scan the QR code to download the app
              </p>
              {/* Web/Status */}
              <p
                className="font-inter font-medium text-black w-full"
                style={{ fontSize: '12px', lineHeight: '20px', letterSpacing: '0.3883px' }}
              >
                Use your email ID to log in. OTP will be sent for verification
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Desktop layout (unchanged) ───────────────────────────────────────── */
function DesktopLayout() {
  return (
    <section
      className="app-download-outer-bg w-full flex justify-center items-end
                 py-10 px-4
                 sm:py-16 sm:px-8
                 lg:pt-[200px] lg:pb-[120px] lg:px-[120px]"
    >
      <div
        className="app-download-card-bg w-full max-w-[1460px] overflow-visible
                   rounded-[40px] lg:rounded-[60px]
                   flex flex-col md:flex-row md:items-end
                   md:h-[465px]
                   gap-0 md:gap-[80px]
                   px-6 md:px-[48px]
                   pt-8 md:pt-0"
      >
        {/* LEFT: Doctor + Phone */}
        <div
          className="relative shrink-0 self-end mx-auto md:mx-0
                     w-[220px] h-[296px]
                     sm:w-[280px] sm:h-[378px]
                     md:w-[320px] md:h-[432px]
                     lg:w-[472.946px] lg:h-[628.079px]"
        >
          <img
            src={doctorImg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-bottom
                       pointer-events-none select-none"
          />
          <div
            className="absolute pointer-events-none hidden lg:block"
            style={{
              left:   '374.26px',
              top:    '273.44px',
              width:  '152.617px',
              height: '336.261px',
            }}
          >
            <img
              src={phoneImg}
              alt=""
              className="w-full h-full object-cover select-none"
            />
          </div>
        </div>

        {/* RIGHT: Headline + QR */}
        <div className="flex-1 flex flex-col gap-6 lg:gap-[48px] pb-8 md:py-[48px] min-w-0">
          <div className="flex flex-col gap-4 lg:gap-[24px]">
            <p className="font-inter font-bold leading-none text-[#3cba84]
                          text-[26px] sm:text-[32px] md:text-[36px] lg:text-[48px]">
              Download TotalCare app
            </p>
            <p className="font-inter font-light leading-tight text-white
                          text-[26px] sm:text-[32px] md:text-[36px] lg:text-[48px]">
              and get your first doctor consultation free within 24 hours.
            </p>
          </div>

          <div
            className="bg-white border border-[#e5e5e5]
                       rounded-[20px] lg:rounded-[24px]
                       p-4 lg:p-[24px]
                       flex gap-4 lg:gap-[24px] items-center
                       w-full max-w-[604px]"
          >
            <div className="relative shrink-0 overflow-hidden w-[80px] h-[75px] lg:w-[127px] lg:h-[120px]">
              <img
                src={qrCodeImg}
                alt="QR code to download TotalCare"
                className="absolute max-w-none pointer-events-none object-cover"
                style={{ width: '105.82%', height: '106.95%', left: '-2.91%', top: '-3.74%' }}
              />
            </div>
            <div className="flex-1 flex flex-col gap-3 lg:gap-[16px] min-w-0">
              <p className="font-inter font-bold text-black leading-snug
                            text-[14px] sm:text-[16px] lg:text-[20px]
                            lg:leading-[28px] tracking-[0.324px]">
                Scan the QR code to download the app
              </p>
              <p className="font-inter font-medium text-black
                            text-[11px] lg:text-[12px]
                            leading-[18px] lg:leading-[20px]
                            tracking-[0.388px]">
                Use your email ID to log in. OTP will be sent for verification
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Export ────────────────────────────────────────────────────────────── */
export default function MobileAppDownloadSection() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}
