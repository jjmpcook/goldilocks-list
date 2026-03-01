import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import { Heart, MapPin, Star, Eye, Filter, Grid, List, Search, AlertCircle } from 'lucide-react';
import { getProperties } from '../data/properties';
import { useFavorites } from '../hooks/useFavorites';
import { Property } from '../types';

const BrowseGallery: React.FC = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [filterPriceRange, setFilterPriceRange] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const priceRanges = [
    { label: 'Under $300', value: '0-300' },
    { label: '$300 - $500', value: '300-500' },
    { label: '$500 - $800', value: '500-800' },
    { label: '$800+', value: '800-9999' }
  ];

  // Fetch all properties from Supabase on mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProperties();
        setAllProperties(data);
        setFilteredProperties(data);
      } catch (err) {
        console.error('Error loading properties:', err);
        setError('Failed to load hotels. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Re-run filters whenever data or any filter value changes
  useEffect(() => {
    let filtered = allProperties;

    // Filter by city
    if (filterCity !== 'all') {
      filtered = filtered.filter(p => p.city === filterCity);
    }

    // Filter by price range
    if (filterPriceRange !== 'all') {
      const [min, max] = filterPriceRange.split('-').map(Number);
      filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    // Filter by search term
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(lower) ||
        p.location.toLowerCase().includes(lower) ||
        p.city.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
      );
    }

    setFilteredProperties(filtered);
  }, [allProperties, filterCity, filterPriceRange, searchTerm]);

  // Derive city list from live data
  const cities = Array.from(new Set(allProperties.map(p => p.city)));

  const clearFilters = () => {
    setFilterCity('all');
    setFilterPriceRange('all');
    setSearchTerm('');
  };

  const PropertyCard: React.FC<{ property: Property; className?: string }> = ({ property, className = '' }) => {
    const favorited = isFavorite(property.id);

    return (
      <div className={`group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}>
        <div className="relative">
          <Link to={`/property/${property.id}`}>
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Overlay with quick actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
              <Link
                to={`/property/${property.id}`}
                className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-5 h-5" />
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(property.id);
                }}
                className={`p-2 rounded-full shadow-lg transition-colors ${
                  favorited
                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                    : 'bg-white text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Price badge */}
          <div className="absolute top-3 left-3 bg-white bg-opacity-95 backdrop-blur-sm text-gray-800 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
            ${property.price}/night
          </div>

          {/* Heart button for mobile */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(property.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition-all md:opacity-0 md:group-hover:opacity-100 ${
              favorited
                ? 'bg-rose-500 text-white'
                : 'bg-white bg-opacity-90 text-gray-700 hover:bg-opacity-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="p-4">
          <Link to={`/property/${property.id}`}>
            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors line-clamp-2">
              {property.name}
            </h3>
          </Link>

          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="text-sm truncate">{property.location}</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-amber-500 mr-1" />
              <span className="text-sm font-medium">{property.rating}</span>
              <span className="text-sm text-gray-500 ml-1">({property.reviews})</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {property.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 2).map((amenity, index) => (
              <span key={index} className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 2 && (
              <span className="inline-block bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full">
                +{property.amenities.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-amber-50 via-white to-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Browse & Dream
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover your perfect family getaway. Save your favorites and start planning your next adventure.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search hotels, cities, or amenities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>

                <span className="text-sm text-gray-600">
                  {loading ? 'Loading...' : `${filteredProperties.length} hotels found`}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'masonry' ? 'bg-amber-100 text-amber-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-amber-100 text-amber-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <select
                      value={filterCity}
                      onChange={(e) => setFilterCity(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="all">All Cities</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <select
                      value={filterPriceRange}
                      onChange={(e) => setFilterPriceRange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="all">All Prices</option>
                      {priceRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading hotels...</p>
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Something went wrong</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {viewMode === 'masonry' ? (
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      className="break-inside-avoid"
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}

              {filteredProperties.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No hotels found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms to find more results.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Inspiration Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start Planning Your Dream Trip
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Found some favorites? Create your perfect itinerary and get personalized recommendations from our travel experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/favorites"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Heart className="w-5 h-5 mr-2" />
                View My Wishlist
              </Link>
              <Link
                to="/booking"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BrowseGallery;
