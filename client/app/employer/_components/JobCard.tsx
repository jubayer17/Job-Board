import Link from "next/link";
import { CalendarIcon, MapPinIcon, UsersIcon, BriefcaseIcon } from "@heroicons/react/24/outline";

interface JobCardProps {
  id: string;
  title: string;
  type: string;
  location: string;
  postedAt: string;
  applicantsCount: number;
  status: 'active' | 'closed' | 'draft';
}

export default function JobCard({ id, title, type, location, postedAt, applicantsCount, status }: JobCardProps) {
  return (
    <div className="w-full bg-white border border-gray-100 shadow-sm rounded-none p-4 hover:border-indigo-500 transition-colors">
      <div className="flex justify-between items-start">
        <div className="w-full">
          <h3 className="text-lg font-bold text-gray-900 leading-6">
            <Link href={`/employer/jobs/${id}`} className="hover:text-indigo-600 transition-colors">
              {title}
            </Link>
          </h3>
          <div className="mt-2 flex items-center text-sm text-gray-500 gap-3">
            <span className="flex w-full items-center gap-1">
              <BriefcaseIcon className="h-4 w-4" />
              {type}
            </span>
            <span className="flex w-full items-center gap-1">
              <MapPinIcon className="h-4 w-4" />
              {location}
            </span>
            <span className="flex w-full items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              {postedAt}
            </span>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide ${status === 'active' ? 'bg-green-50 text-green-700' :
          status === 'closed' ? 'bg-red-50 text-red-700' :
            'bg-gray-100 text-gray-800'
          }`}>
          {status}
        </span>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <UsersIcon className="h-5 w-5 mr-1.5 text-gray-400" />
          <span className="font-medium text-gray-900">{applicantsCount}</span>
          <span className="ml-1">Applicants</span>
        </div>
        <Link
          href={`/employer/jobs/${id}`}
          className="text-sm font-bold text-indigo-600 hover:text-indigo-500 uppercase tracking-wide"
        >
          View Details &rarr;
        </Link>
      </div>
    </div>
  );
}
