import React from 'react';
import { Bus as BusIcon, MapPin } from 'lucide-react';

export const BusCard = ({ bus, onViewRoute }) => {
  let currentLocation;

  try {
    // Attempt to parse currentLocation if it's a JSON string
    currentLocation = typeof bus.currentLocation === 'string' 
      ? JSON.parse(bus.currentLocation)?.currentLocation 
      : bus.currentLocation?.currentLocation;
  } catch {
    // If parsing fails, set it to a fallback value
    currentLocation = 'Not set';
  }

  return (
    <div className="bg-[#FEFFA7] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <BusIcon className="w-10 h-10 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Bus {bus.busNumber}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          bus.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {bus.status}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-4 text-black-600">
          <MapPin className="w-5 h-5" />
          <span>Current Location: {currentLocation || 'Not set'}</span>
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
