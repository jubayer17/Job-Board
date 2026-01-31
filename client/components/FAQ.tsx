import React from 'react'
import { PlusSmallIcon, MinusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "How do I post a job?",
    answer:
      "Creating a job post is simple. Create an employer account, navigate to your dashboard, and click 'Post a Job'. Follow the step-by-step guide to detail your requirements.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, bKash, Nagad, and bank transfers for corporate accounts. All transactions are secured and encrypted.",
  },
  {
    question: "Can I edit my job post after publishing?",
    answer:
      "Yes, you can edit your job post at any time from your employer dashboard. Changes are reflected instantly on the live site.",
  },
  {
    question: "How long does a job post stay active?",
    answer:
      "Standard job posts remain active for 30 days. You can choose to extend the duration or upgrade to a premium listing for longer visibility.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a satisfaction guarantee. If you're not satisfied with the service within the first 48 hours of posting, contact support for a full refund.",
  },
]

export default function FAQ() {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-200">
          <div className="mb-12">
             <h2 className="text-3xl font-bold leading-10 tracking-tight text-gray-900 uppercase">Frequently asked questions</h2>
             <div className="h-1 w-20 bg-indigo-600 mt-4"></div>
          </div>
         
          <dl className="mt-10 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <div key={faq.question} className="pt-6 group">
                <dt>
                  <div className="flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base font-bold leading-7 uppercase tracking-wide group-hover:text-indigo-600 transition-colors">{faq.question}</span>
                  </div>
                </dt>
                <dd className="mt-2 pr-12">
                  <p className="text-base leading-7 text-gray-600 font-light">{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
