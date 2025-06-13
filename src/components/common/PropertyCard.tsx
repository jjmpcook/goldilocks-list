import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../../types';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(property.id);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.name} 
          className="h-48 w-full object-cover"
        />
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(property.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
        >
          <Heart 
            size={20} 
            className={`${favorited ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}`} 
          />
        </button>
        <div className="absolute bottom-3 left-3 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
          ${property.price} / night
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/property/${property.id}`} className="block">
          <h3 className="text-lg font-bold text-gray-800 mb-1 hover:text-amber-600 transition-colors">{property.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{property.location}</p>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <div className="text-amber-500">★</div>
              <span className="ml-1 text-sm font-medium">{property.rating}</span>
            </div>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-600">{property.reviews} reviews</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="inline-block bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;