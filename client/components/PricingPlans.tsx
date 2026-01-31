import React from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'

const tiers = [
  {
    name: 'Basic',
    id: 'tier-basic',
    href: '#',
    priceMonthly: 'Free',
    description: 'Everything necessary to get started.',
    features: ['5 Job Postings', 'Basic Analytics', '48-Hour Support Response', 'Standard Listing Visibility'],
    mostPopular: false,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '৳5,000',
    description: 'For growing teams hiring frequently.',
    features: [
      'Unlimited Job Postings',
      'Advanced Analytics & Reporting',
      '1-Hour Support Response',
      'Featured Listing Visibility',
      'Dedicated Account Manager',
      'API Access',
    ],
    mostPopular: true,
  },
  {
    name: 'Corporate',
    id: 'tier-corporate',
    href: '#',
    priceMonthly: 'Custom',
    description: 'Dedicated support and infrastructure.',
    features: [
      'Unlimited Job Postings',
      'Custom Integration',
      '24/7 Priority Support',
      'Global Reach',
      'Custom Branding',
      'Bulk Data Export',
    ],
    mostPopular: false,
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function PricingPlans() {
  return (
    <div className="bg-white py-24 sm:py-32 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-bold leading-7 text-indigo-600 uppercase tracking-widest">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl uppercase">
            Pricing plans for teams of all sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 font-light">
          Choose the perfect plan to streamline your hiring process. No hidden fees.
        </p>
        
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'ring-2 ring-indigo-600 bg-gray-50' : 'ring-1 ring-gray-200',
                'p-8 xl:p-10 transition-all duration-300 hover:shadow-xl'
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                    'text-lg font-bold leading-8 uppercase tracking-wide'
                  )}
                >
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <span className="bg-indigo-600/10 text-indigo-600 text-xs font-bold leading-5 uppercase tracking-widest py-1 px-3 border border-indigo-600">
                    Most popular
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.priceMonthly}</span>
                {tier.priceMonthly !== 'Custom' && <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>}
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 bg-white',
                  'mt-6 block px-3 py-4 text-center text-sm font-bold leading-6 uppercase tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors'
                )}
              >
                Buy plan
              </a>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
