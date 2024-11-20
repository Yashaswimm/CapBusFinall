import React from 'react';
import Button from '../Button';

export default function BusForm({ onSubmit, formData, setFormData, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 w-full max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700">Bus Reg Number</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.busRegisterationNumber}
          onChange={(e) => setFormData({ ...formData, busId: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Seat Capacity</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.seatCapacity}
          onChange={(e) => setFormData({ ...formData, seatCapacity: parseInt(e.target.value) })}
          required
          min="0"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Current Occupancy</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.currentOccupancy}
          onChange={(e) => setFormData({ ...formData, currentOccupancy: parseInt(e.target.value) })}
          required
          min="0"
        />
      </div>
      <div>
  <label className="block text-sm font-medium text-gray-700">Bus Type</label>
  <select
    value={formData.busType}
    onChange={(e) => setFormData({ ...formData, busType: e.target.value })}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    required
  >
    <option value="Select Bus Type">Select Bus Type</option>
    <option value="Ashok Leyland">Ashok Leyland</option>
    <option value="Volvo">Volvo</option>
    <option value="Mercedes Benz">Mercedes Benz</option>
    <option value="Tata Motors">Tata Motors</option>
  </select>
</div>
     
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Add Bus
        </Button>
      </div>
    </form>
  );
}