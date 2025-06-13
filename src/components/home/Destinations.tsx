import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { cities } from '../../data/cities';

const Destinations: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Use the cities data instead of Supabase for now
  const destinations = cities.map(city => ({
    destination_id: city.id.toString(),
    name: city.name,
    slug: city.name.toLowerCase().replace(/\s+/g, '-'),
    image: city.image,
    description: city.description,
    country: null,
    hotel_count: city.properties,
    featured: null
  }));

  return (
    <section className="py-20 bg-white mt-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover our most loved family-friendly destinations with accommodations that are just right for everyone
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map(destination => (
            <div 
              key={destination.destination_id} 
              className="group relative"
            >
              <Link to={`/destination/${destination.slug}`}>
                <div className="relative rounded-xl overflow-hidden shadow-md transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-lg h-64">
                  <img 
                    src={destination.image || '/placeholder-destination.jpg'} 
                    alt={destination.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 mr-2 text-amber-400" />
                        <h3 className="text-xl font-bold">{destination.name}</h3>
                      </div>
                      <p className="text-sm text-gray-200 mb-2">{destination.description}</p>
                      <div className="inline-block bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {destination.hotel_count || 0} properties
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;