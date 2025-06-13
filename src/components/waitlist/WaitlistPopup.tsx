import React, { useState, useEffect } from 'react';
import { X, Mail, Send, Clock, Sparkles } from 'lucide-react';
import { addToWaitlist } from '../../lib/waitlist';

interface WaitlistPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistPopup: React.FC<WaitlistPopupProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await addToWaitlist(email, 'website');
      
      if (result.success) {
        setSubmitted(true);
        // Auto close after 5 seconds
        setTimeout(() => {
          onClose();
        }, 5000);
      } else {
        setError(result.error || 'Failed to join waitlist');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden transform transition-all">
        {!submitted ? (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-amber-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Join Our Exclusive Waitlist</h2>
                  <p className="text-amber-100 text-sm">Be the first to experience family travel reimagined</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Get Early Access
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Be among the first families to discover our curated collection of boutique hotels 
                  that are perfectly sized for families. Get exclusive launch discounts and special perks.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-center text-lg"
                    required
                  />
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200 flex items-center justify-center font-semibold text-lg disabled:opacity-50 transform hover:scale-105"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Join the Waitlist
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Exclusive early access to our hotel collection
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Special launch discounts and family perks
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  No spam, just the good stuff
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-6 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to the Family! 🎉
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              You're all set! We'll notify you as soon as we launch with exclusive early access and special family perks.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-800">
                <strong>What's next?</strong> Keep an eye on your inbox for updates and special perks coming your way!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistPopup;