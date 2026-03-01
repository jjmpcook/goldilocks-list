import React, { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import PropertyCard from '../components/common/PropertyCard';
import AuthModal from '../components/auth/AuthModal';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../contexts/AuthContext';
import { getPropertyById } from '../data/properties';
import { Property } from '../types';
import { Heart, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const Favorites: React.FC = () => {
  const { user } = useAuth();
  const { favorites, loading } = useFavorites();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(false);

  useEffect(() => {
    if (loading || favorites.length === 0) {
      setFavoriteProperties([]);
      return;
    }

    const fetchProperties = async () => {
      setPropertiesLoading(true);
      try {
        const results = await Promise.all(
          favorites.map(id => getPropertyById(String(id)))
        );
        setFavoriteProperties(results.filter((p): p is Property => p !== undefined));
      } finally {
        setPropertiesLoading(false);
      }
    };

    fetchProperties();
  }, [favorites, loading]);

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12 bg-gray-50 rounded-lg max-w-md mx-auto">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">Sign in to save favorites</h3>
            <p className="text-gray-600 mb-6">
              Create an account to save your favorite properties and access them from any device.
            </p>
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              primary
              className="flex items-center justify-center mx-auto"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Sign In / Sign Up
            </Button>
          </div>
        </div>
        
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode="signin"
        />
      </Layout>
    );
  }

  if (loading || propertiesLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center mb-8">
            <Heart className="w-6 h-6 text-rose-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Your Favorites</h1>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Heart className="w-6 h-6 text-rose-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Your Favorites</h1>
        </div>
        
        {favoriteProperties.length > 0 ? (
          <>
            <p className="mb-8 text-gray-600">You have {favoriteProperties.length} favorite {favoriteProperties.length === 1 ? 'property' : 'properties'}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-6">
              Start adding properties to your favorites by clicking the heart icon.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center justify-center bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Browse properties
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;