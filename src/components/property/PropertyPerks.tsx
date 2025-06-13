import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PropertyPerksProps {
  perks: string[];
}

const PropertyPerks: React.FC<PropertyPerksProps> = ({ perks }) => {
  return (
    <div className="my-8 bg-amber-50 border border-amber-100 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Booking Perks
        <span className="text-amber-600"> (Goldilock's List Exclusive)</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {perks.map((perk, index) => (
          <div key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <span className="text-gray-800">{perk}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyPerks;