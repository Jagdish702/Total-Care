import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import HighlightSection from './components/HighlightSection';
import CareWeOfferSection from './components/CareWeOfferSection';
import Health360Section from './components/Health360Section/Health360Section';
import MobileAppDownloadSection from './components/MobileAppDownloadSection/MobileAppDownloadSection';
import SubscriptionSection from './components/SubscriptionSection/SubscriptionSection';
import ProductShowcaseSection from './components/ProductShowcaseSection/ProductShowcaseSection';
import IndividualListingSection from './components/IndividualListingSection';
import ProductDetailSection    from './components/ProductDetailSection';
import FAQSection              from './components/FAQSection';
import FooterSection           from './components/FooterSection';
import ProfileModal            from './components/ProfileModal';
import OTPModal                from './components/OTPModal';
import ProfileDashboard        from './components/ProfileDashboard';

export default function App() {
  // modal: null | 'profile' | 'otp' | 'dashboard'
  const [modal, setModal]           = useState(null);
  const [otpPhone, setOtpPhone]     = useState('');
  const [profileData, setProfileData] = useState(null);

  const openProfile = () => setModal('profile');
  const closeModal  = () => setModal(null);

  const handleRequestOTP = (phoneNumber, formData) => {
    setOtpPhone(phoneNumber);
    setProfileData(formData);
    setModal('otp');
  };

  const handleOTPSuccess = () => {
    setModal('dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onProfileClick={openProfile} />

      {modal === 'dashboard' ? (
        <ProfileDashboard profileData={profileData} onLogout={closeModal} />
      ) : (
        <>
          <HeroSection />
          <HighlightSection />
          <CareWeOfferSection />
          <Health360Section />
          <MobileAppDownloadSection />
          <SubscriptionSection />
          <ProductShowcaseSection />
          <IndividualListingSection />
          <ProductDetailSection />
          <FAQSection />
          <FooterSection />
        </>
      )}

      {modal === 'profile' && (
        <ProfileModal
          onClose={closeModal}
          onRequestOTP={handleRequestOTP}
        />
      )}

      {modal === 'otp' && (
        <OTPModal
          phoneNumber={otpPhone}
          onClose={closeModal}
          onSuccess={handleOTPSuccess}
        />
      )}
    </div>
  );
}
