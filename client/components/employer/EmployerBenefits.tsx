"use client";

import {
  BoltIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  FunnelIcon
} from "@heroicons/react/24/outline";

const benefits = [
  {
    title: "Instant Hiring",
    description: "Automated screening tools reduce time-to-hire by 50%.",
    icon: BoltIcon,
  },
  {
    title: "Verified Talent",
    description: "Every candidate is pre-vetted for skills and identity.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Cost Control",
    description: "Flexible pricing plans that scale with your hiring needs.",
    icon: CurrencyDollarIcon,
  },
  {
    title: "Smart Filtering",
    description: "Advanced filters to find the perfect match in seconds.",
    icon: FunnelIcon,
  },
  {
    title: "Company Brand",
    description: "Customizable profile to showcase your unique culture.",
    icon: UserCircleIcon,
  },
  {
    title: "Priority Support",
    description: "24/7 dedicated support team ready to assist you.",
    icon: ChatBubbleLeftRightIcon,
  },
];

export default function EmployerBenefits() {
  return (
    <section className="bg-white py-24 sm:py-32 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 sm:text-5xl">
            Why Companies <span className="text-indigo-600">Choose Us</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 font-medium">
            Built for speed, reliability, and quality.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group relative bg-gray-50 p-8 transition-all duration-300 hover:bg-indigo-600 hover:-translate-y-2"
            >
              {/* Border Decor */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 group-hover:bg-white/20 transition-colors"></div>

              {/* Icon */}
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center bg-white border border-gray-200 text-indigo-600 shadow-sm group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20 transition-colors">
                <benefit.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold uppercase tracking-tight text-gray-900 mb-3 group-hover:text-white transition-colors">
                {benefit.title}
              </h3>
              <p className="text-sm font-medium leading-relaxed text-gray-500 group-hover:text-indigo-100 transition-colors">
                {benefit.description}
              </p>

              {/* Number */}
              <span className="absolute top-8 right-8 text-xs font-bold text-gray-300 group-hover:text-white/30 transition-colors">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
