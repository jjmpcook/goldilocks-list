import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, ArrowRight, Sparkles, Search, Eye } from 'lucide-react';
import QuizModal from '../quiz/QuizModal';

const Hero: React.FC = () => {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#f8e1e6] pb-16">
      <div className="container mx-auto px-4 h-full flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center pt-24 pb-16">
          <div className="relative w-full max-w-7xl mx-auto">
            {/* Hide image on mobile, show on md and up */}
            <img 
              src="/family-relaxing.jpg" 
              alt="Family relaxing together" 
              className="hidden md:block w-full h-[600px] lg:h-[700px] object-cover rounded-lg shadow-xl blur-[1px]"
            />
            
            {/* Dark overlay for better text contrast */}
            <div className="hidden md:block absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
            
            {/* Content - positioned absolutely on desktop, normally on mobile */}
            <div className="md:absolute md:inset-0 flex flex-col justify-center px-4 md:px-8 md:-mt-8">
              {/* Desktop Layout */}
              <div className="hidden md:flex md:items-start md:justify-between md:h-full md:pt-24">
                {/* Left side - Main headline */}
                <div className="md:w-1/2 md:pr-8">
                  <h1 
                    className="text-4xl leading-tight font-semibold text-white tracking-wide mb-12 max-w-lg"
                    style={{ 
                      fontFamily: "'Playfair Display', serif",
                      textShadow: '0 0 20px rgba(251, 191, 36, 0.6), 0 0 30px rgba(251, 191, 36, 0.4), 2px 2px 6px rgba(0,0,0,0.8), 3px 3px 8px rgba(0,0,0,0.6)'
                    }}
                  >
                    Find 'Just right' Spacious Suites for your family's next trip
                  </h1>
                </div>

                {/* Right side - Search criteria and buttons */}
                <div className="md:w-1/2 md:pl-8">
                  <div className="mb-8">
                    <h3 
                      className="text-white text-xl font-semibold mb-6 tracking-wide"
                      style={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.9)'
                      }}
                    >
                      Search our handpicked family-friendly Boutique and Lifestyle Hotels and filter by:
                    </h3>
                    <div className="space-y-3 text-white text-base">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                        <span 
                          className="tracking-wide"
                          style={{
                            textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
                          }}
                        >
                          City/destination
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                        <span 
                          className="tracking-wide"
                          style={{
                            textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
                          }}
                        >
                          Separate bedrooms
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                        <span 
                          className="tracking-wide"
                          style={{
                            textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
                          }}
                        >
                          Bed configuration
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                        <span 
                          className="tracking-wide"
                          style={{
                            textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
                          }}
                        >
                          Kitchen/kitchenette
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                        <span 
                          className="tracking-wide"
                          style={{
                            textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
                          }}
                        >
                          Additional bathroom
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                        <span 
                          className="tracking-wide"
                          style={{
                            textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
                          }}
                        >
                          Square footage
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <Link 
                      to="/destinations"
                      className="inline-flex items-center justify-center bg-amber-600 text-white font-medium px-8 py-4 rounded-full hover:bg-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group w-full"
                      style={{
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                      }}
                    >
                      <Search className="w-5 h-5 mr-3" />
                      Find your next stay
                      <ArrowRight className="w-5 h-5 ml-3 transform transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link 
                      to="/browse"
                      className="inline-flex items-center justify-center bg-white bg-opacity-90 text-gray-800 font-medium px-8 py-4 rounded-full hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group w-full border-2 border-white"
                    >
                      <Eye className="w-5 h-5 mr-3" />
                      Browse & Dream
                      <ArrowRight className="w-5 h-5 ml-3 transform transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden text-center pt-8">
                <h1 
                  className="text-3xl leading-tight font-semibold text-gray-900 tracking-wide mb-8 max-w-4xl"
                  style={{ 
                    fontFamily: "'Playfair Display', serif"
                  }}
                >
                  Find 'Just right' Spacious Suites for your family's next trip
                </h1>
                
                <div className="max-w-3xl mx-auto mb-8">
                  <h3 
                    className="text-gray-900 text-lg font-semibold mb-4 tracking-wide"
                  >
                    Search our handpicked family-friendly Boutique and Lifestyle Hotels and filter by:
                  </h3>
                  <div className="space-y-2 text-gray-900 text-sm max-w-2xl mx-auto">
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                      <span className="tracking-wide">City/destination</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                      <span className="tracking-wide">Separate bedrooms</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                      <span className="tracking-wide">Bed configuration</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                      <span className="tracking-wide">Kitchen/kitchenette</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                      <span className="tracking-wide">Additional bathroom</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                      <span className="tracking-wide">Square footage</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 mb-12">
                  <Link 
                    to="/destinations"
                    className="inline-flex items-center justify-center bg-amber-600 text-white font-medium px-8 py-4 rounded-full hover:bg-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group w-full max-w-sm"
                  >
                    <Search className="w-5 h-5 mr-3" />
                    Find your next stay
                    <ArrowRight className="w-5 h-5 ml-3 transform transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link 
                    to="/browse"
                    className="inline-flex items-center justify-center bg-white text-gray-800 font-medium px-8 py-4 rounded-full hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group w-full max-w-sm border-2 border-gray-200"
                  >
                    <Eye className="w-5 h-5 mr-3" />
                    Browse & Dream
                    <ArrowRight className="w-5 h-5 ml-3 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Button - Desktop: Fixed position, Mobile: Semi-transparent floating */}
      <div className="fixed top-24 right-4 md:top-28 md:right-8 z-40">
        <button
          onClick={() => setIsQuizModalOpen(true)}
          className="group relative"
        >
          {/* Mobile: Semi-transparent background with backdrop blur */}
          <div className="md:hidden absolute inset-0 bg-white/70 backdrop-blur-sm rounded-full"></div>
          
          {/* Main bubble shape with vintage burgundy gradient */}
          <div className="relative p-1 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
               style={{ 
                 background: 'linear-gradient(135deg, #80261b 0%, #a0321f 50%, #80261b 100%)'
               }}>
            <div className="bg-white/95 md:bg-white rounded-full p-3 md:p-6">
              <div className="text-center">
                <Sparkles className="w-5 h-5 md:w-8 md:h-8 mx-auto mb-1 animate-pulse" 
                         style={{ color: '#80261b' }} />
                <div className="text-xs md:text-sm font-bold leading-tight"
                     style={{ color: '#80261b' }}>
                  <span className="block md:hidden">Quiz</span>
                  <span className="hidden md:block">Get Your<br />Perfect Hotel<br />Style Match</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating sparkle decorations - hidden on mobile for cleaner look */}
          <div className="hidden md:block absolute -top-2 -right-2 w-3 h-3 rounded-full animate-bounce" 
               style={{ backgroundColor: '#80261b', animationDelay: '0s' }}></div>
          <div className="hidden md:block absolute -bottom-1 -left-2 w-2 h-2 rounded-full animate-bounce" 
               style={{ backgroundColor: '#a0321f', animationDelay: '0.5s' }}></div>
          <div className="hidden md:block absolute top-1/2 -right-3 w-2 h-2 rounded-full animate-bounce" 
               style={{ backgroundColor: '#6b1f17', animationDelay: '1s' }}></div>
          
          {/* Speech bubble tail - hidden on mobile */}
          <div className="hidden md:block absolute bottom-0 left-1/2 transform translate-y-full -translate-x-1/2">
            <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-white"></div>
          </div>
          
          {/* Hover tooltip - desktop only */}
          <div className="hidden md:block absolute bottom-0 left-1/2 transform translate-y-full -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap"
                 style={{ backgroundColor: '#80261b' }}>
              Discover your ideal hotel! ✨
            </div>
          </div>
        </button>
      </div>

      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
      />
    </div>
  );
};

export default Hero;