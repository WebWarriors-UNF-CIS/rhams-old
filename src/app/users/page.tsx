"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import Link from 'next/link';
import { User } from '../_shared/user';

const userRepo = remult.repo(User);

export default function UserDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();
    
    useEffect(() => { userRepo.find().then(setUsers) }, []);

    return (
        <div>
            
            <div>
                <h1 className="margin-auto my-8 flex justify-center items-center text-3xl font-medium text-black ">Manage Users</h1>
            </div>
            <div className="mx-32">
                <Link href="/users/create"><button className="btn-green">Create User</button></Link>
            </div>
            <br></br>
            <table className="w-10/12 mx-32 border-collapse border-black table-fixed">
                <thead className="bg-slate-200">
                    <tr className="border-solid text-center font-bold text-xl">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Roles</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="bg-slate-50">
                    {users.map((user) => (
                        <tr className="border border-solid text-center even:bg-slate-100" key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.roles}</td>
                            <td><Link className="underline" href='users/manage'>View</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>            
        </div>

    );
}