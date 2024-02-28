"use client";
import React from 'react';
import { Exhibit } from '../_shared/exhibit';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { remult } from 'remult';
import Modal from 'react-modal';
import '../globals.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface ExhibitCardProps {
  exhibit: Exhibit;
  canEditAndDelete: boolean;
  UIRefresh: () => void;
}

const CardExhibit: React.FC<ExhibitCardProps> = ({ exhibit, canEditAndDelete, UIRefresh }) => {
  
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedExhibit, setEditedExhibit] = useState(exhibit);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await remult.repo(Exhibit).save(editedExhibit);
      UIRefresh(); // Refresh UI to reflect changes
      closeEditModal();
    } catch (error) {
      console.error('Error updating exhibit:', error);
    }
  };
  

  const handleDelete = async () => {
    try {
      await remult.repo(Exhibit).delete(exhibit.id);
      UIRefresh(); // Refresh UI to reflect changes
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting exhibit:', error);
    }
  };

  return (
    <div className="card" onClick={() => router.push(`./exhibitions/${exhibit.id}`)}>
            <h3>{exhibit.name}</h3>
            <p className='italic dark:text-gray-300'>{exhibit.location}</p>
            <div className='grid grid-cols-1 gap-2 mt-4'>
                <div className='flex gap-2'>
                    <span className='chip'> Start </span>
                    { exhibit.startDate && <p>{exhibit.startDate.toDateString()}</p>}
                </div>
                <div className='flex gap-2'>
                    <span className='chip'> End </span>
                    { exhibit.endDate && <p>{exhibit.endDate.toDateString()}</p>}
                </div>
            </div>
            {canEditAndDelete && (
            <div className="mt-4 flex items-center">
            <button className="btn-gray mx-4 w-20" onClick={openEditModal}>
                Edit
            </button>
            <button className="btn-red mx-4 w-20" onClick={openDeleteModal}>
                Delete
            </button>
            </div>
            )}

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        style={customStyles}
        contentLabel="Edit Exhibit"
      >
        <form onSubmit={handleEdit}>
          {/* Form fields for editing the exhibit */}
          <button type="submit">Save Changes</button>
          <button onClick={closeEditModal}>Cancel</button>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        style={customStyles}
        contentLabel="Confirm Delete"
      >
        <h2>Are you sure you want to delete this exhibit?</h2>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={closeDeleteModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default CardExhibit;
