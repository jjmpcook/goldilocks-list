import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Map, HelpCircle, ChevronDown, LogIn, User, LogOut, Eye } from 'lucide-react';
import SearchBar from './SearchBar';
import Button from './Button';
import AuthModal from '../auth/AuthModal';
import { cities } from '../../data/cities';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsUserMenuOpen(false);
    setIsDestinationsOpen(false);
  }, [location]);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  const handleDestinationClick = (cityName: string) => {
    navigate(`/destination/${cityName.toLowerCase()}`);
    setIsDestinationsOpen(false);
  };

  const isHomePage = location.pathname === '/';
  const headerClass = isScrolled || !isHomePage
    ? 'bg-white shadow-md'
    : 'bg-transparent';

  const linkClass = isScrolled || !isHomePage
    ? 'text-gray-700 hover:text-amber-600'
    : 'text-amber-600 hover:text-amber-600';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between min-h-[40px]">
            {/* Logo - Fixed width to prevent shifting */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <span className="text-lg font-arastin font-semibold text-amber-400 transition-colors whitespace-nowrap">
                  Goldilock's List
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on smaller screens */}
            <nav className="hidden lg:flex lg:items-center lg:space-x-8 flex-1 justify-center">
              <div className="relative">
                <button
                  onClick={() => setIsDestinationsOpen(!isDestinationsOpen)}
                  className={`font-medium ${linkClass} flex items-center py-2 px-1 whitespace-nowrap`}
                >
                  <Map className="mr-2 h-4 w-4" />
                  Destinations
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>

                {isDestinationsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                    {cities.map(city => (
                      <button
                        key={city.id}
                        onClick={() => handleDestinationClick(city.name)}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 flex items-center"
                      >
                        <Map className="mr-3 h-4 w-4" />
                        {city.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <Link to="/browse" className={`font-medium ${linkClass} flex items-center py-2 px-1 whitespace-nowrap`}>
                <Eye className="mr-2 h-4 w-4" />
                Browse
              </Link>
              
              <Link to="/faq" className={`font-medium ${linkClass} flex items-center py-2 px-1 whitespace-nowrap`}>
                <HelpCircle className="mr-2 h-4 w-4" />
                FAQ
              </Link>
            </nav>

            {/* Right side - Auth and user actions */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              {loading ? (
                <div className="w-6 h-6 animate-spin rounded-full border-2 border-amber-600 border-t-transparent"></div>
              ) : user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/favorites"
                    className={`font-medium ${linkClass} flex items-center py-2 px-1 whitespace-nowrap`}
                  >
                    <Heart className="mr-1 h-4 w-4" />
                    <span className="hidden sm:inline">Saved</span>
                  </Link>
                  
                  <div className="relative hidden md:block">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className={`font-medium ${linkClass} flex items-center py-2 px-1 whitespace-nowrap`}
                    >
                      <User className="mr-1 h-4 w-4" />
                      <span className="hidden lg:inline">Account</span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm text-gray-500">Signed in as</p>
                          <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                        </div>
                        <Link
                          to="/favorites"
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <Heart className="mr-3 h-4 w-4" />
                          My Favorites
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <LogOut className="mr-3 h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/favorites"
                    className={`font-medium ${linkClass} flex items-center py-2 px-1 whitespace-nowrap`}
                  >
                    <Heart className="mr-1 h-4 w-4" />
                    <span className="hidden sm:inline">Wishlist</span>
                  </Link>
                  
                  <Button 
                    onClick={handleAuthClick}
                    primary
                    small
                    className="flex items-center px-3 py-1.5 text-sm whitespace-nowrap"
                  >
                    <LogIn className="mr-1 h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Sign In</span>
                    <span className="sm:hidden">In</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="signin"
      />
    </>
  );
};

export default Header;