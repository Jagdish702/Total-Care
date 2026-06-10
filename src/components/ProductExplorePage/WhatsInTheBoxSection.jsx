import bpImage from '../../assets/product-explore/whats-in-box-bp.png';
import scaleImage from '../../assets/product-explore/whats-in-box-scale.png';
import glucoseImage from '../../assets/product-explore/whats-in-box-glucose.png';

const BOX_IMAGES = {
  bp:      bpImage,
  scale:   scaleImage,
  glucose: glucoseImage,
};

export default function WhatsInTheBoxSection({ product }) {
  const boxImage = BOX_IMAGES[product?.id];
  if (!boxImage) return null;

  return (
    <section className="flex flex-col items-center w-full bg-[#F5FAFF] gap-[40px] px-6 py-[40px] lg:gap-[80px] lg:px-[120px] lg:py-[150px]">

      {/* Heading — same position on both layouts */}
      <h2 className="font-inter font-bold text-[29px] tracking-[0.59px] leading-none text-black whitespace-nowrap lg:text-[88px] lg:tracking-normal order-1">
        What&apos;s in the box
      </h2>

      {/* Subtitle — mobile: order 2 (before image); desktop: order 3 (after image) */}
      <p className="font-inter font-bold text-[14px] leading-[1.5] tracking-[0.28px] uppercase text-[#00B2DD] text-center order-2 lg:order-3 lg:text-[16px] lg:tracking-[0.32px] lg:whitespace-nowrap">
        <span className="block lg:inline">Set up in under 2 minutes.</span>
        <span className="block lg:inline lg:before:content-['_']">No assistance needed.</span>
      </p>

      {/* Image card — mobile: full-width flat; desktop: rounded card with shadow */}
      <div
        className="relative w-full shrink-0 order-3 lg:order-2 lg:max-w-[1311px] lg:rounded-[60px] lg:overflow-hidden"
        style={{
          aspectRatio: '1311 / 658',
          boxShadow: 'none',
        }}
      >
        <div
          className="hidden lg:block absolute inset-0 rounded-[60px] pointer-events-none z-10"
          style={{ boxShadow: '0px 2px 20px 0px rgba(0,65,114,0.08), inset 0px 0px 2px 0px rgba(0,65,114,0.12)' }}
        />
        <img
          src={boxImage}
          alt={`What's in the box — ${product?.name ?? ''}`}
          className="w-full h-full object-cover"
        />
      </div>

    </section>
  );
}
