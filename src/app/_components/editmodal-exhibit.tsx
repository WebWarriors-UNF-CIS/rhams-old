import React, { useState } from 'react';
import { Exhibit } from '../_shared/exhibit';

interface ExhibitModalProps {
  exhibit: Exhibit | null;
  onClose: () => void;
  onSave: (exhibit: Exhibit) => void;
}

const ExhibitModal: React.FC<ExhibitModalProps> = ({ exhibit, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExhibit, setEditedExhibit] = useState<Partial<Exhibit>>(exhibit || {});

  if (!exhibit) return null;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (editedExhibit && editedExhibit.id !== undefined) {
      onSave(editedExhibit as Exhibit);
      setIsEditing(false);
    }
  };

  const handleBackClick = () => {
    setIsEditing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg max-w-xl w-full shadow-lg relative">
        <div className="flex justify-between items-start">
          <div className="flex">
            <div className="bg-gray-200 dark:bg-gray-700 h-24 w-24 flex items-center justify-center rounded">Logo</div>
            {isEditing ? (
              <input
                type="text"
                value={editedExhibit.name || exhibit.name || ''}
                onChange={(e) => setEditedExhibit({ ...editedExhibit, name: e.target.value })}
                className="ml-4 p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <h2 className="ml-4 font-bold text-xl dark:text-white">{exhibit.name}</h2>
            )}
          </div>
          {isEditing ? (
            <button onClick={handleSaveClick} className="text-sm dark:text-gray-300 bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-700">Save</button>
          ) : (
            <button onClick={handleEditClick} className="text-sm dark:text-gray-300 bg-gray-500  dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700">Edit</button>
          )}
        </div>
        {isEditing ? (
          <>
            <label className="block mt-4 dark:text-white">Start Date:</label>
            <input
              type="date"
              value={editedExhibit.startDate instanceof Date ? editedExhibit.startDate.toISOString().split('T')[0] : editedExhibit.startDate || (exhibit.startDate instanceof Date ? exhibit.startDate.toISOString().split('T')[0] : exhibit.startDate || '')}
              onChange={(e) => setEditedExhibit({ ...editedExhibit, startDate: new Date(e.target.value) })}
              className="p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <label className="block mt-4 dark:text-white">End Date:</label>
            <input
              type="date"
              value={editedExhibit.endDate instanceof Date ? editedExhibit.endDate.toISOString().split('T')[0] : editedExhibit.endDate || (exhibit.endDate instanceof Date ? exhibit.endDate.toISOString().split('T')[0] : exhibit.endDate || '')}
              onChange={(e) => setEditedExhibit({ ...editedExhibit, endDate: new Date(e.target.value) })}
              className="p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </>
        ) : (
          <div className="grid grid-cols-2 gap-2 mt-2 dark:text-gray-300">
            <div>Start: {exhibit.startDate instanceof Date ? exhibit.startDate.toISOString().split('T')[0] : exhibit.startDate}</div>
            <div>End: {exhibit.endDate instanceof Date ? exhibit.endDate.toISOString().split('T')[0] : exhibit.endDate}</div>
          </div>
        )}
        <div className="absolute bottom-0 right-0 m-4">
          <button onClick={handleBackClick} className="text-sm dark:text-gray-300 bg-gray-500  dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700">Back</button>
        </div>
        <h3 className="mt-4 font-bold">Featured Artists</h3>
        <ul>
          <li>Artist A</li>
          <li>Artist B</li>
          <li>Artist C</li>
        </ul>
        <h3 className="mt-4 font-bold">Featured Artworks</h3>
        <ul>
          <li>Artwork A</li>
          <li>Artwork B</li>
          <li>Artwork C</li>
        </ul>
      </div>
    </div>
  );
};

export default ExhibitModal;
