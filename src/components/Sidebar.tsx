import { LayoutDashboard, FileText, Users, BarChart3, Settings } from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Reports', icon: FileText, active: false },
  { label: 'Users', icon: Users, active: false },
  { label: 'Analytics', icon: BarChart3, active: false },
  { label: 'Settings', icon: Settings, active: false },
];

export function Sidebar() {
  return (
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-gray-800 overflow-y-auto">
      <nav className="py-2">
        {menuItems.map(({ label, icon: Icon, active }) => (
          <div
            key={label}
            className={`flex items-center gap-3 py-3 px-4 mx-2 my-1 rounded-lg cursor-pointer transition-colors ${
              active
                ? 'bg-gray-700 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
