import { useState } from 'react';

// ── Mock data ─────────────────────────────────────────────────────────────

const PROFILE = {
  name: 'Nishant Jagtap',
  member: 'CureBay - Total Care Member',
  status: 'Active',
  abha: { id: '00000 00000', address: '00000000000' },
  personal: {
    firstName: 'Nishant',
    lastName:  'Jagtap',
    phone:     '+91 00000 00000',
    gender:    'Male',
    dob:       '03 May 2003',
    doctor:    'Enter',
    bloodGroup:'B+',
  },
  addresses: [
    { id: 1, type: 'Home',   text: '123 Annual Lane, Bengaluru, Karnataka 560001, India',    isDefault: true  },
    { id: 2, type: 'Office', text: '456 Commerce Ave, Mumbai, Maharashtra 400001, India',     isDefault: false },
  ],
  contact: {
    email: 'abc.def@curebay.com',
    phone: '+91 00000 00000',
  },
  subscription: {
    plan:     'Quarterly Plan',
    validFrom:'Aug 28, 2024',
    validTo:  'Subsequent',
    amount:   '₹975',
    progress: 72,
    total:    90,
  },
  language: 'English',
};

const ORDERS = [
  { id: 1, name: 'Omron BP Monitor HEM 7141', orderId: '#CB 1234-12345', price: '₹ 999', label: 'Delivery: Apr 26, 2025',    color: 'green'  },
  { id: 2, name: 'Smart Scale BJ-760',         orderId: '#CB 1234-12345', price: '₹ 999', label: 'Delivery: Upcoming',         color: 'orange' },
  { id: 3, name: 'Smart Scale BJ-760',         orderId: '#CB 1234-12345', price: '₹ 999', label: 'Delivery Unsuccessful',      color: 'red'    },
  { id: 4, name: 'Smart Scale BJ-760',         orderId: '#CB 1234-12345', price: '₹ 999', label: 'Payment: Lost Card',         color: 'blue'   },
  { id: 5, name: 'Smart Scale BJ-760',         orderId: '#CB 1234-12345', price: '₹ 999', label: 'Arrival Date',               color: 'green'  },
  { id: 6, name: 'Smart Scale BJ-760',         orderId: '#CB 1234-12345', price: '₹ 999', label: 'Subscription',               color: 'teal'   },
  { id: 7, name: 'Smart Scale BJ-760',         orderId: '#CB 1234-12345', price: '₹ 999', label: 'Not dispatched (order)',     color: 'red'    },
];

const NOTIF_CONFIG = [
  { key: 'orderUpdates',       label: 'Order updates',       desc: 'Get notified about your order status'     },
  { key: 'subscriptionAlerts', label: 'Subscription alerts', desc: 'Renewal and plan update notifications'    },
  { key: 'healthSummary',      label: 'Health summary',      desc: 'Weekly health insights and reports'        },
  { key: 'promotions',         label: 'Promotions',          desc: 'Offers, discounts and special deals'       },
];

// ── Design tokens ─────────────────────────────────────────────────────────

const STATUS_CLS = {
  green:  'bg-[#e6f9ef] text-[#00B82E] border border-[#00B82E]/30',
  orange: 'bg-[#fff7e6] text-[#F59E0B] border border-[#F59E0B]/30',
  red:    'bg-[#fef2f2] text-[#d82525] border border-[#d82525]/30',
  blue:   'bg-[#edf9ff] text-[#0185DE] border border-[#0185DE]/30',
  teal:   'bg-[#e6f7fa] text-[#008eb1] border border-[#008eb1]/30',
};

// ── Primitive components ──────────────────────────────────────────────────

function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-[rgba(0,65,114,0.08)] shadow-[0px_1px_4px_rgba(0,65,114,0.04)] ${className}`}>
      {children}
    </div>
  );
}

function SecHead({ title, children }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h3 className="font-inter font-semibold text-[15px] leading-normal text-[#1a1a1a] tracking-[0.2px]">
        {title}
      </h3>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}

function EditBtn({ label = 'Edit' }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="text-[#004172] hover:opacity-70 transition-opacity"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </button>
  );
}

function Field({ label, value }) {
  return (
    <div className="flex flex-col gap-[5px]">
      <span className="font-inter font-normal text-[11px] text-[#808080] leading-normal uppercase tracking-[0.6px]">
        {label}
      </span>
      <span className="font-inter font-medium text-[14px] text-[#1a1a1a] leading-normal">
        {value || '—'}
      </span>
    </div>
  );
}

function StatusChip({ label, color }) {
  return (
    <span className={`inline-flex items-center px-3 py-[3px] rounded-full font-inter font-medium text-[11px] leading-normal whitespace-nowrap flex-shrink-0 ${STATUS_CLS[color] ?? STATUS_CLS.green}`}>
      {label}
    </span>
  );
}

function Toggle({ checked, onToggle }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      className={`relative w-[42px] h-[24px] rounded-full transition-colors duration-200 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172] ${checked ? 'bg-[#004172]' : 'bg-[#d1d5db]'}`}
    >
      <span
        className={`absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? 'translate-x-[21px]' : 'translate-x-[3px]'}`}
      />
    </button>
  );
}

function ChevronRight({ className = '' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function OutlineBtn({ children, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-inter font-medium text-[12px] leading-normal border rounded-full px-3 py-1 transition-colors whitespace-nowrap ${className}`}
    >
      {children}
    </button>
  );
}

function SolidBtn({ children, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-inter font-medium text-[12px] leading-normal rounded-full px-3 py-1 transition-colors whitespace-nowrap ${className}`}
    >
      {children}
    </button>
  );
}

// ── Main ProfilePage ──────────────────────────────────────────────────────

export default function ProfilePage({ onClose }) {
  const [notifs, setNotifs] = useState({
    orderUpdates:       true,
    subscriptionAlerts: true,
    healthSummary:      false,
    promotions:         false,
  });

  const toggleNotif = (key) =>
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));

  const px = 'px-[120px] xl:px-[120px] lg:px-16 md:px-8 sm:px-5';

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-inter">

      {/* ── Page title bar ── */}
      <div className={`bg-white border-b border-[rgba(0,65,114,0.08)] ${px} py-5`}>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Back to home"
            className="text-[#004172] hover:opacity-70 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <div>
            <h1 className="font-inter font-bold text-[26px] leading-tight text-[#1a1a1a]">
              Profile
            </h1>
            <p className="font-inter font-medium text-[12px] text-[#00B82E] leading-normal mt-0.5">
              {PROFILE.status}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className={`${px} py-7 flex flex-col gap-4 max-w-[1440px] mx-auto`}>

        {/* Row 1: User card + ABHA */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">

          {/* User card */}
          <Card className="flex items-start gap-4 p-6">
            <div className="w-[68px] h-[68px] rounded-full bg-gradient-to-br from-[#004172] to-[#008eb1] flex items-center justify-center flex-shrink-0 shadow-[0px_2px_8px_rgba(0,65,114,0.20)]">
              <span className="font-inter font-bold text-[22px] text-white select-none">NJ</span>
            </div>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <p className="font-inter font-normal text-[12px] text-[#808080]">Welcome,</p>
              <h2 className="font-inter font-bold text-[20px] text-[#1a1a1a] leading-snug truncate">
                {PROFILE.name}
              </h2>
              <p className="font-inter font-normal text-[12px] text-[#808080] mt-0.5">
                {PROFILE.member}
              </p>
            </div>
            <EditBtn />
          </Card>

          {/* ABHA card */}
          <Card className="p-6">
            <SecHead title="ABHA">
              <OutlineBtn className="text-[#d82525] border-[#d82525]/40 hover:bg-[#fef2f2]">
                Add to portal
              </OutlineBtn>
              <SolidBtn className="text-white bg-[#004172] hover:bg-[#003059]">
                Create ABHA
              </SolidBtn>
            </SecHead>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-8 gap-y-4">
              <Field label="ABHA ID"      value={PROFILE.abha.id}      />
              <Field label="ABHA Address" value={PROFILE.abha.address} />
            </div>
          </Card>
        </div>

        {/* Personal Information */}
        <Card className="p-6">
          <SecHead title="Personal Information">
            <EditBtn />
          </SecHead>
          <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-8 gap-y-5">
            <Field label="First Name"    value={PROFILE.personal.firstName}  />
            <Field label="Last Name"     value={PROFILE.personal.lastName}   />
            <Field label="Gender"        value={PROFILE.personal.gender}     />
            <Field label="Phone Number"  value={PROFILE.personal.phone}      />
            <Field label="Date of Birth" value={PROFILE.personal.dob}        />
            <Field label="Doctor"        value={PROFILE.personal.doctor}     />
            <Field label="Blood Group"   value={PROFILE.personal.bloodGroup} />
          </div>
        </Card>

        {/* Addresses */}
        <Card className="p-6">
          <SecHead title="Addresses">
            <button type="button" className="font-inter font-medium text-[13px] text-[#004172] hover:underline">
              View All
            </button>
            <EditBtn />
          </SecHead>
          <div className="flex flex-col gap-3">
            {PROFILE.addresses.map((addr) => (
              <div
                key={addr.id}
                className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[#f8fafc] border border-[rgba(0,65,114,0.07)]"
              >
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <span className="font-inter font-semibold text-[13px] text-[#004172]">{addr.type}</span>
                  <p className="font-inter font-normal text-[13px] text-[#4d4d4d] leading-relaxed">{addr.text}</p>
                </div>
                {addr.isDefault && (
                  <OutlineBtn className="text-[#004172] border-[#004172]/30 hover:bg-[#edf9ff] self-center">
                    Select
                  </OutlineBtn>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Contact */}
        <Card className="p-6">
          <SecHead title="Contact">
            <EditBtn />
          </SecHead>
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-8 gap-y-5">
            <Field label="Email"   value={PROFILE.contact.email} />
            <Field label="Contact" value={PROFILE.contact.phone} />
          </div>
        </Card>

        {/* Subscription */}
        <Card className="p-6">
          <SecHead title="Subscription">
            <button type="button" className="font-inter font-medium text-[13px] text-[#808080] hover:text-[#004172] transition-colors">
              History
            </button>
            <SolidBtn className="text-white bg-[#004172] hover:bg-[#003059]">
              Manage Subscription
            </SolidBtn>
          </SecHead>
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-inter font-semibold text-[15px] text-[#1a1a1a]">{PROFILE.subscription.plan}</p>
                <p className="font-inter font-normal text-[12px] text-[#808080] mt-1">
                  Valid {PROFILE.subscription.validFrom} – {PROFILE.subscription.validTo}
                </p>
              </div>
              <span className="font-inter font-bold text-[22px] text-[#004172] flex-shrink-0">
                {PROFILE.subscription.amount}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#004172] rounded-full"
                  style={{ width: `${PROFILE.subscription.progress}%` }}
                />
              </div>
              <p className="font-inter font-normal text-[11px] text-[#808080]">
                {PROFILE.subscription.progress} of {PROFILE.subscription.total} days
              </p>
            </div>
          </div>
        </Card>

        {/* Orders */}
        <Card className="p-6">
          <SecHead title="Orders">
            <button type="button" className="font-inter font-medium text-[13px] text-[#808080] hover:text-[#004172] transition-colors">
              History
            </button>
            <button type="button" className="font-inter font-medium text-[13px] text-[#808080] hover:text-[#004172] transition-colors flex items-center gap-1">
              Filter by <ChevronRight />
            </button>
          </SecHead>
          <div className="flex flex-col divide-y divide-[rgba(0,65,114,0.06)]">
            {ORDERS.map((order) => (
              <div key={order.id} className="flex items-center justify-between gap-4 py-[14px]">
                <div className="flex flex-col gap-[3px] min-w-0 flex-1">
                  <p className="font-inter font-medium text-[14px] text-[#1a1a1a] leading-snug truncate">
                    {order.name}
                  </p>
                  <p className="font-inter font-normal text-[12px] text-[#808080]">
                    {order.orderId}&nbsp;&nbsp;|&nbsp;&nbsp;{order.price}
                  </p>
                </div>
                <StatusChip label={order.label} color={order.color} />
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <SecHead title="Notifications" />
          <div className="flex flex-col gap-5">
            {NOTIF_CONFIG.map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between gap-6">
                <div>
                  <p className="font-inter font-medium text-[14px] text-[#1a1a1a] leading-snug">{label}</p>
                  <p className="font-inter font-normal text-[12px] text-[#808080] mt-0.5">{desc}</p>
                </div>
                <Toggle checked={notifs[key]} onToggle={() => toggleNotif(key)} />
              </div>
            ))}
          </div>
        </Card>

        {/* General */}
        <Card className="p-6">
          <SecHead title="General" />
          <div className="flex flex-col divide-y divide-[rgba(0,65,114,0.06)]">

            {/* Language */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#808080" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className="font-inter font-medium text-[14px] text-[#1a1a1a]">Language</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#808080]">
                <span className="font-inter font-normal text-[13px]">{PROFILE.language}</span>
                <ChevronRight />
              </div>
            </div>

            {/* Privacy & data */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#808080" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="font-inter font-medium text-[14px] text-[#1a1a1a]">Privacy & data</span>
              </div>
              <ChevronRight className="text-[#808080]" />
            </div>
          </div>

          <p className="font-inter font-normal text-[12px] text-[#808080] mt-4 leading-relaxed">
            By clicking the below you agree to our{' '}
            <button type="button" className="text-[#004172] underline hover:opacity-80 transition-opacity">
              Terms and Conditions
            </button>
          </p>
        </Card>

        {/* Logout */}
        <div className="flex justify-end pb-8">
          <button
            type="button"
            className="flex items-center gap-2 font-inter font-semibold text-[15px] text-[#d82525] hover:opacity-75 transition-opacity"
          >
            Logout
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
