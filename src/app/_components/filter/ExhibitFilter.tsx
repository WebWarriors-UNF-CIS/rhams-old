import React, { useState, useEffect } from 'react';
import { remult } from 'remult';
import { Exhibit } from '../../_shared/exhibit';

export const ExhibitFilter: React.FC<{ onFilterChange: Function }> = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
        const exhibits = await remult.repo(Exhibit).find();
        const uniqueLocations = Array.from(new Set(exhibits.map(exhibit => exhibit.location).filter((location): location is string => !!location)));
        setLocations(uniqueLocations);
        setSelectedLocation(uniqueLocations[0] || '');
    };
    fetchLocations();
    }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, boundary: 'start' | 'end') => {
    setDateRange(prevRange => ({ ...prevRange, [boundary]: e.target.value }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
  };

  const applyFilters = () => {
    onFilterChange({ ...dateRange, location: selectedLocation });
  };

  const handleClearFilters = () => {
    setDateRange({ start: '', end: '' });
    setSelectedLocation('');
    onFilterChange({ startDate: '', endDate: '', location: '' });
  };

  return (
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-around items-center my-4">
        {/* Date Range Slider would go here */}
        <div className="input">
          <label className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
          <input 
            type="date" 
            className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={dateRange.start} 
            onChange={(e) => handleDateChange(e, 'start')} 
          />
        </div>
        <div className="input">
          <label className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
          <input 
            type="date" 
            className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={dateRange.end} 
            onChange={(e) => handleDateChange(e, 'end')} 
          />
        </div>
        <div className="input">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location:
            <select 
              className="block appearance-none text-gray-700 w-full border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              <option value="">Select Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </label>
        </div>
      <button className="btn-gray mx-4 w-20" onClick={applyFilters}>Apply</button>
      <button className="btn-red mx-4 w-20" onClick={handleClearFilters}>Clear</button>
    </div>
  );
};