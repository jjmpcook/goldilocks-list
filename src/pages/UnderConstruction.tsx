import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import { Star, MapPin } from 'lucide-react';

interface HotelResult {
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  price: string;
}

const locationImages = {
  beach: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg",
  mountain: "https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg",
  city: "https://images.pexels.com/photos/10444352/pexels-photo-10444352.jpeg"
};

const hotelResults: Record<string, HotelResult> = {
  "beach-modern": {
    name: "The Modern Honolulu",
    location: "Honolulu, Hawaii",
    description: "A sophisticated blend of urban luxury and beach vibes, featuring sleek design, multiple pools, and spacious suites perfect for families seeking modern comfort by the ocean.",
    image: "/fonts/modern honolulu pool.avif",
    rating: 4.5,
    price: "From $399/night"
  },
  "beach-vintage": {
    name: "The Surfjack Hotel & Swim Club",
    location: "Waikiki, Hawaii",
    description: "A retro-chic boutique hotel celebrating vintage Hawaiian culture with modern amenities, featuring Instagram-worthy pool, family suites, and local art installations.",
    image: "/fonts/surfjack lobby.jpeg",
    rating: 4.7,
    price: "From $289/night"
  },
  "beach-natural": {
    name: "The Modern Honolulu",
    location: "Honolulu, Hawaii",
    description: "A luxurious oceanfront resort blending contemporary design with natural elements, offering stunning views, multiple pools, and spacious accommodations perfect for families.",
    image: "/fonts/modern honolulu living room.avif",
    rating: 4.8,
    price: "From $399/night"
  },
  "mountain-modern": {
    name: "The Little Nell",
    location: "Aspen, Colorado",
    description: "Aspen's only Five-Star, Five-Diamond hotel offering contemporary luxury at the base of Aspen Mountain. Featuring ski-in/ski-out access, elegant modern design, and world-class amenities perfect for discerning families.",
    image: "/fonts/little nell guest room.webp",
    rating: 4.9,
    price: "From $899/night"
  },
  "mountain-vintage": {
    name: "Palisociety Mountain Lodge",
    location: "Aspen, Colorado",
    description: "A charming mountain retreat with vintage touches, offering cozy rooms, traditional decor with modern comforts, and family-friendly activities.",
    image: "/fonts/25_pali_hollywood room.jpg",
    rating: 4.7,
    price: "From $429/night"
  },
  "mountain-natural": {
    name: "Aman Mountain Retreat",
    location: "Jackson Hole, Wyoming",
    description: "An eco-conscious mountain sanctuary featuring natural materials, minimalist design, and seamless indoor-outdoor living spaces perfect for families.",
    image: "/fonts/aman-kyoto-nara-room.jpg",
    rating: 4.9,
    price: "From $899/night"
  },
  "city-modern": {
    name: "Moxy NYC Downtown",
    location: "New York City, NY",
    description: "A playful, modern urban hotel with smart design solutions for families, featuring flexible spaces and tech-forward amenities in the heart of the city.",
    image: "/fonts/moxy nyc.jpg",
    rating: 4.5,
    price: "From $299/night"
  },
  "city-vintage": {
    name: "Palihotel Hollywood",
    location: "Los Angeles, CA",
    description: "A nostalgic urban oasis celebrating old Hollywood glamour with modern comforts, perfect for families seeking a unique city experience.",
    image: "/fonts/02_pali_hwood_property-1-scaled.jpg",
    rating: 4.6,
    price: "From $329/night"
  },
  "city-natural": {
    name: "1 Hotel Central Park",
    location: "New York City, NY",
    description: "An eco-luxury urban retreat featuring living walls, reclaimed materials, and nature-inspired design, offering a peaceful family sanctuary in the city.",
    image: "/fonts/aman-kyoto-nara-room.jpg",
    rating: 4.8,
    price: "From $599/night"
  }
};

const UnderConstruction: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<'beach' | 'mountain' | 'city' | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<'modern' | 'vintage' | 'natural' | null>(null);

  const handleLocationSelect = (location: 'beach' | 'mountain' | 'city') => {
    setSelectedLocation(location);
    setSelectedStyle(null); // Reset style selection when location changes
  };

  const handleStyleSelect = (style: 'modern' | 'vintage' | 'natural') => {
    setSelectedStyle(style);
  };

  const getResult = () => {
    if (selectedLocation && selectedStyle) {
      const key = `${selectedLocation}-${selectedStyle}` as keyof typeof hotelResults;
      return hotelResults[key];
    }
    return null;
  };

  const result = getResult();

  return (
    <Layout>
      <div className="min-h-screen bg-[#f8e1e6] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Find Your Perfect Stay
            </h1>

            {/* Location Selection */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Where would you like to stay?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['beach', 'mountain', 'city'].map((location) => (
                  <div key={location} className="flex flex-col">
                    <button
                      onClick={() => handleLocationSelect(location as 'beach' | 'mountain' | 'city')}
                      className={`p-6 rounded-lg border-2 transition-all ${
                        selectedLocation === location
                          ? 'border-amber-600 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <h3 className="text-lg font-medium capitalize">{location}</h3>
                    </button>
                    <div className="mt-2 rounded-lg overflow-hidden h-48">
                      <img 
                        src={locationImages[location as keyof typeof locationImages]} 
                        alt={`${location} destination`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Style Selection */}
            {selectedLocation && (
              <div className="mb-12">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  What's your preferred style?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['modern', 'vintage', 'natural'].map((style) => (
                    <button
                      key={style}
                      onClick={() => handleStyleSelect(style as 'modern' | 'vintage' | 'natural')}
                      className={`p-6 rounded-lg border-2 transition-all ${
                        selectedStyle === style
                          ? 'border-amber-600 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <h3 className="text-lg font-medium capitalize">{style}</h3>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-64 md:h-96">
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {result.name}
                  </h2>
                  <div className="flex items-center mb-4">
                    <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-gray-600">{result.location}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-amber-500" />
                      <span className="ml-1 font-medium">{result.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-amber-600 font-medium">{result.price}</span>
                  </div>
                  <p className="text-gray-700 mb-6">
                    {result.description}
                  </p>
                  <button className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UnderConstruction;