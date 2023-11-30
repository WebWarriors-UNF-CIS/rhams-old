"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import '../globals.css'
import Link from 'next/link';
import { User } from '../shared/user';

const userRepo = remult.repo(User);

export default function userDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    
    useEffect(() => {
        async function fetchUsers() {
          const allUsers = await userRepo.find();
          setUsers(allUsers);
        }
        fetchUsers();
      }, []);

    return (
        <div>
            
            <div>
                <h1 className="margin-auto my-8 flex justify-center items-center text-3xl font-medium text-black ">Manage Users</h1>
            </div>
            <div className="mx-32">
                <Link href="/users/create"><button className="font-medium text-xl text-black">Create User</button></Link>
            </div>
            <br></br>
            <table className="w-10/12 mx-32 border-collapse border-black table-fixed">
                <thead className="bg-slate-200">
                    <tr className="border-solid text-center font-bold text-xl">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody className="bg-slate-50">
                    <tr className="border border-solid text-center">
                        <td>John Doe</td>
                        <td>john@mail.com</td>
                        <td>1234</td>
                        <td>admin</td>
                    </tr>
                    <tr className="border border-solid text-center">
                        <td>Test</td>
                        <td>test@gmail.com</td>
                        <td>test</td>
                        <td>admin</td>
                    </tr>
                    <tr className="border border-solid text-center">
                        <td>Test 2</td>
                        <td>test2@gmail.com</td>
                        <td>test</td>
                        <td>admin</td>
                    </tr>
                    <tr className="border border-solid text-center">
                        <td>a</td>
                        <td>a@gmail.com</td>
                        <td>a</td>
                        <td>admin</td>
                    </tr>
                    <tr className="border border-solid text-center">
                        <td>test 3</td>
                        <td>test3@gmail.com</td>
                        <td>test</td>
                        <td>admin</td>
                    </tr>
                </tbody>
            </table>
  
            
        </div>

    );
}