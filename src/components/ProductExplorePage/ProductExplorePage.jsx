import { Link, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import ProductHeroSection from './ProductHeroSection';
import BundleSection from './BundleSection';
import MoreThanDeviceSection from './MoreThanDeviceSection';
import BuiltForProgressSection from './BuiltForProgressSection';
import HowItWorksSection from './HowItWorksSection';
import TipsSection from './TipsSection';
import TechSpecsSection from './TechSpecsSection';
import FAQSection from '../FAQSection/FAQSection';
import FooterSection from '../FooterSection/FooterSection';
import { useProduct } from '../../hooks/useProducts';
import { PRODUCT_HERO_IMAGES } from '../../assets/productImages';

function ProductNotFound({ id }) {
  return (
    <main
      className="flex flex-col items-center justify-center gap-6 py-40 px-4 text-center"
      aria-labelledby="not-found-heading"
    >
      <p className="font-inter font-medium text-[14px] leading-5 tracking-[0.5184px] text-[#999999] uppercase">
        404 – Product Not Found
      </p>
      <h1
        id="not-found-heading"
        className="font-inter font-bold text-[36px] leading-[1.1] text-[#004172]"
      >
        We couldn&apos;t find that product
      </h1>
      <p className="font-inter font-medium text-[16px] leading-7 tracking-[0.5184px] text-[#808080] max-w-md">
        The product ID <code className="text-[#004172] bg-[#EDF9FF] px-1.5 py-0.5 rounded">{id}</code> doesn&apos;t exist in our catalog.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl
                   bg-[#004172] text-white font-inter font-medium text-[16px]
                   leading-7 tracking-[0.5184px] hover:bg-[#003562]
                   transition-colors duration-150
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172] focus-visible:ring-offset-2"
      >
        ← Back to Home
      </Link>
    </main>
  );
}

function ProductSkeleton() {
  return (
    <div
      className="px-4 md:px-8 lg:px-16 xl:px-[120px] py-24 animate-pulse"
      aria-label="Loading product"
      role="status"
    >
      <div className="flex gap-[60px] items-start lg:flex-row flex-col">
        <div className="flex-1 rounded-[48px] bg-[#EDF9FF] min-h-[500px]" />
        <div className="lg:w-[460px] w-full shrink-0 flex flex-col gap-6">
          <div className="h-12 bg-[#EDF9FF] rounded-xl w-3/4" />
          <div className="h-5  bg-[#EDF9FF] rounded-xl w-1/3" />
          <div className="h-4  bg-[#EDF9FF] rounded-xl w-1/2" />
          <div className="h-32 bg-[#EDF9FF] rounded-xl" />
          <div className="h-12 bg-[#004172] rounded-xl opacity-20" />
        </div>
      </div>
    </div>
  );
}

export default function ProductExplorePage() {
  const { id }              = useParams();
  const { product, loading, error } = useProduct(id);

  // Prefer GCP hero image from API; fall back to static local import
  const heroImage = product
    ? ((product.images ?? []).find(img => img.imageType === 'hero')?.imageUrl ?? PRODUCT_HERO_IMAGES[product.id] ?? null)
    : null;
  const productWithImage = product
    ? { ...product, image: heroImage }
    : null;

  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />

      {loading ? (
        <ProductSkeleton />
      ) : error || !productWithImage ? (
        <ProductNotFound id={id} />
      ) : (
        <>
          <ProductHeroSection product={productWithImage} />
          <BundleSection product={productWithImage} />
          <MoreThanDeviceSection product={productWithImage} />
          <BuiltForProgressSection />
          <HowItWorksSection product={productWithImage} />
          <TipsSection product={productWithImage} />
          <TechSpecsSection />
          <FAQSection />
          <FooterSection />
        </>
      )}
    </div>
  );
}
