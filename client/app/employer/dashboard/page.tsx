"use client";

import { useQuery } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import {
  BriefcaseIcon,
  UserGroupIcon,
  EyeIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";
import StatsCard from "../_components/StatsCard";
import JobCard from "../_components/JobCard";
import EmptyState from "../_components/EmptyState";
import Link from "next/link";
import { GET_EMPLOYER_DASHBOARD_DATA } from "@/lib/graphql/queries";

interface EmployerJob {
  id: string;
  title: string;
  type: string;
  location: string;
  postedAt: string;
  status: 'active' | 'closed' | 'draft';
  applicantsCount: number;
}

interface EmployerStats {
  activeJobs: number;
  totalApplicants: number;
  profileViews: number;
  avgTimeToHire: string;
}

interface DashboardData {
  employerJobs: EmployerJob[];
  employerStats: EmployerStats;
}

export default function EmployerDashboard() {
  const { data: session } = useSession();
  const employerId = session?.user?.id;

  const { data, loading, error } = useQuery<DashboardData>(GET_EMPLOYER_DASHBOARD_DATA, {
    variables: { employerId: employerId || "" },
    skip: !employerId,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-none relative" role="alert">
        <strong className="font-bold">Error loading dashboard!</strong>
        <span className="block sm:inline"> {error.message}</span>
      </div>
    );
  }

  const employerStats = data?.employerStats;
  const employerJobs = data?.employerJobs || [];

  const stats = [
    {
      label: 'Active Jobs',
      value: employerStats?.activeJobs?.toString() || '0',
      icon: BriefcaseIcon,
      trend: '+0', // Placeholder as backend doesn't support trends yet
      trendDirection: 'up' as const
    },
    {
      label: 'Total Applicants',
      value: employerStats?.totalApplicants?.toString() || '0',
      icon: UserGroupIcon,
      trend: '+0%', // Placeholder
      trendDirection: 'up' as const
    },
    {
      label: 'Profile Views',
      value: employerStats?.profileViews?.toString() || '0',
      icon: EyeIcon,
      trend: '+0%', // Placeholder
      trendDirection: 'up' as const
    },
    {
      label: 'Avg. Time to Hire',
      value: employerStats?.avgTimeToHire || 'N/A',
      icon: ChartBarIcon,
      trend: '0 days', // Placeholder
      trendDirection: 'up' as const
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight uppercase">
            Dashboard
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <Link
            href="/employer/jobs/create"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-none uppercase tracking-wide"
          >
            Post a New Job
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            trendDirection={stat.trendDirection}
          />
        ))}
      </div>

      {/* Recent Jobs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold leading-6 text-gray-900 uppercase tracking-wide">
            Recent Job Postings
          </h3>
          <Link href="/employer/jobs" className="text-sm font-bold text-indigo-600 hover:text-indigo-500 uppercase">
            View All Jobs &rarr;
          </Link>
        </div>

        {employerJobs.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {employerJobs.map((job: any) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                type={job.type}
                location={job.location}
                postedAt={`${formatDistanceToNow(new Date(job.postedAt))} ago`}
                applicantsCount={job.applicantsCount}
                status={job.status}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No jobs posted yet"
            description="Get started by creating your first job posting."
            actionLabel="Post a Job"
            actionLink="/employer/jobs/create"
            icon={BriefcaseIcon}
          />
        )}
      </div>

      {/* Recent Activity / Applications Section (Placeholder) */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-none p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold leading-6 text-gray-900 uppercase tracking-wide">
            Recent Applications
          </h3>
          <Link href="/employer/applications" className="text-sm font-bold text-indigo-600 hover:text-indigo-500 uppercase">
            View All &rarr;
          </Link>
        </div>
        <div className="text-sm text-gray-500 text-center py-8">
          No recent applications to show.
        </div>
      </div>
    </div>
  );
}
