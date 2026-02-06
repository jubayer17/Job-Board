"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function EmployerHero() {
  return (
    <div className="relative isolate bg-white border-b border-gray-100">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl py-24 sm:py-32 lg:pt-40 lg:pb-32 text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="relative inline-flex items-center gap-x-2 border border-gray-900 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gray-900 transition-transform hover:-translate-y-1">
              <span className="h-1.5 w-1.5 bg-indigo-600"></span>
              For Ambitious Companies
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl font-black uppercase tracking-tighter text-gray-900 sm:text-7xl lg:text-8xl leading-[0.9]">
            Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
              Dream Team
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 text-lg font-medium leading-8 text-gray-600 max-w-2xl mx-auto">
            Access a curated network of top-tier talent. Streamline your hiring process with our precision-engineered platform designed for modern recruitment.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/employer/jobs/create">
              <Button size="lg" className="rounded-none bg-indigo-600 hover:bg-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 h-14 px-8 text-sm font-bold uppercase tracking-wider">
                Post a Job Now <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/employer/auth/sign-up">
              <Button variant="outline" size="lg" className="rounded-none border-2 border-gray-900 text-gray-900 hover:bg-gray-50 h-14 px-8 text-sm font-bold uppercase tracking-wider">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Stats/Social Proof */}
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-3 lg:grid-cols-3 border-t border-gray-200 pt-10">
            <div className="flex flex-col gap-y-1 border-l-2 border-indigo-600 pl-6 text-left">
              <dt className="text-sm leading-6 text-gray-600 font-bold uppercase tracking-wider">Active Candidates</dt>
              <dd className="order-first text-3xl font-black tracking-tight text-gray-900">10k+</dd>
            </div>
            <div className="flex flex-col gap-y-1 border-l-2 border-indigo-600 pl-6 text-left">
              <dt className="text-sm leading-6 text-gray-600 font-bold uppercase tracking-wider">Companies Hiring</dt>
              <dd className="order-first text-3xl font-black tracking-tight text-gray-900">500+</dd>
            </div>
            <div className="flex flex-col gap-y-1 border-l-2 border-indigo-600 pl-6 text-left">
              <dt className="text-sm leading-6 text-gray-600 font-bold uppercase tracking-wider">Successful Hires</dt>
              <dd className="order-first text-3xl font-black tracking-tight text-gray-900">98%</dd>
            </div>
          </dl>
        </div>

        {/* Abstract UI Representation - Sharp & Geometric */}
        <div className="relative mx-auto max-w-5xl mt-8 lg:mt-0 pb-16">
          <div className="relative border-2 border-gray-900 bg-white p-2 shadow-[8px_8px_0px_0px_rgba(79,70,229,0.3)]">
            <div className="border border-gray-200 bg-gray-50 p-6 sm:p-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Mock Job Card 1 */}
                <div className="bg-white border border-gray-200 p-6 hover:border-indigo-600 transition-colors cursor-pointer group">
                  <div className="h-10 w-10 bg-indigo-100 flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                    <span className="font-bold text-indigo-600 group-hover:text-white">Sr</span>
                  </div>
                  <h3 className="font-bold text-gray-900 uppercase tracking-tight">Senior Engineer</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-4 uppercase tracking-wider">Tech Corp • Remote</p>
                  <div className="flex items-center text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    View Applicants <ArrowRightIcon className="ml-1 h-3 w-3" />
                  </div>
                </div>
                {/* Mock Job Card 2 */}
                <div className="bg-white border border-gray-200 p-6 hover:border-indigo-600 transition-colors cursor-pointer group">
                  <div className="h-10 w-10 bg-pink-100 flex items-center justify-center mb-4 group-hover:bg-pink-600 transition-colors">
                    <span className="font-bold text-pink-600 group-hover:text-white">Pd</span>
                  </div>
                  <h3 className="font-bold text-gray-900 uppercase tracking-tight">Product Designer</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-4 uppercase tracking-wider">Studio X • NYC</p>
                  <div className="flex items-center text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    View Applicants <ArrowRightIcon className="ml-1 h-3 w-3" />
                  </div>
                </div>
                {/* Mock Job Card 3 */}
                <div className="bg-white border border-gray-200 p-6 hover:border-indigo-600 transition-colors cursor-pointer group hidden sm:block">
                  <div className="h-10 w-10 bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <span className="font-bold text-blue-600 group-hover:text-white">Mk</span>
                  </div>
                  <h3 className="font-bold text-gray-900 uppercase tracking-tight">Marketing Lead</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-4 uppercase tracking-wider">Growth Co • London</p>
                  <div className="flex items-center text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    View Applicants <ArrowRightIcon className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-12 -right-12 h-24 w-24 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] bg-[size:10px_10px] opacity-20"></div>
          <div className="absolute -bottom-6 -left-6 h-32 w-32 border-2 border-gray-900 z-[-1]"></div>
        </div>
      </div>
    </div>
  );
}
