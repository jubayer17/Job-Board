"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import EmployerNavbar from "./_components/EmployerNavbar";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/employer/auth");
  const isLandingPage = pathname === "/employer";

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthPage || isLandingPage ? (
        <main className="flex-1">{children}</main>
      ) : (
        <>
          {/* Mobile sidebar */}
          <div className="lg:hidden">
            <Dialog as="div" className="relative z-40 lg:hidden" open={sidebarOpen} onClose={setSidebarOpen}>
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />

              <div className="fixed inset-0 z-40 flex">
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <span className="text-xl font-bold tracking-tight text-indigo-600 uppercase">
                      JobPortal
                    </span>
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <Sidebar />
                  </div>
                </Dialog.Panel>
              </div>
            </Dialog>
          </div>

          {/* Desktop sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="lg:pl-64 flex flex-col min-h-screen">
            <EmployerNavbar onOpenSidebar={() => setSidebarOpen(true)} />
            <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </>
      )}
    </div>
  );
}
