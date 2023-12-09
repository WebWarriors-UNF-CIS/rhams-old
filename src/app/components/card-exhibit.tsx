import React from 'react';
import { Exhibit } from '../shared/exhibit';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { remult } from 'remult';
import Modal from 'react-modal';
import '../globals.css'

interface ExhibitCardProps 
{
  exhibit: Exhibit;
  canEditAndDelete: boolean;
  UIRefresh: () => void;
}

const exhibitRepo = remult.repo(Exhibit);

const ExhibitCard: React.FC<ExhibitCardProps> = ({ exhibit, canEditAndDelete, UIRefresh }) => 
{
    const router = useRouter();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
    const handleEdit = (event: { stopPropagation: () => void; }) => 
    {
        event.stopPropagation();
        // Implement edit functionality using remult to update the exhibit
        // Example: exhibitRepo.update({ id: exhibit.id, /* updated fields */ });
    };
  
    const handleDelete = (event: { stopPropagation: () => void; }) => 
    {
        event.stopPropagation();
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = async (event: { stopPropagation: () => void; }) => 
    {
        event.stopPropagation();
        try 
        {
            console.log('Deleting exhibit with ID:', exhibit.id);
            await exhibitRepo.delete(exhibit.id);
            setShowDeleteConfirmation(false);
            console.log('Exhibit deleted successfully.');
            UIRefresh()
        } 
        catch (error) 
        {
            console.error('Error deleting exhibit:', error);
            // Handle error, e.g., show an error message
        }
    };

    const cancelDelete = (event: { stopPropagation: () => void; }) => 
    {
        event.stopPropagation();
        setShowDeleteConfirmation(false);
    };

    return (
        <div className="card" onClick={() => router.push('./view')}>
            <h3>{exhibit.name}</h3>
            <p className='italic dark:text-gray-300'>{exhibit.location}</p>
            <div className='grid grid-cols-1 gap-2 mt-4'>
                <div className='flex gap-2'>
                    <span className='chip'> Start </span>
                    <p>{exhibit.startDate.toDateString()}</p>
                </div>
                <div className='flex gap-2'>
                    <span className='chip'> End </span>
                    <p>{exhibit.endDate.toDateString()}</p>
                </div>
            </div>
            {canEditAndDelete && (
            <div className="mt-4 flex items-center">
            <button className="btn-gray mx-4 w-20" onClick={handleEdit}>
                Edit
            </button>
            <button className="btn-red mx-4 w-20" onClick={handleDelete}>
                Delete
            </button>
            </div>
            )}
            <Modal
            isOpen={showDeleteConfirmation}
            onRequestClose={cancelDelete}
            contentLabel="Delete Confirmation"
            className="modal"
            overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50">
                <div className="text-center">
                    <p className="mb-7">Are you sure you want to delete this exhibition?</p>
                    <button className="btn-red mx-4 w-25" onClick={confirmDelete}>
                        Confirm
                    </button>
                    <button className="btn-gray mx-4 w-25" onClick={cancelDelete}>
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ExhibitCard;

