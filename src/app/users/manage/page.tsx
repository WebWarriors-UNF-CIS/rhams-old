"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import { User } from '../../shared/user';
import Head from 'next/head';
import '../../globals.css'

const userRepo = remult.repo(User);

export default function UserPage() {

    function confirmation(){
        var result = confirm("Are you sure you want to delete this user?");
        if(result){
            console.log("User deleted");
        }
    }

    return (
        <div>

            <div>
                <h1 className="margin-auto my-8 flex justify-center items-center text-3xl font-medium text-black ">View/Edit User</h1>
            </div>
            <div>
                <h2 className="margin-auto my-8 flex justify-center items-center text-xl font-medium text-black">User Info:</h2>
            </div>
            <div className="float-left ml-6 flex flex-col w-40 border-2 border-black rounded-xl">
                <p className="text-center p-4">ID:</p>
                <br></br>
                <p className="text-center p-4">Name:</p>
                <br></br>
                <p className="text-center p-4">Email:</p>
                <br></br>
                <p className="text-center p-4">Password:</p>
                <br></br>
                <p className="text-center p-4">Role:</p>
            </div>
            <br></br>

            <div className="mx-32">
                <button className="btn-red" onClick={confirmation}>Delete User</button>
            </div>
        
        </div>

    );
}