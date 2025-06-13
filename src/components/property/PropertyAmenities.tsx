import React from 'react';
import { Wifi, Coffee, Tv, Utensils, Minimize as Swimming, GamepadIcon, Baby, ParkingCircle, TreePine, Bike, Dog, Sunrise } from 'lucide-react';

interface PropertyAmenitiesProps {
  amenities: string[];
}

const amenityIcons: Record<string, React.ReactNode> = {
  'Free WiFi': <Wifi size={20} />,
  'Breakfast': <Coffee size={20} />,
  'Smart TV': <Tv size={20} />,
  'Kitchen': <Utensils size={20} />,
  'Pool': <Swimming size={20} />,
  'Game Room': <GamepadIcon size={20} />,
  'Kids Club': <Baby size={20} />,
  'Parking': <ParkingCircle size={20} />,
  'Family Dining': <Utensils size={20} />,
  'Playground': <TreePine size={20} />,
  'Family Pool': <Swimming size={20} />,
  'Babysitting Services': <Baby size={20} />,
  'Indoor Heated Pool': <Swimming size={20} />,
  'Kid-friendly Hiking Trails': <Bike size={20} />,
  'Children\'s Activities': <Baby size={20} />,
  'Family Movie Nights': <Tv size={20} />,
  'Hot Cocoa Bar': <Coffee size={20} />,
  'Equipment Rentals': <Bike size={20} />,
  'Farm Animal Interactions': <Dog size={20} />,
  'Organic Garden': <TreePine size={20} />,
  'Fishing Pond': <Sunrise size={20} />,
  'Campfire Area': <TreePine size={20} />,
  'Cooking Classes': <Utensils size={20} />,
  'Hayrides': <Bike size={20} />,
  'Treehouse': <TreePine size={20} />,
  'Private Beach': <Sunrise size={20} />,
  'Kayaks & Paddleboards': <Swimming size={20} />,
  'Fishing Gear': <Sunrise size={20} />,
  'Outdoor Grills': <Utensils size={20} />,
  'Fire Pits': <TreePine size={20} />,
  'Board Games': <GamepadIcon size={20} />,
  'Kid-friendly Tours': <TreePine size={20} />,
  'Family Movie Library': <Tv size={20} />,
  'Child-proofed Rooms': <Baby size={20} />,
  'Stroller Rentals': <Baby size={20} />,
  'Kids Welcome Package': <Baby size={20} />,
  'Private Pools': <Swimming size={20} />,
  'Beach Equipment': <Sunrise size={20} />,
  'Kids Beach Club': <Baby size={20} />,
  'Mini Golf': <GamepadIcon size={20} />,
  'Children\'s Play Area': <Baby size={20} />,
  'Beach Volleyball': <Sunrise size={20} />,
  'Family BBQ Areas': <Utensils size={20} />,
};

const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({ amenities }) => {
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {amenities.map((amenity, index) => (
          <div 
            key={index} 
            className="flex items-center p-3 bg-gray-50 rounded-lg" 
          >
            <div className="mr-3 text-amber-600">
              {amenityIcons[amenity] || <span className="h-5 w-5 inline-block bg-amber-100 rounded-full"></span>}
            </div>
            <span className="text-gray-700">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyAmenities;