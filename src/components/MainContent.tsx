import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Users', icon: Users, value: '1,234' },
  { label: 'Revenue', icon: DollarSign, value: '$45,678' },
  { label: 'Active Sessions', icon: Activity, value: '892' },
  { label: 'Growth', icon: TrendingUp, value: '+12.5%' },
];

export function MainContent() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, icon: Icon, value }) => (
          <div
            key={label}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500 mb-1">{label}</p>
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
            <div className="text-gray-400">
              <Icon size={28} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <p className="text-gray-400">No recent activity to display.</p>
      </div>
    </div>
  );
}
