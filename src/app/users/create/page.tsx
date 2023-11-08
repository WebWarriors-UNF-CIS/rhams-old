"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import { User } from '../../shared/user';
import '../../globals.css'

const userRepo = remult.repo(User);

export default function UserRegistration() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });
  
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      userRepo.insert(formData);
      router.push('/artist');
      setSuccessMessage('User account created successfully!');
    };
  
    return (
      <div className="flex flex-col justify-center items-center mx-auto mt-10">
        <h1 className="text-3xl font-semibold mb-6">New User Registration</h1>
        {successMessage && (
          <div className="bg-green-500 text-white p-4 mb-4">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center content-start text-slate-100'>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-slate-900 ml-2"
              required
            />
          </div>
          <div className="input">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-slate-900 ml-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-slate-900 ml-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Create Account
          </button>
        </form>
      </div>
    );
  }