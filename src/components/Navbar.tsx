import { Box, Home, Settings, Info } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-900 flex items-center px-6 justify-between">
      <div className="flex items-center gap-2 text-white font-semibold text-lg">
        <Box size={24} />
        <span>MyApp</span>
      </div>
      <div className="flex items-center gap-6">
        <a href="#" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
          <Home size={16} />
          <span>Home</span>
        </a>
        <a href="#" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
          <Settings size={16} />
          <span>Settings</span>
        </a>
        <a href="#" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
          <Info size={16} />
          <span>About</span>
        </a>
      </div>
    </nav>
  );
}
