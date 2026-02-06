interface StatsCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
}

export default function StatsCard({ label, value, trend, trendDirection = 'neutral', icon: Icon }: StatsCardProps) {
  return (
    <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-none hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-none">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              {trend && (
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                  trendDirection === 'up' ? 'text-green-600' : 
                  trendDirection === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {trend}
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
