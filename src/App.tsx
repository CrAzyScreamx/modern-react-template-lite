import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      <div className="ml-64 pt-16 flex flex-col min-h-screen">
        <main className="flex-1 p-6">
          <MainContent />
        </main>
        <Footer />
      </div>
    </div>
  );
}
