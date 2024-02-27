"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import { Exhibit } from '../../_shared/exhibit';

const exhibitRepo = remult.repo(Exhibit);

export default function ExhibitRegistration() 
{
    const [formData, setFormData] = useState({
      name: '',
      location: '',
      startDate: new Date,
      endDate: new Date,
    });
  
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    {
      const {name, value} = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => 
    {
      e.preventDefault();
      exhibitRepo.insert(formData as Exhibit);
      router.push('/exhibitions/manage');
      setSuccessMessage('Exhibition created successfully!');
    };
  
    return (
      <main className="flex flex-col justify-center items-center mx-auto mt-10">
        <button type="button" className="btn-gray absolute right-4 top-20" onClick={() => router.push('./')}>Back</button>
        <h1>Add Exhibition</h1>
        {successMessage && (
          <div className="bg-green-500 text-white p-4 mb-4">{successMessage}</div>
        )}
        <form className="form" onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="name">
              Name of Exhibition
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="email">
              Location of Exhibition
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder='Location'
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="startDate">
              Exhibition Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="endDate">
              Exhibition End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-green col-span-2 self-end justify-self-end">Add</button>
        </form>
      </main>
    );
  }