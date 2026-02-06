"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function EmployerCTA() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 border-b border-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">

          {/* Text Content */}
          <div className="max-w-xl lg:max-w-lg">
            <div className="inline-flex items-center gap-x-2 border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-6">
              <span className="h-1.5 w-1.5 bg-indigo-500"></span>
              Ready to scale?
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl">
              Start Hiring <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Top Talent Today
              </span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Join thousands of forward-thinking companies building their future with our platform. First job post is on us.
            </p>

            <div className="mt-8 flex items-center gap-x-6">
              <Link href="/employer/auth/sign-up">
                <Button size="lg" className="rounded-none bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 h-14 px-8 text-sm font-bold uppercase tracking-wider">
                  Create Account <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/employer/auth/login">
                <Button variant="link" className="text-sm font-bold uppercase tracking-wider text-white hover:text-indigo-400 p-0">
                  Log In Existing Account
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual/Abstract Graphic */}
          <div className="flex items-start justify-end lg:order-last">
            <div className="relative w-full max-w-sm">
              {/* Main Card */}
              <div className="relative z-10 bg-white p-8 border-2 border-indigo-500 shadow-[16px_16px_0px_0px_rgba(79,70,229,0.2)]">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-8 w-8 bg-indigo-600"></div>
                  <div className="h-2 w-24 bg-gray-200"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-3/4 bg-gray-900"></div>
                  <div className="h-4 w-1/2 bg-gray-300"></div>
                  <div className="h-4 w-5/6 bg-gray-200"></div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-100 flex justify-between items-center">
                  <div className="h-8 w-24 bg-indigo-100"></div>
                  <div className="h-8 w-8 rounded-full bg-gray-900"></div>
                </div>
              </div>

              {/* Background Decor */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-600/20 pattern-grid-lg"></div>
              <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-gray-700 z-0"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Background Gradients */}
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-10"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
