import React from 'react';
import Layout from '../components/common/Layout';
import { MapPin, Globe } from 'lucide-react';
import { cities } from '../data/cities';
import { Link } from 'react-router-dom';

interface FeaturedDestination {
  name: string;
  image: string;
  description: string;
  properties: number;
}

const featuredDestinations: FeaturedDestination[] = [
  {
    name: "National Parks",
    image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
    description: "Experience nature's majesty with accommodations near America's most beautiful national parks.",
    properties: 85
  },
  {
    name: "Beach Getaways",
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg",
    description: "Sun, sand, and surf with family-friendly beach properties perfect for memorable vacations.",
    properties: 127
  },
  {
    name: "City Adventures",
    image: "https://images.pexels.com/photos/10444352/pexels-photo-10444352.jpeg",
    description: "Urban exploration made easy with centrally located stays near family attractions.",
    properties: 93
  },
  {
    name: "Mountain Retreats",
    image: "https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg",
    description: "Cozy cabins and lodges for family adventures in stunning mountain settings.",
    properties: 74
  }
];

const Destinations: React.FC = () => {
  return (
    <Layout>
      <div className="relative bg-cover bg-center py-24" style={{ 
        backgroundImage: 'url("https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg")'
      }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-amber-400 mr-2" />
              <h1 className="text-4xl font-bold text-white">Destinations</h1>
            </div>
            <p className="text-xl text-white opacity-90 mb-8">
              Discover perfect family-friendly locations across the globe, each offering accommodations that are 'just right' for your family's needs.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Link to="#cities" className="bg-white text-amber-600 hover:bg-amber-50 transition-colors px-4 py-2 rounded-full font-medium">
                Cities
              </Link>
              <Link to="#featured" className="bg-white text-blue-600 hover:bg-blue-50 transition-colors px-4 py-2 rounded-full font-medium">
                Featured Collections
              </Link>
              <Link to="#international" className="bg-white text-green-600 hover:bg-green-50 transition-colors px-4 py-2 rounded-full font-medium">
                International
              </Link>
              <Link to="#seasonal" className="bg-white text-purple-600 hover:bg-purple-50 transition-colors px-4 py-2 rounded-full font-medium">
                Seasonal Favorites
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>
      
      {/* Cities Section */}
      <section id="cities" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Cities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These cities consistently rank as top choices for family-friendly stays and attractions
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map(city => (
              <Link 
                key={city.id} 
                to={`/search/${city.name}`}
                className="group"
              >
                <div className="relative rounded-xl overflow-hidden shadow-md transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-lg h-64">
                  <img 
                    src={city.image} 
                    alt={city.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 mr-2 text-amber-400" />
                        <h3 className="text-xl font-bold">{city.name}</h3>
                      </div>
                      <p className="text-sm text-gray-200 mb-2">{city.description}</p>
                      <div className="inline-block bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {city.properties} properties
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Collections */}
      <section id="featured" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Curated collections of stays organized by experience type and environment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredDestinations.map((destination, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden group">
                <div className="md:flex h-full">
                  <div className="md:w-2/5 relative overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="h-48 md:h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="md:w-3/5 p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                    <p className="text-gray-600 mb-4">{destination.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-gray-500">{destination.properties} properties</span>
                      <Link 
                        to="#" 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium group-hover:underline"
                      >
                        Explore →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Your Perfect Destination</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our interactive map to discover family-friendly accommodations around the world
              </p>
            </div>
            
            <div className="bg-gray-200 rounded-xl h-[400px] flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">Interactive Map Coming Soon</h3>
                <p className="text-gray-600">
                  We're building an amazing map feature to help you explore our destinations visually.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Not Sure Where to Go?</h3>
              <Link 
                to="#" 
                className="inline-flex items-center justify-center bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
              >
                Take Our Family Vacation Quiz
              </Link>
              <p className="mt-3 text-gray-600">
                Answer a few questions about your family and preferences to get personalized destination recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Destinations;