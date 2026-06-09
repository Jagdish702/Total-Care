import React from 'react';

export function CardTag({ icon, label }) {
  return (
    <div className="flex items-center gap-[5px]">
      {icon && (
        <img src={icon} alt="" aria-hidden className="w-[10px] h-[10px] object-contain flex-shrink-0" />
      )}
      <span className="font-inter font-medium text-[11.38px] leading-[19.9px] tracking-[0.369px] text-[#008eb1] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export function CardStat({ children }) {
  return (
    <div className="flex items-end gap-[3.43px] whitespace-nowrap font-inter font-medium">
      {children}
    </div>
  );
}

export function StatNum({ children }) {
  return (
    <span className="text-[17.07px] leading-normal tracking-[0.277px] text-black">
      {children}
    </span>
  );
}

export function StatUnit({ children }) {
  return (
    <span className="text-[8.53px] leading-[14.22px] tracking-[0.276px] text-[#4d4d4d]">
      {children}
    </span>
  );
}

export function CardDivider() {
  return <div className="w-full shrink-0 border-t border-[rgba(0,65,114,0.08)]" />;
}

export function GlassPanel({ className = '', children }) {
  return (
    <div
      className={`bg-[rgba(255,255,255,0.8)] rounded-[17.067px]
                  shadow-[inset_0px_0px_1.422px_0px_rgba(0,65,114,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}

export function GlassCard({ className = '', style, children }) {
  return (
    <div
      className={`opacity-80 p-[8.533px] flex flex-col gap-[8.533px] items-start
                 rounded-[22.756px] bg-[rgba(0,52,91,0.1)]
                 drop-shadow-[0px_1.422px_7.111px_rgba(0,65,114,0.08)]
                 shadow-[inset_0px_0px_1.422px_0px_rgba(0,65,114,0.12)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
