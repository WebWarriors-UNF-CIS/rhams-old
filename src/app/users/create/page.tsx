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
      router.push('/artists');
      setSuccessMessage('User account created successfully!');
    };
  
    return (
      <div className="flex flex-col justify-center items-center mx-auto mt-10">
        <h1>New User Registration</h1>
        {successMessage && (
          <div className="bg-green-500 text-white p-4 mb-4">{successMessage}</div>
        )}
        <form className="md:grid-cols-1" onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="name">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='username'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='johndoe@gmail.com'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='********'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-green">Create Account</button>
        </form>
      </div>
    );
  }