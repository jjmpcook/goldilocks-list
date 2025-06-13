import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-amber-500 mb-4">Goldilock's List</h2>
            <p className="text-gray-300 mb-4">Family Stays that are 'Just Right'</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Browse
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-amber-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/become-partner" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Become a Travel Advisor Partner
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search/San Francisco" className="text-gray-400 hover:text-amber-400 transition-colors">
                  San Francisco
                </Link>
              </li>
              <li>
                <Link to="/search/New York" className="text-gray-400 hover:text-amber-400 transition-colors">
                  New York
                </Link>
              </li>
              <li>
                <Link to="/search/London" className="text-gray-400 hover:text-amber-400 transition-colors">
                  London
                </Link>
              </li>
              <li>
                <Link to="/search/Tokyo" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Tokyo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <span className="text-gray-400">
                  228 Windsor River Road #315<br />
                  Windsor, CA 95492
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-gray-400">(707) 366-0237</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-gray-400">info@goldilockslist.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Goldilock's List. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4 text-sm text-gray-400">
            <Link to="#" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-amber-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-amber-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;