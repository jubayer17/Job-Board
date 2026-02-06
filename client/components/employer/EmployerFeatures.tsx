"use client";

import {
  BriefcaseIcon,
  UserGroupIcon,
  SparklesIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Post Jobs Easily",
    description: "Create detailed job postings in minutes with our intuitive editor and reach thousands of candidates instantly.",
    icon: BriefcaseIcon,
    stat: "5 min setup",
  },
  {
    name: "Applicant Tracking",
    description: "Manage your hiring pipeline efficiently. Track status, schedule interviews, and make notes in one place.",
    icon: UserGroupIcon,
    stat: "Zero chaos",
  },
  {
    name: "Smart Matching",
    description: "Our AI-powered algorithm matches your job requirements with the most suitable candidates automatically.",
    icon: SparklesIcon,
    stat: "98% accuracy",
  },
  {
    name: "Analytics Dashboard",
    description: "Gain insights into your hiring process with detailed analytics on views, applications, and conversion rates.",
    icon: ChartBarIcon,
    stat: "Real-time data",
  },
];

export default function EmployerFeatures() {
  return (
    <div className="bg-white py-24 sm:py-32 border-b border-gray-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-x-2 border border-gray-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              <span className="h-1.5 w-1.5 bg-indigo-600"></span>
              Powerful Tools
            </div>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 sm:text-5xl">
            Everything you need <br />
            <span className="text-indigo-600">to scale your team</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 font-medium max-w-xl mx-auto">
            Streamline your recruitment process with our comprehensive suite of tools designed for modern hiring teams.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-200">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className="group relative border-r border-b border-gray-200 bg-white p-8 sm:p-10 hover:bg-gray-50 transition-colors duration-300"
              >
                {/* Number Watermark */}
                <span className="absolute top-6 right-8 text-6xl font-black text-gray-100/50 group-hover:text-indigo-600/10 transition-colors select-none">
                  0{index + 1}
                </span>

                <div className="relative">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center bg-indigo-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all duration-200">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      {feature.stat}
                    </span>
                  </div>

                  <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {feature.name}
                  </h3>

                  <p className="text-sm font-medium leading-6 text-gray-500 group-hover:text-gray-900 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
