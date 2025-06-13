import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ArrowLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="min-h-screen border-[#80261b] border-[12px]">
      <Header />
      <main className={`flex-grow ${isHomePage ? '' : 'pt-16'}`}>
        {!isHomePage && (
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;