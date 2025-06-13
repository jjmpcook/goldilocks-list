import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import { Send } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  destinations: string;
  travelDates: string;
  roomConfig: string;
  budget: string;
  priorities: string[];
  notes: string;
}

const priorities = [
  'Family-friendly',
  'Design-forward',
  'Pool',
  'Free breakfast',
  'Kitchen/kitchenette',
  'Multiple bedrooms',
  'Resort amenities',
  'Beachfront',
  'Downtown location'
];

const HotelMatch: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    destinations: '',
    travelDates: '',
    roomConfig: '',
    budget: '',
    priorities: [],
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handlePriorityToggle = (priority: string) => {
    setFormData(prev => {
      const currentPriorities = prev.priorities;
      if (currentPriorities.includes(priority)) {
        return {
          ...prev,
          priorities: currentPriorities.filter(p => p !== priority)
        };
      }
      if (currentPriorities.length < 3) {
        return {
          ...prev,
          priorities: [...currentPriorities, priority]
        };
      }
      return prev;
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#f8e1e6] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Get a Custom Hotel Match</h1>
            <p className="text-gray-600 mb-8">
              Tell us about your dream stay, and we'll match you with the perfect hotel.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <p className="text-sm text-gray-500 mb-2">So we know what to call you.</p>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <p className="text-sm text-gray-500 mb-2">We'll send your match details here.</p>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Destinations */}
              <div>
                <label htmlFor="destinations" className="block text-sm font-medium text-gray-700 mb-1">
                  Trip Destination(s)
                </label>
                <p className="text-sm text-gray-500 mb-2">City, region, or countries you're visiting.</p>
                <input
                  type="text"
                  id="destinations"
                  value={formData.destinations}
                  onChange={(e) => setFormData(prev => ({ ...prev, destinations: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Travel Dates */}
              <div>
                <label htmlFor="travelDates" className="block text-sm font-medium text-gray-700 mb-1">
                  Travel Dates
                </label>
                <p className="text-sm text-gray-500 mb-2">When you'll be there.</p>
                <input
                  type="text"
                  id="travelDates"
                  value={formData.travelDates}
                  onChange={(e) => setFormData(prev => ({ ...prev, travelDates: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="e.g., July 15-22, 2024"
                  required
                />
              </div>

              {/* Room Configuration */}
              <div>
                <label htmlFor="roomConfig" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Travelers & Room Configuration
                </label>
                <p className="text-sm text-gray-500 mb-2">e.g. 2 adults + 2 kids in one room with 2 queens.</p>
                <input
                  type="text"
                  id="roomConfig"
                  value={formData.roomConfig}
                  onChange={(e) => setFormData(prev => ({ ...prev, roomConfig: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Nightly Budget
                </label>
                <p className="text-sm text-gray-500 mb-2">Note: $350/night minimum applies</p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    id="budget"
                    min="350"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Priorities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Top Priorities
                </label>
                <p className="text-sm text-gray-500 mb-2">Choose up to 3</p>
                <div className="flex flex-wrap gap-2">
                  {priorities.map(priority => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => handlePriorityToggle(priority)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.priorities.includes(priority)
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests & Notes
                </label>
                <p className="text-sm text-gray-500 mb-2">Anything else we should know?</p>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center font-medium"
              >
                <Send className="w-5 h-5 mr-2" />
                Get Matched with an Advisor
              </button>

              <p className="text-sm text-gray-500 text-center">
                Submit your details, and we'll be in touch within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HotelMatch;