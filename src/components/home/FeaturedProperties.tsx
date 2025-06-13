import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PropertyCard from '../common/PropertyCard';
import { Property } from '../../types';

interface FeaturedPropertiesProps {
  properties: Property[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      
      containerRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
      
      setScrollPosition(scrollTo);
    }
  };
  
  const updateScrollPosition = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };
  
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollPosition);
      return () => container.removeEventListener('scroll', updateScrollPosition);
    }
  }, []);
  
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = containerRef.current 
    ? scrollPosition < containerRef.current.scrollWidth - containerRef.current.clientWidth - 10
    : true;
    
  return (
    <section className="py-16 bg-[#f8e1e6]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Featured Family Stays</h2>
            <p className="text-gray-600 mt-2">Handpicked accommodations perfect for your next family adventure</p>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full border ${
                canScrollLeft 
                  ? 'border-gray-300 text-gray-700 hover:bg-gray-100' 
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ArrowLeft size={24} />
            </button>
            
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-2 rounded-full border ${
                canScrollRight 
                  ? 'border-gray-300 text-gray-700 hover:bg-gray-100' 
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
        
        <div 
          ref={containerRef} 
          className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {properties.map(property => (
            <div key={property.id} className="flex-none w-full sm:w-[340px] md:w-[320px] lg:w-[350px]">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;