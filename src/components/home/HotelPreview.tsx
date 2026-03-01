import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Bed, Star } from 'lucide-react';
import { getProperties } from '../../data/properties';
import { Property } from '../../types';

const HotelPreview: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const data = await getProperties();
        // Show first 3 properties for preview
        setProperties(data.slice(0, 3));
        setError(null);
      } catch (err) {
        console.error('Error loading properties:', err);
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading our collection...</p>
        </div>
      </section>
    );
  }

  if (error || properties.length === 0) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 text-center">
          <p className="text-gray-600">Our collection is being prepared. Please check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500 font-light body-sans mb-4">
            Preview Collection
          </p>
          <h2 className="heading-serif text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Family-Perfect
            <br />
            <span className="italic">Boutique Hotels</span>
          </h2>
          <p className="text-lg text-gray-600 body-sans font-light max-w-2xl mx-auto leading-relaxed">
            Get a glimpse of our carefully curated collection. Each property is selected 
            for its exceptional family amenities, thoughtful design, and room capacity.
          </p>
        </div>

        {/* Hotel Cards */}
        <div className="space-y-24">
          {properties.map((property, index) => (
            <div 
              key={property.id} 
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} relative group`}>
                <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                  <img 
                    src={property.images[0]} 
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2">
                  <p className="text-sm font-medium text-gray-900 body-sans">{property.roomTypes[0]?.name || 'Standard Room'}</p>
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} space-y-8`}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 body-sans">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>
                  
                  <h3 className="heading-serif text-3xl font-light text-gray-900">
                    {property.name}
                  </h3>
                  
                  <p className="text-gray-600 body-sans leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3 body-sans uppercase tracking-wide">
                    Hotel Highlights
                  </h4>
                  <div className="space-y-2">
                    {property.amenities.slice(0, 3).map((amenity, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-gray-600 body-sans">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Family Features */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3 body-sans uppercase tracking-wide">
                    Family Features
                  </h4>
                  <div className="space-y-2">
                    {property.perks.slice(0, 3).map((perk, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-1 h-1 bg-black rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-gray-900 body-sans font-medium">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 body-sans">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Up to {property.roomTypes[0]?.capacity || 4} guests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{property.rating}/5 ({property.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <Link 
                  to={`/property/${property.id}`}
                  className="w-full sm:w-auto bg-black text-white px-8 py-3 text-sm tracking-wide font-medium hover:bg-gray-800 transition-all duration-300 body-sans inline-block text-center"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 pt-16 border-t border-gray-200">
          <h3 className="heading-serif text-3xl font-light text-gray-900 mb-4">
            Explore Our Collection
          </h3>
          <p className="text-gray-600 body-sans mb-8 max-w-lg mx-auto leading-relaxed">
            Discover our complete collection of family-perfect boutique hotels,
            carefully curated for comfort and style.
          </p>
          <Link
            to="/browse"
            className="bg-black text-white px-8 py-4 text-sm tracking-wide font-medium hover:bg-gray-800 transition-all duration-300 body-sans inline-block"
          >
            BROWSE HOTELS
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HotelPreview;