"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const navigation = {
  solutions: [
    { name: 'For Enterprise', href: '#' },
    { name: 'For Startups', href: '#' },
    { name: 'Talent Sourcing', href: '#' },
    { name: 'Screening', href: '#' },
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'API Status', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Contact Sales', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Press', href: '#' },
  ],
  legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
};

export default function EmployerFooter() {
  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y divide-gray-800 lg:divide-y-0 lg:divide-x border-x border-gray-800">

          {/* Brand Column */}
          <div className="py-16 lg:px-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center text-white font-bold rounded-none">J</div>
                <span className="text-xl font-black uppercase tracking-tighter text-white">JobPortal</span>
              </div>
              <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-xs">
                The platform for modern hiring teams. Built for speed and quality.
              </p>
            </div>
            <div className="mt-8">
              {/* Social placeholders or empty space */}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="py-16 lg:px-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 mb-8">Platform</h3>
            <ul role="list" className="space-y-4">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm font-bold text-gray-400 hover:text-white transition-colors block py-1 hover:translate-x-1 duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="py-16 lg:px-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 mb-8">Support</h3>
            <ul role="list" className="space-y-4">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm font-bold text-gray-400 hover:text-white transition-colors block py-1 hover:translate-x-1 duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe Column */}
          <div className="py-16 lg:px-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 mb-8">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-6 font-medium">Latest hiring trends, weekly.</p>
            <form className="group">
              <input
                type="email"
                className="w-full bg-gray-900 border border-gray-800 px-4 py-3 text-sm text-white focus:border-indigo-600 focus:ring-0 outline-none rounded-none placeholder:text-gray-600 mb-2 transition-colors"
                placeholder="Enter your email"
              />
              <Button className="w-full rounded-none bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white font-bold uppercase tracking-wide transition-all duration-300">
                Subscribe
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
            &copy; 2026 JobPortal Inc.
          </p>
          <div className="flex gap-8">
            {navigation.legal.map((item) => (
              <Link key={item.name} href={item.href} className="text-xs font-bold text-gray-600 hover:text-indigo-500 uppercase tracking-wider transition-colors">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
