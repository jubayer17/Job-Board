import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
  icon?: React.ElementType;
}

export default function EmptyState({ title, description, actionLabel, actionLink, icon: Icon }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4 bg-white border border-gray-100 border-dashed rounded-none">
      {Icon && <Icon className="mx-auto h-12 w-12 text-gray-300" />}
      <h3 className="mt-2 text-sm font-bold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {actionLabel && actionLink && (
        <div className="mt-6">
          <Link
            href={actionLink}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-none uppercase tracking-wide"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {actionLabel}
          </Link>
        </div>
      )}
    </div>
  );
}
