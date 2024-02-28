"use client"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { remult } from "remult"
import { Collection } from '../../_shared/collection';

const collectionRepo = remult.repo(Collection);

export default function AddCollection() {
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const collection = {
      title: form.collectionTitle.value,
      location: form.location.value,
      dateAcquired: form.dateAcquired.value,
      owner: form.owner.value,
      notes: form.notes.value,
    }
    await collectionRepo.insert(collection).then(() => setSuccessMessage('Collection created successfully!'));
    router.push('./');
  };
  
  return (
    <main className="flex flex-col justify-center items-center mx-auto mt-10">
      <button type="button" className="btn-gray absolute right-4 top-20" onClick={() => router.push('./')}>Back</button>
      <h1>Enter New Collection</h1>
      {successMessage && <div className="bg-green-500 text-white p-4 mb-4">{successMessage}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="collectionTitle"> Title </label>
          <input
            type="text"
            id="collectionTitle"
            name="collectionTitle"
            placeholder='Title'
            required
          />
        </div>
        <div className="input">
          <label htmlFor="location"> Location </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder='Location'
          />
        </div>
        <div className="input">
          <label htmlFor="dateAcquired"> Date Acquired </label>
          <input
            type="date"
            id="dateAcquired"
            name="dateAcquired"
          />
        </div>
        <div className="input">
          <label htmlFor="owner"> Owned By </label>
          <input
            type="text"
            id="owner"
            name="owner"
            placeholder='Owned By'
          />
        </div>
        <div className="input">
          <label htmlFor="notes"> Notes </label>
          <input
            type="text"
            id="notes"
            name="notes"
            placeholder='TODO-WIP'
          />
        </div>
          <button type="submit" className="btn-green self-end justify-self-end">Add</button>
      </form>
    </main>
  )
}