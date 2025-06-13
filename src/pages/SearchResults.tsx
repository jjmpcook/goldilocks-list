import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';
import Layout from '../components/common/Layout';
import PropertyCard from '../components/common/PropertyCard';
import { getPropertiesByCity } from '../data/properties';
import { getCityByName } from '../data/cities';

const SearchResults: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const properties = getPropertiesByCity(query || '');
  const city = getCityByName(query || '');
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to home
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Family Stays in {query}
          </h1>
          
          {city && (
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 text-amber-500 mr-2" />
              <p className="text-gray-600">{city.description}</p>
            </div>
          )}
          
          <p className="text-gray-600">
            {properties.length} properties found
          </p>
        </div>
        
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any family stays in {query}.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center justify-center bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Explore other destinations
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;