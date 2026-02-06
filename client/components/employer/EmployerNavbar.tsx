"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmployerNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 text-white font-bold text-xl rounded-none transform group-hover:rotate-3 transition-transform duration-300">
              J
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-gray-900 uppercase leading-none">
                JobPortal
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase leading-none mt-1">
                Employer
              </span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-indigo-600 transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-indigo-600 transition-colors">
            Pricing
          </Link>
          <Link href="#resources" className="text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-indigo-600 transition-colors">
            Resources
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/employer/auth/login">
            <Button variant="ghost" className="rounded-none text-sm font-bold uppercase tracking-wider text-gray-600 hover:text-indigo-600 hover:bg-transparent px-2">
              Log in
            </Button>
          </Link>
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          <Link href="/employer/auth/sign-up">
            <Button className="rounded-none bg-indigo-600 hover:bg-gray-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-bold uppercase tracking-wider px-6 py-5">
              Start Hiring
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
