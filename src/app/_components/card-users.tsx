import React from 'react';
import { User } from '../_shared/user';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { remult } from 'remult';
import Modal from 'react-modal';
import '../globals.css'

interface UserCardProps 
{
  user: User;
  canEditAndDelete: boolean;
  UIRefresh: () => void;
}

const userRepo = remult.repo(User);

const UsersCard: React.FC<UserCardProps> = ({ user, canEditAndDelete, UIRefresh }) => 
{
    const router = useRouter();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
    const handleEdit = (event: { stopPropagation: () => void; }) => 
    {
        event.stopPropagation();
        // Implement edit functionality using remult to update the user
        // Example: userRepo.update({ id: user.id, /* updated fields */ });
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
            console.log('Deleting user with ID:', user.id);
            await userRepo.delete(user.id);
            setShowDeleteConfirmation(false);
            console.log('User deleted successfully.');
            UIRefresh()
        } 
        catch (error) 
        {
            console.error('Error deleting user:', error);
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
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
            <h3>{user.roles}</h3>
            <h3>{user.password}</h3>
            
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
                    <p className="mb-7">Are you sure you want to delete this user?</p>
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

export default UsersCard;