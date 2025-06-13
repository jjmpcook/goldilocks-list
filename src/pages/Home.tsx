import React, { useState, useEffect } from 'react';
import WaitlistPopup from '../components/waitlist/WaitlistPopup';

const Home: React.FC = () => {
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false);

  useEffect(() => {
    // Show popup immediately when the page loads
    setShowWaitlistPopup(true);
  }, []);

  const handleCloseWaitlistPopup = () => {
    setShowWaitlistPopup(false);
    // Mark that user has seen the popup
    localStorage.setItem('hasSeenWaitlistPopup', 'true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-pink-50 flex items-center justify-center p-4">
      {/* Under Construction Content */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
            style={{ 
              fontFamily: "'Playfair Display', serif"
            }}
          >
            Goldilock's List
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-6">
            Family Stays that are 'Just Right'
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-6">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Coming Soon!
            </h2>
            <p className="text-gray-600 mb-6">
              We're carefully curating the perfect collection of family-friendly boutique hotels. 
              Our team is working hard to bring you accommodations that are truly 'just right' for families.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
              <span className="text-gray-700">Handpicked family-friendly boutique hotels</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
              <span className="text-gray-700">Detailed room configurations and amenities</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
              <span className="text-gray-700">Exclusive family perks and deals</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
              <span className="text-gray-700">Verified family-friendly experiences</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <p>Be the first to know when we launch!</p>
        </div>
      </div>

      {/* Waitlist Popup */}
      <WaitlistPopup
        isOpen={showWaitlistPopup}
        onClose={handleCloseWaitlistPopup}
      />
    </div>
  );
};

export default Home;