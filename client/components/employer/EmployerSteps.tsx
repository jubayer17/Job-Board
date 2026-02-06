"use client";

import { CheckIcon } from "@heroicons/react/24/outline";

const steps = [
  {
    id: "01",
    title: "Create Account",
    description: "Sign up in seconds. Configure your company branding, verified details, and recruitment preferences.",
    status: "done",
  },
  {
    id: "02",
    title: "Post Job",
    description: "Use our precision editor to create compelling job listings. Set requirements, perks, and salary ranges.",
    status: "current",
  },
  {
    id: "03",
    title: "Hire Talent",
    description: "Review AI-matched candidates, schedule interviews, and send offers directly through the platform.",
    status: "upcoming",
  },
];

export default function EmployerSteps() {
  return (
    <div className="bg-white py-24 sm:py-32 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <div className="inline-flex items-center gap-x-2 border border-gray-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">
            <span className="h-1.5 w-1.5 bg-indigo-600"></span>
            Process Flow
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900 sm:text-5xl">
            How It Works
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 font-medium">
            A streamlined workflow designed for speed and precision.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="relative">
            {/* Main Vertical Tree Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 md:left-1/2 md:-ml-px"></div>

            <div className="space-y-12">
              {steps.map((step, stepIdx) => (
                <div key={step.id} className="relative group">

                  {/* Tree Node / Connector */}
                  <div className="absolute left-8 top-8 -ml-3 h-6 w-6 rounded-none border-2 border-indigo-600 bg-white z-10 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300 md:left-1/2 md:top-1/2 md:-mt-3">
                    <div className="absolute inset-0.5 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Connecting Horizontal Line (Desktop) */}
                  <div className={`hidden md:block absolute top-1/2 h-px w-8 bg-indigo-600 transition-all duration-300 group-hover:w-12 ${stepIdx % 2 === 0 ? 'right-1/2 mr-3' : 'left-1/2 ml-3'}`}></div>

                  {/* Card Container */}
                  <div className={`flex flex-col md:flex-row items-center ${stepIdx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                    {/* Spacer for the other side of the tree */}
                    <div className="flex-1 hidden md:block"></div>

                    {/* The Card */}
                    <div className="flex-1 ml-24 md:ml-0">
                      <div className={`relative bg-white border-2 border-gray-900 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(79,70,229,1)] group ${stepIdx % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>

                        {/* Connector Line (Mobile) */}
                        <div className="absolute top-8 -left-16 h-px w-16 bg-gray-300 md:hidden"></div>

                        {/* Step Number */}
                        <div className="absolute -top-5 -right-5 bg-indigo-600 text-white text-lg font-black py-2 px-4 border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          {step.id}
                        </div>

                        <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-sm font-medium leading-6 text-gray-500">
                          {step.description}
                        </p>

                        {/* Tech Decor */}
                        <div className="absolute bottom-2 right-2 flex gap-1">
                          <div className="h-1 w-1 bg-gray-200"></div>
                          <div className="h-1 w-1 bg-gray-200"></div>
                          <div className="h-1 w-1 bg-gray-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* End Node */}
            <div className="absolute left-8 bottom-0 -ml-1.5 h-3 w-3 border-2 border-gray-300 bg-white md:left-1/2 md:-ml-1.5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
