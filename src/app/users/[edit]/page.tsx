"use client";
import { useEffect, useState } from 'react';
import { remult } from 'remult';
import { User } from '../../_shared/user';
import { useRouter } from 'next/navigation';

const userRepo = remult.repo(User);

export default function UserPage({params} : { params: {name: string}}) {
    const [user, setUser] = useState<User>();
    const router = useRouter();
    
    async function confirmDelete(user:User) {
        var result = confirm("Are you sure you want to delete this user?");
        if(result){
            await userRepo.delete(user);
            console.log("User deleted");
            router.push('/users');
        }
    }

    useEffect(() => { userRepo.findFirst({name: params.name}).then(setUser) }, [params.name]);

    if (!user) return <div className='flex font-bold text-2xl items-center justify-center h-96 max-w-'><div>Loading...</div></div>;

    return (
        <main>
            <button type="button" className="fixed btn-gray h-fit self-end right-3 top-16" onClick={() => router.push('./')}>Back</button>
            <h1 className="margin-auto my-8 flex justify-center items-center text-3xl font-medium">Edit User</h1>
            <div className="float-left ml-6 flex flex-col w-40 border-2 border-black rounded-xl">
                <p className="text-center p-4">ID: {user.id} </p>
                <p className="text-center p-4">Name: {user.name}</p>
                <p className="text-center p-4">Email: {user.email}</p>
                <p className="text-center p-4">Role: {user.roles}</p>
            </div>
            <div className="mx-32">
                <button className="btn-red" onClick={() => confirmDelete(user)}>Delete User</button>
            </div>
        </main>

    );
}