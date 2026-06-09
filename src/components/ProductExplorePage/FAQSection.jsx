import { useState } from "react";

const FAQS = [
  {
    q: "What features does the Omron BP HM-7141 offer for monitoring blood pressure?",
    a: "The Omron BP HM-7141 offers several key features including clinically validated accuracy, irregular heartbeat detection (IHB), a dual-user mode supporting up to 200 memory readings per user, and seamless Bluetooth sync with the Omron connect app. The large display shows systolic, diastolic, and pulse readings simultaneously, making it easy to track trends over time.",
  },
  {
    q: "How does the subscription plan work for the Omron Smart Scale?",
    a: "With your bundle purchase, you receive 3 months of TotalCare subscription for free. After the trial, you can continue at a discounted subscriber rate which unlocks AI health insights, doctor consultations, and continuous monitoring alerts.",
  },
  {
    q: "What advantages come with purchasing the Omron BP HM-7141 and Smart Scale bundle?",
    a: "The bundle gives you a complete cardiovascular and body composition monitoring system at ₹3,899 — saving ₹3,260 vs buying separately at market prices. You also get the TotalCare subscription FREE, giving you AI insights and access to health professionals.",
  },
  {
    q: "How can I easily order the Omron BP HM-7141 and Smart Scale online?",
    a: "Simply click \"Add to Cart\" on this page, complete your shipping details, and choose your preferred payment method. We support UPI, credit/debit cards, and EMI options.",
  },
  {
    q: "Is it possible to track my order for the Omron BP HM-7141 and Smart Scale in real-time?",
    a: "Yes! Once your order is confirmed, you will receive an SMS and email with a tracking link. You can monitor your package in real-time through our delivery partner portal.",
  },
  {
    q: "What emergency health features are available with the Omron app?",
    a: "The TotalCare app includes emergency alert features that notify your family members or caretakers if your readings fall outside safe ranges. You can also set custom alert thresholds.",
  },
  {
    q: "Can I request ambulance services through the Omron health app?",
    a: "The TotalCare platform includes an SOS feature that can connect you to emergency medical services. This feature is available to active subscribers in supported cities.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full bg-[#f9f9f9]">
      <div className="px-4 md:px-8 lg:px-16 xl:px-[120px] py-[60px] md:py-[100px] lg:py-[150px]">
        <div className="flex flex-col gap-[60px]">
          {/* Heading */}
          <div>
            <p className="font-inter font-bold text-[48px] md:text-[64px] lg:text-[96px] text-[#808080] leading-tight">
              Question ?
            </p>
            <p className="font-inter font-bold text-[48px] md:text-[64px] lg:text-[96px] text-black leading-tight">
              Answers
            </p>
          </div>

          {/* Accordion */}
          <div className="flex flex-col divide-y divide-[#e5e5e5]">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="py-6 cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex justify-between items-center gap-4">
                  <p className="font-inter font-medium text-[16px] md:text-[20px] text-black">
                    {faq.q}
                  </p>
                  {/* Chevron icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="#808080"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {openIndex === i && (
                  <p className="font-inter font-light text-[16px] leading-7 text-[#808080] mt-4">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
