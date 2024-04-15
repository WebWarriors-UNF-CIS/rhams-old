import React, { useState } from 'react';
import { Artist } from '../_shared/artist';
import { ArrayDestructuringAssignment } from 'typescript';

interface ArtistModalProps {
  artist: Artist | null;
  onClose: () => void;
  onSave: (artist: Artist) => void;
}

const ArtistModal: React.FC<ArtistModalProps> = ({ artist, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedArtist, setEditedArtist] = useState<Partial<Artist>>(artist || {});

  if (!artist) return null;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (editedArtist && editedArtist.id !== undefined) {
      onSave(editedArtist as Artist);
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
                value={editedArtist.name || artist.name || ''}
                onChange={(e) => setEditedArtist({ ...editedArtist, name: e.target.value })}
                className="ml-4 p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <h2 className="ml-4 font-bold text-xl dark:text-white">{artist.name}</h2>
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
            <label className="block mt-4 dark:text-white">Date of Birth:</label>
            <input
              type="date"
              value={editedArtist.dob instanceof Date ? editedArtist.dob.toISOString().split('T')[0] : editedArtist.dob || (artist.dob instanceof Date ? artist.dob.toISOString().split('T')[0] : artist.dob || '')}
              onChange={(e) => setEditedArtist({ ...editedArtist, dob: new Date(e.target.value) })}
              className="p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <label className="block mt-4 dark:text-white">Date of Death:</label>
            <input
              type="date"
              value={editedArtist.dod instanceof Date ? editedArtist.dod.toISOString().split('T')[0] : editedArtist.dod || (artist.dod instanceof Date ? artist.dod.toISOString().split('T')[0] : artist.dod || '')}
              onChange={(e) => setEditedArtist({ ...editedArtist, dod: new Date(e.target.value) })}
              className="p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </>
        ) : (
          <div className="grid grid-cols-2 gap-2 mt-2 dark:text-gray-300">
            <div>Start: {artist.dob instanceof Date ? artist.dob.toISOString().split('T')[0] : artist.dob}</div>
            <div>End: {artist.dod instanceof Date ? artist.dod.toISOString().split('T')[0] : artist.dod}</div>
          </div>
        )}
        <div className="absolute bottom-0 right-0 m-4">
          <button onClick={handleBackClick} className="text-sm dark:text-gray-300 bg-gray-500  dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700">Back</button>
        </div>
        
        <h3 className="mt-4 font-bold">Artwork</h3>
        <ul>
          <li>Artwork A</li>
          <li>Artwork B</li>
          <li>Artwork C</li>
        </ul>
      </div>
    </div>
  );
};

export default ArtistModal;
