"use client";
import { useEffect, useState } from 'react';
import { remult } from 'remult';
import { User } from '../../_shared/user';
import { useRouter } from 'next/navigation';
import { Role } from '../../_shared/user';

const userRepo = remult.repo(User);

export default function UserPage({params} : { params: {name: string}}) {
    const [user, setUser] = useState<User>();
    const [editedUser, setEditedUser] = useState<User>();
    const router = useRouter();
    
    async function confirmDelete(user:User) {
        var result = confirm("Are you sure you want to delete this user?");
        if(result){
            await userRepo.delete(user);
            console.log("User deleted");
            router.push('/users');
        }
    }

    async function updateUser(){
        if (editedUser){
            await userRepo.save(editedUser);
            setUser(editedUser);
            setEditedUser(undefined);
        }
    }
    
    useEffect(() => { 
        setUser(undefined);
        setEditedUser(undefined);
        userRepo.findFirst({name: params.name}).then(setUser);
    }, [params.name]);    

    if (!user) return <div className='flex font-bold text-2xl items-center justify-center h-96 max-w-'><div>Loading...</div></div>;

    return (
        <main className="flex flex-col justify-center items-center mx-auto mt-10">
            <button type="button" className="absolute btn-gray right-4 top-20" onClick={() => router.push('./')}>Back</button>
            <h1 className="margin-auto my-8 flex justify-center items-center text-3xl font-medium">Edit User</h1>
            <div className="float-left ml-6 flex flex-col w-40 border-2 border-black rounded-xl">
                <p className="text-center p-4 border-b border-black font-bold">ID: {user.id} </p>
                <p className="text-center p-4 border-b border-black font-bold">
                    Name: 
                    <input 
                        type="text"
                        value={editedUser?.name || user.name}
                        onChange={(e) => setEditedUser({ ...user, name: e.target.value })}
                    />
                </p>
                <p className="text-center p-4 border-b border-black font-bold">
                    Email:
                    <input 
                        type="text"
                        value={editedUser?.email || user.email}
                        onChange={(e) => setEditedUser({ ...user, email: e.target.value })}
                        />
                </p>
                <p className="text-center p-4 font-bold">
                    Role: 
                    <select 
                        multiple
                        value={editedUser?.roles || user.roles || []}
                        onChange={(e) => {
                            const selectedRoles = Array.from(e.target.selectedOptions, option => option.value as Role);
                            setEditedUser({ ...user, roles: selectedRoles });
                        }}
                    >
                        {Object.values(Role).map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </p>
            </div>
            <div className="mx-32">
                <button className="btn-green" onClick={updateUser}>Save Changes</button>
                <button className="btn-gray ml-4" onClick={() => setEditedUser(undefined)}>Cancel</button>
                <button className="btn-red" onClick={() => confirmDelete(user)}>Delete User</button>
            </div>
        </main>

    );
}