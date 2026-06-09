import { BUNDLE_COMPONENT_IMAGES, SUBSCRIPTION_IMAGE } from '../../assets/productImages';

const SUBSCRIPTION_ITEM = {
  id:          'subscription',
  name:        'Total Care Subscription - Quarterly',
  description: '3 months of TotalCare subscription FREE with device bundle purchase',
  originalPrice: 447,
  price:       0,
  isFree:      true,
};

function BundleCard({ item, isLast }) {
  const image = item.isFree
    ? SUBSCRIPTION_IMAGE
    : BUNDLE_COMPONENT_IMAGES[item.id] ?? null;

  const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col gap-3 items-start w-[250px] shrink-0">
        {image && (
          <img
            src={image}
            alt={item.name}
            className="w-full h-[200px] object-cover rounded-[24px]"
          />
        )}
        <p className="font-inter font-medium text-[16px] text-black leading-7">
          {item.name}
        </p>
        <p className="font-inter font-light text-[14px] text-[#808080] leading-6">
          {item.description || item.subtitle}
        </p>
        <div className="flex items-center gap-3">
          <span className="font-inter font-light text-[14px] text-[#999] line-through">
            {inr(item.originalPrice)}
          </span>
          {item.isFree ? (
            <span className="font-inter font-bold text-[20px] text-[#00B82E]">FREE</span>
          ) : (
            <span className="font-inter font-bold text-[20px] text-[#004172]">
              {inr(item.price)}
            </span>
          )}
        </div>
      </div>

      <span className="font-inter font-light text-[#808080] text-[32px] shrink-0">
        {isLast ? '=' : '+'}
      </span>
    </div>
  );
}

export default function BundleSection({ product }) {
  if (!product) return null;

  const isBundle = product.productType === 'bundle';

  // Build item list: bundle components (from API) or the product itself
  const componentItems = isBundle && product.bundleItems?.length
    ? product.bundleItems.map(bi => ({
        id:            bi.component.id,
        name:          bi.component.name,
        description:   bi.component.description,
        subtitle:      bi.component.subtitle,
        price:         bi.component.price,
        originalPrice: bi.component.originalPrice,
      }))
    : [{ id: product.id, name: product.name, description: product.description, price: product.price, originalPrice: product.originalPrice }];

  const allItems = [...componentItems, SUBSCRIPTION_ITEM];

  // Totals
  const marketTotal     = componentItems.reduce((s, i) => s + i.originalPrice, 0);
  const individualTotal = componentItems.reduce((s, i) => s + i.price, 0);
  const bundlePrice     = product.price;

  const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

  return (
    <section className="w-full bg-white">
      <div className="flex flex-wrap gap-6 items-center py-[60px] px-4 md:px-8 lg:px-16 xl:px-[120px]">
        {allItems.map((item, index) => (
          <BundleCard
            key={item.id}
            item={item}
            isLast={index === allItems.length - 1}
          />
        ))}

        {/* Bundle Total Block */}
        <div className="flex flex-col gap-8 w-[300px] shrink-0 bg-[#F5FAFF] rounded-[24px] p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-inter font-light text-[16px] text-[#808080]">Market Total :</span>
              <span className="font-inter font-bold text-[16px] text-black">{inr(marketTotal)}</span>
            </div>
            {isBundle && (
              <div className="flex items-center justify-between">
                <span className="font-inter font-light text-[16px] text-[#808080]">Individual Total :</span>
                <span className="font-inter font-bold text-[16px] text-black">{inr(individualTotal)}</span>
              </div>
            )}
            <div className="border-t border-[#E5E5E5] w-full" />
            <div className="flex items-center justify-between">
              <span className="font-inter font-bold text-[20px] text-[#10B981]">
                {isBundle ? 'Bundle Total :' : 'Your Price :'}
              </span>
              <span className="font-inter font-bold text-[28px] text-[#004172]">{inr(bundlePrice)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full py-2 px-4 rounded-xl bg-[#004172] text-white font-inter font-medium text-[16px]">
              Add to Cart at {inr(bundlePrice)}
            </button>
            <div className="font-inter text-[14px] text-center flex flex-col gap-0.5">
              <p className="font-light text-[#808080]">You&apos;ve saved</p>
              <p className="font-medium text-[#004172]">
                {inr(marketTotal - bundlePrice)} than market
              </p>
              {isBundle && individualTotal !== bundlePrice && (
                <p className="font-light text-[#808080]">
                  and {inr(individualTotal - bundlePrice)} than individual
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
