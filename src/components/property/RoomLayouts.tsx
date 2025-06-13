import React, { useState } from 'react';
import { RoomType } from '../../types';

interface RoomLayoutsProps {
  rooms: RoomType[];
}

const RoomLayouts: React.FC<RoomLayoutsProps> = ({ rooms }) => {
  const [selectedRoomId, setSelectedRoomId] = useState<number>(rooms[0]?.id);
  
  const selectedRoom = rooms.find(room => room.id === selectedRoomId);
  
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Room Options</h3>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Room Selection */}
        <div className="md:w-1/3">
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-2">
              {rooms.map(room => (
                <li key={room.id}>
                  <button
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedRoomId === room.id 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{room.name}</div>
                    <div className="text-sm text-gray-500">Fits up to {room.capacity} people</div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Room Details */}
        {selectedRoom && (
          <div className="md:w-2/3">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 overflow-hidden">
                <img 
                  src={selectedRoom.image} 
                  alt={selectedRoom.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedRoom.name}</h4>
                <p className="text-gray-700 mb-4">{selectedRoom.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <span className="block text-sm text-gray-500">Capacity</span>
                    <span className="font-medium">{selectedRoom.capacity} people</span>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <span className="block text-sm text-gray-500">Bed Configuration</span>
                    <span className="font-medium">{selectedRoom.bedType}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 text-sm">Starting from</span>
                    <div className="text-xl font-bold text-amber-600">${selectedRoom.price}<span className="text-sm font-normal text-gray-500">/night</span></div>
                  </div>
                  
                  <button className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors">
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomLayouts;