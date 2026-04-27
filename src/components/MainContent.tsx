import {
  Users,
  DollarSign,
  Activity,
  TrendingUp,
  TrendingDown,
  Download,
  FilePlus,
  UserPlus,
  Settings,
} from 'lucide-react';

const currentDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const kpiCards = [
  {
    label: 'Total Users',
    icon: Users,
    value: '12,847',
    trend: '+8.2%',
    trendUp: true,
    badgeClass: 'bg-indigo-500/20 text-indigo-400',
  },
  {
    label: 'Revenue',
    icon: DollarSign,
    value: '$94,320',
    trend: '+14.1%',
    trendUp: true,
    badgeClass: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    label: 'Active Sessions',
    icon: Activity,
    value: '3,291',
    trend: '-3.4%',
    trendUp: false,
    badgeClass: 'bg-amber-500/20 text-amber-400',
  },
  {
    label: 'Growth Rate',
    icon: TrendingUp,
    value: '24.7%',
    trend: '+5.7%',
    trendUp: true,
    badgeClass: 'bg-sky-500/20 text-sky-400',
  },
];

const revenueData = [
  { day: 'Mon', value: 42 },
  { day: 'Tue', value: 68 },
  { day: 'Wed', value: 55 },
  { day: 'Thu', value: 80 },
  { day: 'Fri', value: 73 },
  { day: 'Sat', value: 91 },
  { day: 'Sun', value: 64 },
];

const channels = [
  { name: 'Organic', pct: 42, colorClass: 'bg-emerald-500' },
  { name: 'Direct', pct: 28, colorClass: 'bg-sky-500' },
  { name: 'Referral', pct: 18, colorClass: 'bg-violet-500' },
  { name: 'Social', pct: 12, colorClass: 'bg-amber-500' },
];

const transactions = [
  {
    name: 'Alex Morgan',
    type: 'Subscription',
    amount: '$129.00',
    status: 'Completed',
    avatarClass: 'bg-indigo-500',
  },
  {
    name: 'Sam Chen',
    type: 'One-time',
    amount: '$49.99',
    status: 'Completed',
    avatarClass: 'bg-emerald-500',
  },
  {
    name: 'Jordan Lee',
    type: 'Refund',
    amount: '-$29.00',
    status: 'Pending',
    avatarClass: 'bg-amber-500',
  },
  {
    name: 'Taylor Kim',
    type: 'Subscription',
    amount: '$129.00',
    status: 'Completed',
    avatarClass: 'bg-sky-500',
  },
  {
    name: 'Casey Park',
    type: 'One-time',
    amount: '$79.00',
    status: 'Failed',
    avatarClass: 'bg-rose-500',
  },
];

const statusChipClass: Record<string, string> = {
  Completed: 'bg-emerald-500/20 text-emerald-400',
  Pending: 'bg-amber-500/20 text-amber-400',
  Failed: 'bg-rose-500/20 text-rose-400',
};

const teamMembers = [
  {
    name: 'Riley Johnson',
    role: 'Product Manager',
    online: true,
    avatarClass: 'bg-indigo-500',
  },
  {
    name: 'Morgan Davis',
    role: 'Lead Developer',
    online: true,
    avatarClass: 'bg-emerald-500',
  },
  {
    name: 'Drew Wilson',
    role: 'UX Designer',
    online: false,
    avatarClass: 'bg-violet-500',
  },
  {
    name: 'Quinn Martinez',
    role: 'Data Analyst',
    online: true,
    avatarClass: 'bg-sky-500',
  },
];

const quickActions = [
  {
    label: 'New Report',
    subtitle: 'Generate PDF',
    icon: FilePlus,
    badgeClass: 'bg-indigo-500/20 text-indigo-400',
  },
  {
    label: 'Invite User',
    subtitle: 'Send invite link',
    icon: UserPlus,
    badgeClass: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    label: 'Export Data',
    subtitle: 'Download CSV',
    icon: Download,
    badgeClass: 'bg-amber-500/20 text-amber-400',
  },
  {
    label: 'Settings',
    subtitle: 'Manage preferences',
    icon: Settings,
    badgeClass: 'bg-sky-500/20 text-sky-400',
  },
];

const maxRevenue = Math.max(...revenueData.map((d) => d.value));

export function MainContent() {
  return (
    <div className="space-y-6">
      {/* Layer 1 — Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            Welcome back, here's what's happening today
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          <span className="text-gray-400 text-sm">{currentDate}</span>
          <button className="border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg px-4 py-2 flex items-center gap-2 text-sm transition-colors">
            <Download size={16} />
            Download Report
          </button>
        </div>
      </div>

      {/* Layer 2 — KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiCards.map(({ label, icon: Icon, value, trend, trendUp, badgeClass }) => (
          <div
            key={label}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-6 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm">{label}</p>
                <p className="text-2xl font-bold text-white mt-1">{value}</p>
              </div>
              <div className={`p-2.5 rounded-xl ${badgeClass}`}>
                <Icon size={20} />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {trendUp ? (
                <TrendingUp size={14} className="text-emerald-400" />
              ) : (
                <TrendingDown size={14} className="text-rose-400" />
              )}
              <span
                className={`text-xs font-medium ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}
              >
                {trend}
              </span>
              <span className="text-xs text-gray-500">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Layer 3 — Revenue Overview + Top Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Overview */}
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">Revenue Overview</h2>
              <p className="text-gray-400 text-sm mt-0.5">This week</p>
            </div>
          </div>
          <div className="flex items-end gap-2 h-32">
            {revenueData.map(({ day, value }) => (
              <div key={day} className="flex flex-col items-center gap-1.5 flex-1">
                <div className="w-full flex items-end" style={{ height: '100%' }}>
                  <div
                    className="bg-indigo-500 rounded-t-md w-full"
                    style={{ height: `${(value / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-gray-400 text-xs">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Channels */}
        <div className="lg:col-span-1 bg-gray-800 border border-gray-700 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-5">Top Channels</h2>
          <div className="space-y-4">
            {channels.map(({ name, pct, colorClass }) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-300">{name}</span>
                  <span className="text-sm text-gray-400">{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-700">
                  <div
                    className={`h-1.5 rounded-full ${colorClass}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Layer 4 — Recent Transactions + Active Team */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Recent Transactions */}
        <div className="lg:col-span-3 bg-gray-800 border border-gray-700 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-5">Recent Transactions</h2>
          <div className="space-y-3">
            {transactions.map(({ name, type, amount, status, avatarClass }) => (
              <div
                key={name}
                className="flex items-center gap-3 py-2 border-b border-gray-700 last:border-0"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 ${avatarClass}`}
                >
                  {name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
                    {type}
                  </span>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm text-white font-medium">{amount}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusChipClass[status]}`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Team Members */}
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-5">Active Team</h2>
          <div className="space-y-3">
            {teamMembers.map(({ name, role, online, avatarClass }) => (
              <div
                key={name}
                className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-xl"
              >
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold ${avatarClass}`}
                  >
                    {name[0]}
                  </div>
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-gray-800 ${online ? 'bg-emerald-400' : 'bg-amber-400'}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-white font-medium truncate">{name}</p>
                  <p className="text-xs text-gray-400 truncate">{role}</p>
                </div>
                <span className={`text-xs ${online ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {online ? 'Online' : 'Away'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Layer 5 — Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickActions.map(({ label, subtitle, icon: Icon, badgeClass }) => (
          <button
            key={label}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer hover:bg-gray-700 transition-colors text-center"
          >
            <div className={`p-3 rounded-xl ${badgeClass}`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-300 font-medium">{label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
