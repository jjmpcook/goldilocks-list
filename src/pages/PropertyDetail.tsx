import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, ArrowLeft, Heart } from 'lucide-react';
import Layout from '../components/common/Layout';
import Gallery from '../components/property/Gallery';
import RoomLayouts from '../components/property/RoomLayouts';
import PropertyAmenities from '../components/property/PropertyAmenities';
import PropertyPerks from '../components/property/PropertyPerks';
import Button from '../components/common/Button';
import { getPropertyById } from '../data/properties';
import { useFavorites } from '../hooks/useFavorites';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = getPropertyById(parseInt(id || '0'));
  const { isFavorite, toggleFavorite } = useFavorites();
  
  if (!property) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Homepage
          </Link>
        </div>
      </Layout>
    );
  }
  
  const favorited = isFavorite(property.id);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to properties
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
            <div className="flex items-center text-gray-600 mb-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{property.location}</span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-3">
                <Star className="w-4 h-4 text-amber-500 mr-1" />
                <span className="font-medium">{property.rating}</span>
                <span className="text-gray-500 ml-1">({property.reviews} reviews)</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <button 
              onClick={() => toggleFavorite(property.id)}
              className={`mr-3 p-2 rounded-full border transition-colors ${
                favorited 
                  ? 'bg-rose-50 border-rose-200 text-rose-500' 
                  : 'border-gray-300 text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Heart className={`h-5 w-5 ${favorited ? 'fill-rose-500' : ''}`} />
            </button>
            
            <Button primary>Book Now</Button>
          </div>
        </div>
        
        <Gallery images={property.images} property={property.name} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About this property</h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </section>
            
            <PropertyAmenities amenities={property.amenities} />
            
            <RoomLayouts rooms={property.roomTypes} />
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
              <div className="mb-6">
                <span className="text-gray-500 text-sm block">Price starts at</span>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-amber-600">${property.price}</span>
                  <span className="text-gray-500 ml-1">/night</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Check-in Date"
                />
                
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Check-out Date"
                />
                
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="" disabled selected>Number of guests</option>
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                  <option value="5">5+ guests</option>
                </select>
              </div>
              
              <Button primary className="w-full mb-4">
                Check Availability
              </Button>
              
              <PropertyPerks perks={property.perks} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetail;