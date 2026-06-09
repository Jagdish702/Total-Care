import React from 'react';

// ─── Icons ─────────────────────────────────────────────────────────────────────

const EditIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CameraIcon = () => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
    <rect x="1" y="4" width="18" height="12" rx="2" stroke="#808080" strokeWidth="1.5" />
    <circle cx="10" cy="10" r="3" stroke="#808080" strokeWidth="1.5" />
    <path d="M7 4l1.5-3h3L13 4" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BreadcrumbChevron = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4l4 4-4 4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 18l6-6-6-6" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FilterIcon = () => (
  <svg width="18" height="17" viewBox="0 0 18 17" fill="none">
    <path d="M1 1.6h16M4.6 8.5h8.8M7.4 15.4h3.2" stroke="#004172" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="#d82525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 17l5-5-5-5M21 12H9" stroke="#d82525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PackageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#30956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 22V12h6v10" stroke="#30956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MembershipIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="#30956A" strokeWidth="1.5" />
    <path d="M2 10h20" stroke="#30956A" strokeWidth="1.5" />
    <path d="M6 15h3M15 15h3" stroke="#30956A" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HeartRateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 12h4l2-6 4 12 2-6h6" stroke="#30956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#30956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.73 21a2 2 0 01-3.46 0" stroke="#30956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LanguageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#30956A" strokeWidth="1.5" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="#30956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#30956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="#30956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Avatar placeholder ────────────────────────────────────────────────────────

const AvatarSVG = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="60" fill="#e5e5e5" />
    <circle cx="60" cy="46" r="22" fill="#b2b2b2" />
    <ellipse cx="60" cy="96" rx="36" ry="26" fill="#b2b2b2" />
  </svg>
);

// ─── Primitive sub-components ──────────────────────────────────────────────────

function Divider() {
  return <hr className="w-full border-0 border-t border-[#ebebeb]" />;
}

function Chip({ variant = 'success', text }) {
  const styles = {
    success: 'bg-[#e8fff1] text-[#00b82e]',
    error:   'bg-[#ffdbdb] text-[#d82525]',
    warning: 'bg-[#fff3d7] text-[#d29300]',
    info:    'bg-[#e5f7fc] text-[#008eb1]',
    neutral: 'bg-[#e5e5e5] text-[#4d4d4d]',
  };
  return (
    <div className={`inline-flex items-center justify-center px-3 py-2 rounded-lg shrink-0 ${styles[variant]}`}>
      <span className="font-inter font-medium text-[12px] leading-5 tracking-[0.3883px] whitespace-nowrap">{text}</span>
    </div>
  );
}

function Toggle({ on = false }) {
  return (
    <div
      className={`flex items-center w-[54px] h-[28px] rounded-full p-[2px] shrink-0 ${on ? 'justify-end' : 'justify-start'}`}
      style={{
        background: on
          ? 'linear-gradient(180deg, #10B981 0%, #00664C 100%)'
          : 'linear-gradient(180deg, #ebebeb 0%, #b7b7b7 100%)',
        boxShadow: 'inset 0px 0px 6px rgba(0,65,114,0.24)',
      }}
    >
      <div className="w-6 h-6 bg-white rounded-full" style={{ boxShadow: '0px 2px 4px rgba(0,65,114,0.08)' }} />
    </div>
  );
}

function SectionCard({ children }) {
  return (
    <div
      className="bg-white rounded-[20px] md:rounded-[24px] p-4 md:p-6 flex flex-col gap-4 md:gap-[22px] w-full"
      style={{ boxShadow: 'inset 0px 0px 2px rgba(0,65,114,0.08)' }}
    >
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center gap-4 w-full">
      <p className="flex-1 font-inter font-medium text-[13px] md:text-[16px] text-[#808080] leading-5 md:leading-7 tracking-[0.5184px]">{label}</p>
      <p className="flex-1 font-inter font-medium text-[13px] md:text-[16px] text-black leading-5 md:leading-7 tracking-[0.5184px] text-right">{value || '—'}</p>
    </div>
  );
}

function SectionHeader({ title, children }) {
  return (
    <div className="flex items-center justify-between w-full min-h-[40px] md:min-h-[48px] flex-wrap gap-2">
      <p className="font-inter font-medium text-[18px] md:text-[24px] text-[#808080] leading-normal tracking-[0.3888px] whitespace-nowrap shrink-0">
        {title}
      </p>
      {children && <div className="flex items-center gap-6 shrink-0">{children}</div>}
    </div>
  );
}

function IconBtn({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-10 h-10 flex items-center justify-center rounded-full shrink-0"
      style={{ boxShadow: '0px 2px 2px rgba(0,65,114,0.08)' }}
    >
      {children}
    </button>
  );
}

function TextBtn({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-2 h-10 rounded-full font-inter font-medium text-[16px] text-[#004172] leading-normal tracking-[0.2592px] whitespace-nowrap shrink-0"
      style={{ boxShadow: '0px 2px 2px rgba(0,65,114,0.08)' }}
    >
      {children}
    </button>
  );
}

function FilledBtn({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-4 py-3 h-12 rounded-2xl bg-[#edf9ff] font-inter font-medium text-[16px] text-[#004172] leading-normal tracking-[0.2592px] whitespace-nowrap shrink-0"
      style={{ boxShadow: 'inset 0px 0px 2px rgba(0,65,114,0.08)' }}
    >
      {children}
    </button>
  );
}

function NotifRow({ icon, label, on }) {
  return (
    <div className="flex items-center gap-3 md:gap-12 w-full">
      <div className="flex flex-1 items-center gap-3 min-w-0">
        <div
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#ebf8f3] shrink-0"
          style={{ boxShadow: 'inset 0px 0px 2px rgba(0,65,114,0.08)' }}
        >
          {icon}
        </div>
        <p className="font-inter font-medium text-[16px] text-black leading-7 tracking-[0.5184px] whitespace-nowrap">{label}</p>
      </div>
      <Toggle on={on} />
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ProfileDashboard({ profileData = {}, onLogout }) {
  const {
    firstName = '',
    lastName = '',
    gender = '',
    phoneNumber = '',
    dateOfBirth = '',
    bloodGroup = '',
    address1 = '',
    country = '',
    pincode = '',
    city = '',
    state: stateName = '',
  } = profileData || {};

  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'New Member';
  const displayPhone = phoneNumber ? `+91 ${phoneNumber}` : '—';
  const addressParts = [address1, city, stateName, pincode, country].filter(Boolean);
  const displayAddress = addressParts.length > 0 ? addressParts.join(', ') : '—';

  return (
    <div className="bg-[#f9f9f9] w-full min-h-screen fade-slide-in">
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12 md:gap-y-12
                   px-4 py-8 md:px-[120px] md:pt-[60px] md:pb-[120px] w-full"
        style={{ gridTemplateRows: 'repeat(7, fit-content(100%))' }}
      >

        {/* ── Row 1, Col 1: Page title + breadcrumb ── */}
        <div className="md:col-start-1 md:row-start-1 flex flex-col gap-4 md:gap-6 self-start">
          <p className="font-inter font-bold text-[32px] md:text-[48px] text-black leading-none">Profile</p>
          <div className="flex items-center gap-1">
            <p className="font-inter font-medium text-[12px] text-[#999] leading-5 tracking-[0.3883px] whitespace-nowrap">TotalCare</p>
            <BreadcrumbChevron />
            <p className="font-inter font-medium text-[12px] text-black leading-5 tracking-[0.3883px] whitespace-nowrap">Profile</p>
          </div>
        </div>

        {/* ── Row 2, Col 1: User avatar + welcome text ── */}
        <div className="md:col-start-1 md:row-start-2 flex items-center gap-6 md:gap-12">
          <div
            className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden flex-shrink-0"
            style={{ boxShadow: '0px 2px 16px rgba(0,65,114,0.08), inset 0px 0px 2px rgba(0,65,114,0.16)' }}
          >
            <AvatarSVG />
          </div>

          <div className="flex flex-1 flex-col gap-6 min-w-0">
            <p
              className="font-inter font-light text-[24px] md:text-[32px] leading-none"
              style={{
                background: 'linear-gradient(96deg, #B189FF 0%, #2E008B 96.07%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Welcome,
            </p>
            <p className="font-inter font-bold text-[24px] md:text-[32px] text-black leading-none">{fullName}</p>
            <p className="font-inter font-light text-[16px] text-black leading-7 tracking-[0.5184px]">CureBay · Total Care Member</p>
          </div>

          <IconBtn>
            <CameraIcon />
          </IconBtn>
        </div>

        {/* ── Row 2, Col 2: ABHA ── */}
        <div className="md:col-start-2 md:row-start-2 flex flex-col gap-3 self-start">
          <SectionHeader title="ABHA">
            <Chip variant="error" text="ABHA not created" />
            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 h-12 rounded-xl bg-[#004172] font-inter font-medium text-[16px] text-white leading-normal tracking-[0.2592px] whitespace-nowrap shrink-0"
              style={{ boxShadow: 'inset 0px 0px 2px rgba(0,65,114,0.08)' }}
            >
              Create ABHA
            </button>
          </SectionHeader>
          <SectionCard>
            <InfoRow label="ABHA ID :" value="—" />
            <Divider />
            <InfoRow label="ABHA Address :" value="—" />
          </SectionCard>
        </div>

        {/* ── Row 3, Col 1: Personal Information ── */}
        <div className="md:col-start-1 md:row-start-3 flex flex-col gap-3">
          <SectionHeader title="Personal Information">
            <IconBtn><EditIcon /></IconBtn>
          </SectionHeader>
          <SectionCard>
            <InfoRow label="First Name"    value={firstName} />
            <Divider />
            <InfoRow label="Last name"     value={lastName} />
            <Divider />
            <InfoRow label="Date of birth" value={dateOfBirth} />
            <Divider />
            <InfoRow label="Gender"        value={gender} />
            <Divider />
            <InfoRow label="Blood group"   value={bloodGroup} />
          </SectionCard>
          <p className="font-inter font-medium text-[12px] text-[#808080] leading-5 tracking-[0.3883px]">
            Your name appears on your Total Care membership and orders.
          </p>
        </div>

        {/* ── Row 3, Col 2: Addresses ── */}
        <div className="md:col-start-2 md:row-start-3 flex flex-col gap-3">
          <SectionHeader title="Addresses">
            <IconBtn><EditIcon /></IconBtn>
            <TextBtn>View All</TextBtn>
          </SectionHeader>
          <div
            className="bg-white rounded-[24px] p-6 flex flex-col gap-[22px] flex-1"
            style={{ boxShadow: 'inset 0px 0px 2px rgba(0,65,114,0.08)' }}
          >
            <div className="flex items-start gap-3 w-full">
              <div className="flex flex-1 flex-col gap-2 min-w-0">
                <p className="font-inter font-medium text-[14px] md:text-[16px] text-black leading-6 tracking-[0.5184px]">Home</p>
                <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] leading-5 tracking-[0.5184px]">{displayAddress || '123 Mango Lane, Bangalore, Karnataka 560001, India'}</p>
              </div>
              <Chip variant="info" text="Default" />
            </div>
            <Divider />
            <div className="flex items-start gap-3 w-full">
              <div className="flex flex-1 flex-col gap-2 min-w-0">
                <p className="font-inter font-medium text-[14px] md:text-[16px] text-black leading-6 tracking-[0.5184px]">Office</p>
                <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] leading-5 tracking-[0.5184px]">456 Coconut Ave, Mumbai, Maharashtra 400001, India</p>
              </div>
              <Chip variant="neutral" text="Other" />
            </div>
            <Divider />
          </div>
          <p className="font-inter font-medium text-[12px] text-[#808080] leading-5 tracking-[0.3883px]">
            Address cannot be changed after an order is dispatched.
          </p>
        </div>

        {/* ── Row 4, Col 1: Contact ── */}
        <div className="md:col-start-1 md:row-start-4 flex flex-col gap-3">
          <SectionHeader title="Contact">
            <IconBtn><EditIcon /></IconBtn>
          </SectionHeader>
          <SectionCard>
            <InfoRow label="Email"   value="—" />
            <Divider />
            <InfoRow label="Contact" value={displayPhone} />
          </SectionCard>
          <p className="font-inter font-medium text-[12px] text-[#808080] leading-5 tracking-[0.3883px]">
            Your email activates your Total Care membership. Changing it affects your login.
          </p>
        </div>

        {/* ── Row 4, Col 2: Subscription ── */}
        <div className="md:col-start-2 md:row-start-4 flex flex-col gap-3">
          {/* Mobile: title top, buttons below. Desktop: all one row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full">
            <p className="font-inter font-medium text-[18px] md:text-[24px] text-[#808080] leading-normal tracking-[0.3888px] shrink-0">
              Subscription
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <TextBtn>History</TextBtn>
              <FilledBtn>Manage Subscription</FilledBtn>
            </div>
          </div>
          <SectionCard>
            <div className="flex items-start gap-3 w-full">
              <div className="flex flex-1 flex-col gap-2 min-w-0">
                <p className="font-inter font-medium text-[14px] md:text-[16px] text-black leading-6 tracking-[0.5184px]">Quarterly Plan</p>
                <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] leading-5 tracking-[0.5184px]">Renews Aug 30, 2026 · ₹99/month</p>
              </div>
              <Chip variant="success" text="Active" />
            </div>
            <Divider />
            <div className="flex items-center gap-6 w-full">
              <p className="flex-1 font-inter font-medium text-[13px] md:text-[16px] text-[#808080] leading-5 tracking-[0.5184px]">73 of 90 days</p>
              <p className="font-inter font-medium text-[13px] md:text-[16px] text-black leading-5 tracking-[0.5184px]">81%</p>
            </div>
            <div className="w-full h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
              <div className="h-full bg-[#00b82e] rounded-full" style={{ width: '81%' }} />
            </div>
          </SectionCard>
          <p className="font-inter font-medium text-[12px] text-[#808080] leading-5 tracking-[0.3883px]">
            Your email activates your Total Care membership. Changing it affects your login.
          </p>
        </div>

        {/* ── Rows 5-7, Col 1: Orders (spans 3 rows) ── */}
        <div className="md:col-start-1 md:row-start-5 md:row-end-8 flex flex-col gap-3">
          <SectionHeader title="Orders">
            <TextBtn>History</TextBtn>
            <FilledBtn><span>Filter by</span><FilterIcon /></FilledBtn>
          </SectionHeader>
          <SectionCard>

            {/* Order 1 — single chip */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-12 w-full">
              <div className="flex flex-col gap-2 md:flex-1 min-w-0">
                <p className="font-inter font-medium text-[14px] md:text-[16px] text-black leading-6 tracking-[0.5184px]">Omron BP Monitor HEM-7141</p>
                <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] leading-5 tracking-[0.5184px]">#CB-2026-00847 · ₹1,800</p>
              </div>
              <Chip variant="neutral" text="Delivered · May 30, 2026" />
            </div>
            <Divider />

            {/* Order 2 — single chip */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-12 w-full">
              <div className="flex flex-col gap-2 md:flex-1 min-w-0">
                <p className="font-inter font-medium text-[14px] md:text-[16px] text-black leading-6 tracking-[0.5184px]">Smart Scale SC-150</p>
                <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] leading-5 tracking-[0.5184px]">#CB-2026-00831 · ₹2,499</p>
              </div>
              <Chip variant="warning" text="In transit · Arriving Jun 5" />
            </div>
            <Divider />

            {/* Order 3 — single chip */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-12 w-full">
              <div className="flex flex-col gap-2 md:flex-1 min-w-0">
                <p className="font-inter font-medium text-[14px] md:text-[16px] text-black leading-6 tracking-[0.5184px]">Smart Scale SC-150</p>
                <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] leading-5 tracking-[0.5184px]">#CB-2026-00831 · ₹2,499</p>
              </div>
              <Chip variant="warning" text="Out for delivery today" />
            </div>
            <Divider />

            {/* Order 4 — chip + sub-text */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-12 w-full">
              <div className="flex flex-col gap-2 md:flex-1 min-w-0">
                <p className="font-inter font-medium text-[14px] md:text-[16px] text-black leading-6 tracking-[0.5184px]">Smart Scale SC-150</p>
                <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] leading-5 tracking-[0.5184px]">#CB-2026-00831 · ₹2,499</p>
              </div>
              <div className="flex flex-col gap-2 self-start md:items-end shrink-0">
                <Chip variant="error" text="Delivery attempted · Jun 3" />
                <p className="font-inter font-medium text-[12px] text-[#808080] leading-5 tracking-[0.3883px]">Rescheduled Jun 4</p>
              </div>
            </div>
            <Divider />

            {/* Order 5 — chip + sub-text */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-12 w-full">
              <div className="flex flex-col gap-2 md:flex-1 min-w-0">
                <p className="font-inter font-medium text-[14px] md:text-[16px] text-black leading-6 tracking-[0.5184px]">Smart Scale SC-150</p>
                <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] leading-5 tracking-[0.5184px]">#CB-2026-00831 · ₹2,499</p>
              </div>
              <div className="flex flex-col gap-2 self-start md:items-end shrink-0">
                <Chip variant="error" text="Cancelled · Jun 1, 2026" />
                <p className="font-inter font-medium text-[12px] text-[#808080] leading-5 tracking-[0.3883px]">Refund ₹1,800 · In progress</p>
              </div>
            </div>
            <Divider />

            {/* Order 6 — chip + sub-text */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-12 w-full">
              <div className="flex flex-col gap-2 md:flex-1 min-w-0">
                <p className="font-inter font-medium text-[14px] md:text-[16px] text-black leading-6 tracking-[0.5184px]">Smart Scale SC-150</p>
                <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] leading-5 tracking-[0.5184px]">#CB-2026-00831 · ₹2,499</p>
              </div>
              <div className="flex flex-col gap-2 self-start md:items-end shrink-0">
                <Chip variant="warning" text="Damaged product · Under review" />
                <p className="font-inter font-medium text-[12px] text-[#808080] leading-5 tracking-[0.3883px]">Issue</p>
              </div>
            </div>
            <Divider />

            {/* Order 7 — chip + sub-text */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-12 w-full">
              <div className="flex flex-col gap-2 md:flex-1 min-w-0">
                <p className="font-inter font-medium text-[14px] md:text-[16px] text-black leading-6 tracking-[0.5184px]">Smart Scale SC-150</p>
                <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] leading-5 tracking-[0.5184px]">#CB-2026-00831 · ₹2,499</p>
              </div>
              <div className="flex flex-col gap-2 self-start md:items-end shrink-0">
                <Chip variant="success" text="Refund approved · ₹2,499" />
                <p className="font-inter font-medium text-[12px] text-[#808080] leading-5 tracking-[0.3883px]">Credit in 7–10 days</p>
              </div>
            </div>
            <Divider />

            {/* Order 8 — chip + sub-text */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-12 w-full">
              <div className="flex flex-col gap-2 md:flex-1 min-w-0">
                <p className="font-inter font-medium text-[14px] md:text-[16px] text-black leading-6 tracking-[0.5184px]">Smart Scale SC-150</p>
                <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] leading-5 tracking-[0.5184px]">#CB-2026-00831 · ₹2,499</p>
              </div>
              <div className="flex flex-col gap-2 self-start md:items-end shrink-0">
                <Chip variant="error" text="Refund request rejected" />
                <p className="font-inter font-medium text-[12px] text-[#808080] leading-5 tracking-[0.3883px]">Rejected</p>
              </div>
            </div>

          </SectionCard>
        </div>

        {/* ── Row 5, Col 2: Notifications ── */}
        <div className="md:col-start-2 md:row-start-5 flex flex-col gap-3 self-start">
          <SectionHeader title="Notifications" />
          <SectionCard>
            <NotifRow icon={<PackageIcon />}    label="Order updates"       on={true} />
            <Divider />
            <NotifRow icon={<MembershipIcon />} label="Subscription alerts" on={true} />
            <Divider />
            <NotifRow icon={<HeartRateIcon />}  label="Health reminders"    on={false} />
            <Divider />
            <NotifRow icon={<BellIcon />}       label="Promotions"          on={false} />
          </SectionCard>
        </div>

        {/* ── Row 6, Col 2: General ── */}
        <div className="md:col-start-2 md:row-start-6 flex flex-col gap-3 self-start">
          <SectionHeader title="General" />
          <SectionCard>
            {/* Language row */}
            <div className="flex items-center gap-3 md:gap-12 w-full">
              <div className="flex flex-1 items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#ebf8f3] shrink-0"
                  style={{ boxShadow: 'inset 0px 0px 2px rgba(0,65,114,0.08)' }}
                >
                  <LanguageIcon />
                </div>
                <p className="font-inter font-medium text-[16px] text-[#808080] leading-7 tracking-[0.5184px] whitespace-nowrap">Language</p>
              </div>
              <div className="flex flex-1 items-center justify-end gap-2 min-w-0">
                <p className="flex-1 font-inter font-medium text-[16px] text-black leading-7 tracking-[0.5184px] text-right">English</p>
                <button
                  type="button"
                  className="w-10 h-10 flex items-center justify-center rounded-full shrink-0"
                  style={{ boxShadow: '0px 2px 2px rgba(0,65,114,0.08)' }}
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
            <Divider />
            {/* Privacy & data row */}
            <div className="flex items-center gap-3 md:gap-12 w-full">
              <div className="flex flex-1 items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#ebf8f3] shrink-0"
                  style={{ boxShadow: 'inset 0px 0px 2px rgba(0,65,114,0.08)' }}
                >
                  <ShieldIcon />
                </div>
                <p className="font-inter font-medium text-[16px] text-[#808080] leading-7 tracking-[0.5184px] whitespace-nowrap">Privacy &amp; data</p>
              </div>
              <div className="flex items-center justify-end shrink-0">
                <button
                  type="button"
                  className="w-10 h-10 flex items-center justify-center rounded-full"
                  style={{ boxShadow: '0px 2px 2px rgba(0,65,114,0.08)' }}
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          </SectionCard>
          <p className="font-inter font-medium text-[12px] text-[#808080] leading-5 tracking-[0.3883px]">
            Your email activates your Total Care membership. Changing it affects your login.
          </p>
        </div>

        {/* ── Row 7, Col 2: Logout ── */}
        <div className="md:col-start-2 md:row-start-7 self-start w-full md:w-auto">
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center justify-center gap-2 h-12 w-full rounded-2xl bg-white font-inter font-medium text-[16px] text-[#d82525] leading-normal tracking-[0.2592px]"
            style={{ boxShadow: 'inset 0px 0px 2px rgba(0,65,114,0.08)' }}
          >
            Logout
            <LogoutIcon />
          </button>
        </div>

      </div>
    </div>
  );
}
