import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { getDestinations, type Destination } from '../lib/supabase-queries';

const CityListing: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinations(data);
      } catch (error) {
        console.error('Error loading destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="bg-[#f8e1e6] min-h-screen py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Find Your Perfect Family Destination
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 rounded-xl h-64"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-[#f8e1e6] min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Find Your Perfect Family Destination
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map(destination => (
              <Link 
                key={destination.destination_id}
                to={`/destination/${destination.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-64">
                    <img 
                      src={destination.image || '/placeholder-destination.jpg'}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center mb-2">
                          <MapPin className="w-5 h-5 text-amber-400 mr-2" />
                          <h2 className="text-2xl font-bold">{destination.name}</h2>
                        </div>
                        <p className="text-sm text-gray-200 mb-2">{destination.description}</p>
                        <span className="inline-block bg-amber-500 text-white text-sm px-3 py-1 rounded-full">
                          {destination.hotel_count || 0} properties
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CityListing;