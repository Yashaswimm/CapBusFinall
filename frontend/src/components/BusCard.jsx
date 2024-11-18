import React from 'react';
import { Bus as BusIcon, MapPin } from 'lucide-react';

export const BusCard = ({ bus, onViewRoute }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <BusIcon className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Bus {bus.busNumber}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          bus.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {bus.status}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>Current Location: {bus.currentLocation || 'Not set'}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Capacity: {bus.capacity}</span>
          <span>Occupancy: {bus.currentOccupancy}</span>
        </div>
      </div>

      <button
        onClick={onViewRoute}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        View Route Stops
      </button>
    </div>
  );
};