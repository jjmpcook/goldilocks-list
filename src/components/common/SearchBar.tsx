import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { cities } from '../../data/cities';

interface SearchBarProps {
  className?: string;
  variant?: 'hero' | 'header';
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '', variant = 'hero' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 1) {
      const filteredSuggestions = cities
        .filter(city => city.name.toLowerCase().includes(value.toLowerCase()))
        .map(city => city.name);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm.trim()}`);
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    navigate(`/search/${suggestion}`);
  };

  // Styles based on variant
  const inputClasses = variant === 'hero'
    ? 'py-4 pl-12 pr-4 text-lg rounded-full shadow-lg'
    : 'py-2 pl-10 pr-3 text-sm rounded-lg';

  const containerClasses = variant === 'hero'
    ? 'max-w-xl w-full'
    : 'w-full max-w-xs';

  return (
    <div className={`relative ${containerClasses} ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className={`${variant === 'hero' ? 'h-5 w-5' : 'h-4 w-4'} text-gray-500`} />
          </div>
          <input
            type="text"
            placeholder="Search by city or destination..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={`w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 border border-gray-300 ${inputClasses}`}
          />
          {variant === 'hero' && (
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors"
            >
              Search
            </button>
          )}
        </div>
      </form>
      
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;