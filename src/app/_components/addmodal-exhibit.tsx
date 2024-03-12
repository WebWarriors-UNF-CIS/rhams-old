"use client";
import React, { useState } from 'react';
import { remult } from 'remult';
import { Exhibit } from '../_shared/exhibit';

interface AddExhibitModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddExhibitModal: React.FC<AddExhibitModalProps> = ({ onClose, onSuccess }) => {
  const [exhibitData, setExhibitData] = useState<Partial<Exhibit>>({
    name: '',
    location: '',
    startDate: new Date,
    endDate: new Date,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExhibitData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await remult.repo(Exhibit).insert(exhibitData as Exhibit);
      onSuccess();
    } catch (error) {
      console.error('Error adding exhibit:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Add New Exhibit</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name:</label>
                <input type="text" id="name" name="name" value={"..."} onChange={handleChange} className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location:</label>
                <input type="text" id="location" name="location" value={"..."} onChange={handleChange} className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date:</label>
                <input type="date" id="startDate" name="startDate" value={"mm/dd/yyyy"}   onChange={handleChange} className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date:</label>
                <input type="date" id="endDate" name="endDate" value={"mm/dd/yyyy"}  onChange={handleChange} className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md w-full" />
            </div>
            <div className="flex justify-center">
                <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md">Submit</button>                
            </div>
            <div className="flex justify-center">
                <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md">Cancel</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddExhibitModal;
