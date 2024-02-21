"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { remult } from "remult"
import '../../globals.css'
import { Collection} from '../../_shared/collection';


const collectionRepo = remult.repo(Collection);

export default function AddCollection() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    dateAcquired: new Date,
    owner: '',
    notes: '',
  });
  const [collections, setCollection] = useState<Collection[]>([]);
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
    collectionRepo.insert(formData);
    router.push('/collection/');
    setSuccessMessage('Collection created successfully!');
  };

  useEffect(() => {
    collectionRepo.find().then(setCollection);
  }, []);
  
  return (
    <div className="flex flex-col justify-center items-center mx-auto mt-10">
    <h1>Enter New Collection</h1>
    {successMessage && (
      <div className="bg-green-500 text-white p-4 mb-4">{successMessage}</div>
    )}
    <form className="form" onSubmit={handleSubmit}>
      <div className="input">
        <label htmlFor="titile"> Title </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder='Title'
          value={formData.title}
          onChange={handleChange}
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
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input">
        <label htmlFor="dateAcquired"> Date Acquired </label>
        <input
          type="date"
          id="dateAcquired"
          name="dateAcquired"
          onChange={handleChange}
        />
      </div>
      
      <div className="input">
        <label htmlFor="owner"> Owned By </label>
        <input
          type="text"
          id="owner"
          name="owner"
          placeholder='Owned By'
          value={formData.owner}
          onChange={handleChange}
        />
      </div>
      
      
     
      <div className="input">
        <label htmlFor="notes"> Notes </label>
        <input
          type="text"
          id="notes"
          name="notes"
          placeholder='TODO-WIP'
          value={formData.notes}
          onChange={handleChange}
        />
      </div>
      <div className="sm:col-span-2 flex flex-row justify-between">
        <button type="submit" className="btn-green">Add Collection</button>
        <button type="button" className="btn-gray" onClick={() => router.push('/collection')}>Back</button>
      </div>
    </form>
  </div>
  )
}