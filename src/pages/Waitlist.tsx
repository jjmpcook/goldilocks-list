import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import { Mail, Send } from 'lucide-react';
import { submitWaitlistEmail } from '../lib/supabase-queries';

const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await submitWaitlistEmail(email);
      setSubmitted(true);
    } catch (err: any) {
      if (err.message === 'already_subscribed') {
        setError('You\'re already on the list! We\'ll be in touch soon.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#f8e1e6] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
            {!submitted ? (
              <>
                <div className="flex items-center justify-center mb-6">
                  <Mail className="w-12 h-12 text-amber-500" />
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
                  Join Our Waitlist
                </h1>
                
                <p className="text-gray-600 text-center mb-8">
                  Be the first to know when we launch and get exclusive early access to our curated collection of family-friendly hotels.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  {error && (
                    <p className="text-red-600 text-sm text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    {loading ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </form>
                
                <p className="text-sm text-gray-500 mt-6 text-center">
                  We'll never share your email with anyone else.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="flex items-center justify-center mb-6">
                  <Mail className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Thank You for Joining!
                </h2>
                <p className="text-gray-600">
                  We'll keep you updated on our launch and send you exclusive early access information.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Waitlist;