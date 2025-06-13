import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

interface GalleryProps {
  images: string[];
  property: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, property }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };
  
  return (
    <>
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main Image */}
          <div className="md:col-span-2">
            <img 
              src={images[0]} 
              alt={`${property} main view`} 
              className="w-full h-[300px] md:h-[400px] object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => openModal(0)}
            />
          </div>
          
          {/* Thumbnail Images */}
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative group">
              <img 
                src={image} 
                alt={`${property} view ${index + 1}`} 
                className="w-full h-[150px] object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => openModal(index + 1)}
              />
              {index === 3 && images.length > 5 && (
                <div 
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg cursor-pointer hover:bg-opacity-60 transition-opacity"
                  onClick={() => openModal(4)}
                >
                  <span className="text-white text-xl font-semibold">+{images.length - 5} more</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Full Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={32} />
          </button>
          
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity"
            onClick={prevImage}
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="relative max-w-4xl w-full h-[80vh] flex items-center justify-center">
            <img 
              src={images[currentIndex]} 
              alt={`${property} view ${currentIndex + 1}`} 
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity"
            onClick={nextImage}
          >
            <ArrowRight size={24} />
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;