import React, { useState } from 'react';
import { X, MapPin, Palette, Home, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HotelRecommendation {
  id: number;
  name: string;
  location: string;
  image: string;
  price: string;
  rating: number;
}

interface QuizResult {
  title: string;
  description: string;
  image: string;
  characteristics: string[];
  hotelRecommendations: HotelRecommendation[];
}

const quizResults: Record<string, QuizResult> = {
  'beach-modern': {
    title: 'The Modern Beach Lover',
    description: 'You appreciate sleek design and contemporary amenities with ocean views. You love clean lines, smart technology, and sophisticated coastal vibes.',
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg',
    characteristics: ['Contemporary design', 'Ocean views', 'Smart amenities', 'Minimalist aesthetic'],
    hotelRecommendations: [
      {
        id: 1,
        name: 'The Ritz-Carlton, San Francisco',
        location: 'San Francisco, CA',
        image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
        price: 'From $599/night',
        rating: 4.8
      },
      {
        id: 2,
        name: 'Hotel Zephyr San Francisco',
        location: 'San Francisco, CA',
        image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg',
        price: 'From $349/night',
        rating: 4.6
      }
    ]
  },
  'beach-vintage': {
    title: 'The Vintage Beach Explorer',
    description: 'You love retro charm and nostalgic beach culture. Think mid-century modern meets surf culture with authentic local character.',
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg',
    characteristics: ['Retro charm', 'Local culture', 'Authentic experiences', 'Vintage aesthetics'],
    hotelRecommendations: [
      {
        id: 2,
        name: 'Hotel Zephyr San Francisco',
        location: 'San Francisco, CA',
        image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg',
        price: 'From $349/night',
        rating: 4.6
      },
      {
        id: 6,
        name: 'Zetter Townhouse Marylebone',
        location: 'London, UK',
        image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
        price: 'From $399/night',
        rating: 4.7
      }
    ]
  },
  'beach-natural': {
    title: 'The Natural Beach Seeker',
    description: 'You prefer eco-conscious properties that blend seamlessly with nature. Sustainability and organic design elements speak to your soul.',
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg',
    characteristics: ['Eco-friendly', 'Natural materials', 'Sustainable practices', 'Organic design'],
    hotelRecommendations: [
      {
        id: 7,
        name: 'Aman Tokyo',
        location: 'Tokyo, Japan',
        image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
        price: 'From $1299/night',
        rating: 4.9
      },
      {
        id: 5,
        name: 'The Langham, London',
        location: 'London, UK',
        image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
        price: 'From $649/night',
        rating: 4.8
      }
    ]
  },
  'mountain-modern': {
    title: 'The Modern Mountain Enthusiast',
    description: 'You love contemporary luxury in mountain settings. Think glass, steel, and stone with panoramic alpine views and cutting-edge amenities.',
    image: 'https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg',
    characteristics: ['Alpine luxury', 'Contemporary design', 'Panoramic views', 'Premium amenities'],
    hotelRecommendations: [
      {
        id: 1,
        name: 'The Ritz-Carlton, San Francisco',
        location: 'San Francisco, CA',
        image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
        price: 'From $599/night',
        rating: 4.8
      },
      {
        id: 7,
        name: 'Aman Tokyo',
        location: 'Tokyo, Japan',
        image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
        price: 'From $1299/night',
        rating: 4.9
      }
    ]
  },
  'mountain-vintage': {
    title: 'The Rustic Mountain Lover',
    description: 'You appreciate cozy cabins and traditional mountain lodge aesthetics. Fireplaces, wood beams, and authentic mountain culture are your jam.',
    image: 'https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg',
    characteristics: ['Rustic charm', 'Traditional design', 'Cozy atmosphere', 'Mountain heritage'],
    hotelRecommendations: [
      {
        id: 6,
        name: 'Zetter Townhouse Marylebone',
        location: 'London, UK',
        image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
        price: 'From $399/night',
        rating: 4.7
      },
      {
        id: 5,
        name: 'The Langham, London',
        location: 'London, UK',
        image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
        price: 'From $649/night',
        rating: 4.8
      }
    ]
  },
  'mountain-natural': {
    title: 'The Wilderness Mountain Explorer',
    description: 'You seek authentic wilderness experiences with minimal environmental impact. Raw natural beauty and outdoor adventures define your perfect stay.',
    image: 'https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg',
    characteristics: ['Wilderness access', 'Minimal impact', 'Outdoor adventures', 'Natural beauty'],
    hotelRecommendations: [
      {
        id: 7,
        name: 'Aman Tokyo',
        location: 'Tokyo, Japan',
        image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
        price: 'From $1299/night',
        rating: 4.9
      },
      {
        id: 8,
        name: 'Hotel Gracery Shinjuku',
        location: 'Tokyo, Japan',
        image: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg',
        price: 'From $299/night',
        rating: 4.6
      }
    ]
  },
  'city-modern': {
    title: 'The Urban Modernist',
    description: 'You thrive in sleek city hotels with cutting-edge design and technology. Rooftop bars, smart rooms, and contemporary art are essential.',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg',
    characteristics: ['Urban sophistication', 'Modern technology', 'Rooftop amenities', 'Contemporary art'],
    hotelRecommendations: [
      {
        id: 4,
        name: 'Pod Hotels Times Square',
        location: 'New York, NY',
        image: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg',
        price: 'From $299/night',
        rating: 4.5
      },
      {
        id: 8,
        name: 'Hotel Gracery Shinjuku',
        location: 'Tokyo, Japan',
        image: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg',
        price: 'From $299/night',
        rating: 4.6
      }
    ]
  },
  'city-vintage': {
    title: 'The Historic City Explorer',
    description: 'You love boutique hotels with character and history. Think converted buildings, vintage decor, and neighborhoods with authentic local culture.',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg',
    characteristics: ['Historic character', 'Boutique charm', 'Local culture', 'Vintage details'],
    hotelRecommendations: [
      {
        id: 3,
        name: 'The Plaza Hotel',
        location: 'New York, NY',
        image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg',
        price: 'From $899/night',
        rating: 4.9
      },
      {
        id: 6,
        name: 'Zetter Townhouse Marylebone',
        location: 'London, UK',
        image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
        price: 'From $399/night',
        rating: 4.7
      }
    ]
  },
  'city-natural': {
    title: 'The Urban Eco-Warrior',
    description: 'You want sustainable luxury in the city. Green roofs, locally-sourced everything, and eco-conscious practices in an urban setting.',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg',
    characteristics: ['Urban sustainability', 'Green practices', 'Local sourcing', 'Eco-luxury'],
    hotelRecommendations: [
      {
        id: 5,
        name: 'The Langham, London',
        location: 'London, UK',
        image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
        price: 'From $649/night',
        rating: 4.8
      },
      {
        id: 7,
        name: 'Aman Tokyo',
        location: 'Tokyo, Japan',
        image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
        price: 'From $1299/night',
        rating: 4.9
      }
    ]
  }
};

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<'beach' | 'mountain' | 'city' | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<'modern' | 'vintage' | 'natural' | null>(null);
  const [showResult, setShowResult] = useState(false);

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedLocation(null);
    setSelectedStyle(null);
    setShowResult(false);
  };

  const handleLocationSelect = (location: 'beach' | 'mountain' | 'city') => {
    setSelectedLocation(location);
    setCurrentStep(1);
  };

  const handleStyleSelect = (style: 'modern' | 'vintage' | 'natural') => {
    setSelectedStyle(style);
    setShowResult(true);
  };

  const getResult = (): QuizResult | null => {
    if (selectedLocation && selectedStyle) {
      const key = `${selectedLocation}-${selectedStyle}` as keyof typeof quizResults;
      return quizResults[key];
    }
    return null;
  };

  const handleClose = () => {
    resetQuiz();
    onClose();
  };

  if (!isOpen) return null;

  const result = getResult();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-900">
            {showResult ? 'Your Hotel Personality' : 'Discover Your Hotel Style'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {!showResult ? (
            <>
              {currentStep === 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                    Where do you dream of staying?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'beach', label: 'Beach', icon: '🏖️', description: 'Ocean views & coastal vibes' },
                      { key: 'mountain', label: 'Mountain', icon: '🏔️', description: 'Alpine adventures & fresh air' },
                      { key: 'city', label: 'City', icon: '🏙️', description: 'Urban energy & cultural experiences' }
                    ].map((location) => (
                      <button
                        key={location.key}
                        onClick={() => handleLocationSelect(location.key as 'beach' | 'mountain' | 'city')}
                        className="p-6 rounded-lg border-2 border-gray-200 hover:border-amber-500 hover:bg-amber-50 transition-all text-center group"
                      >
                        <div className="text-4xl mb-3">{location.icon}</div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{location.label}</h4>
                        <p className="text-sm text-gray-600">{location.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      What's your design style?
                    </h3>
                    <p className="text-gray-600">You chose {selectedLocation} destinations</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'modern', label: 'Modern', icon: '✨', description: 'Sleek, contemporary & tech-forward' },
                      { key: 'vintage', label: 'Vintage', icon: '🎭', description: 'Classic charm & authentic character' },
                      { key: 'natural', label: 'Natural', icon: '🌿', description: 'Eco-friendly & organic materials' }
                    ].map((style) => (
                      <button
                        key={style.key}
                        onClick={() => handleStyleSelect(style.key as 'modern' | 'vintage' | 'natural')}
                        className="p-6 rounded-lg border-2 border-gray-200 hover:border-amber-500 hover:bg-amber-50 transition-all text-center group"
                      >
                        <div className="text-4xl mb-3">{style.icon}</div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{style.label}</h4>
                        <p className="text-sm text-gray-600">{style.description}</p>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setCurrentStep(0)}
                      className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                    >
                      ← Back to location
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : result && (
            <div className="text-center">
              <div className="mb-6">
                <img
                  src={result.image}
                  alt={result.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{result.title}</h3>
                <p className="text-gray-700 text-lg">{result.description}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-amber-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Palette className="w-5 h-5 mr-2 text-amber-600" />
                    Your Style Traits
                  </h4>
                  <ul className="space-y-2">
                    {result.characteristics.map((trait, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Home className="w-5 h-5 mr-2 text-blue-600" />
                    We Recommend
                  </h4>
                  <div className="space-y-3">
                    {result.hotelRecommendations.map((hotel) => (
                      <Link
                        key={hotel.id}
                        to={`/property/${hotel.id}`}
                        onClick={handleClose}
                        className="block bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 text-left">
                            <h5 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
                              {hotel.name}
                            </h5>
                            <div className="flex items-center text-xs text-gray-500 mb-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              {hotel.location}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-amber-600 font-medium">{hotel.price}</span>
                              <div className="flex items-center">
                                <span className="text-amber-500 text-xs">★</span>
                                <span className="text-xs text-gray-600 ml-1">{hotel.rating}</span>
                              </div>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={resetQuiz}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Take Quiz Again
                </button>
                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Explore All Hotels
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;