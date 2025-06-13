import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/common/Layout';
import { MapPin, Bed, Bath, Coffee, Wifi } from 'lucide-react';
import { getDestinationBySlug, getHotelsByDestination, type Destination, type Hotel } from '../lib/supabase-queries';

const CityLanding: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!cityName) return;

      try {
        setLoading(true);
        const [destinationData, hotelsData] = await Promise.all([
          getDestinationBySlug(cityName),
          getHotelsByDestination(cityName)
        ]);

        setDestination(destinationData);
        setHotels(hotelsData);
      } catch (error) {
        console.error('Error loading destination data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityName]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-[300px] bg-gray-300 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!destination) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Destination Not Found</h2>
          <p className="text-gray-600">We couldn't find the destination you're looking for.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative">
        {/* Hero Section */}
        <div className="h-[300px] overflow-hidden">
          <img 
            src={destination.image || '/placeholder-destination.jpg'}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50">
            <div className="container mx-auto px-4 h-full flex flex-col justify-center">
              <div className="flex items-center text-white">
                <MapPin className="w-6 h-6 text-amber-400 mr-2" />
                <h1 className="text-4xl font-bold">{destination.name}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Destination Description */}
          <div className="py-8 border-b border-gray-200">
            <p className="text-lg text-gray-700 max-w-3xl">
              {destination.description}
            </p>
          </div>

          {/* Filters Section */}
          <div className="py-6 border-b border-gray-200">
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <select className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>Any Bed Configuration</option>
                  <option>1 King Bed</option>
                  <option>2 Queen Beds</option>
                  <option>King + Sofa Bed</option>
                  <option>Bunk Beds</option>
                </select>
                <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>

              <div className="relative">
                <select className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>Any Bathroom</option>
                  <option>1 Bathroom</option>
                  <option>1.5+ Bathrooms</option>
                  <option>2+ Bathrooms</option>
                </select>
                <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>

              <div className="relative">
                <select className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>Any Kitchen Type</option>
                  <option>Full Kitchen</option>
                  <option>Kitchenette</option>
                  <option>No Kitchen</option>
                </select>
                <Coffee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>

              <div className="relative">
                <select className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>All Amenities</option>
                  <option>Pool</option>
                  <option>Free WiFi</option>
                  <option>Breakfast Included</option>
                  <option>Parking</option>
                </select>
                <Wifi className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Hotels Grid */}
          <div className="py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Hotels in {destination.name}
              </h2>
              <p className="text-gray-600">
                {hotels.length} properties found
              </p>
            </div>

            {hotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {hotels.map(hotel => (
                  <div key={hotel.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="relative">
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Hotel Image</span>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
                        Contact for pricing
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-1 hover:text-amber-600 transition-colors">
                        {hotel.hotel_name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{hotel.address}</p>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          <div className="text-amber-500">★</div>
                          <span className="ml-1 text-sm font-medium">{hotel.review_score || 'N/A'}</span>
                        </div>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-600">{hotel.review_count || 0} reviews</span>
                      </div>
                      
                      {hotel.tags && (
                        <div className="flex flex-wrap gap-1">
                          {hotel.tags.split(',').slice(0, 2).map((tag, index) => (
                            <span key={index} className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-800 mb-2">No hotels found</h3>
                <p className="text-gray-600">
                  We're working on adding more properties to this destination.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CityLanding;