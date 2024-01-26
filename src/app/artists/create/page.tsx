"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { remult } from "remult"
import '../../globals.css'
import { Artist, Type } from '../../shared/artist';
import { Exhibit } from "../../shared/exhibit";

const artistRepo = remult.repo(Artist);
const exhibitsRepo = remult.repo(Exhibit);

export default function AddArtist() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: new Date,
    dod: new Date,
    nationality: '',
    primaryType: Type.Painting,
    imageString: '',
    website: '',
    biography: '',
    knownExhibits: [] as number[],
    notes: '',
  });
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
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
    artistRepo.insert(formData);
    router.push('/artists/manage');
    setSuccessMessage('Artist profile created successfully!');
  };

  useEffect(() => {
    exhibitsRepo.find().then(setExhibits);
  }, []);
  
  return (
    <div className="flex flex-col justify-center items-center mx-auto mt-10">
    <h1>Enter New Artist</h1>
    {successMessage && (
      <div className="bg-green-500 text-white p-4 mb-4">{successMessage}</div>
    )}
    <form className="form" onSubmit={handleSubmit}>
      <div className="input">
        <label htmlFor="firstName"> First Name </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder='First Name'
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input">
        <label htmlFor="lastName"> Last Name </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder='Last Name'
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input">
        <label htmlFor="dob"> Date of Birth </label>
        <input
          type="date"
          id="dob"
          name="dob"
          onChange={handleChange}
        />
      </div>
      <div className="input">
        <label htmlFor="dod"> Date of Death (if applicable) </label>
        <input
          type="date"
          id="dod"
          name="dod"
          onChange={handleChange}
        />
      </div>
      <div className="input">
        <label htmlFor="nationality"> Nationality </label>
        <input
          type="text"
          id="nationality"
          name="nationality"
          placeholder='Country of Origin'
          value={formData.nationality}
          onChange={handleChange}
        />
      </div>
      <div className="input">
      <label htmlFor="primaryType">Primary Art Type </label>
        <select
          className="bg-white border border-emerald-950 text-sm rounded focus:outline-none focus:ring-black focus:border-emerald-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          name="primaryType"
          onChange={(e) => setFormData({ ...formData, primaryType: e.target.value as unknown as Type})}
        >
          {Object.values(Type).filter(value => isNaN(Number(value))).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
          <option value={Type.Drawing}>Drawing</option>
        </select>
      </div>
      <div className="input">
      <label htmlFor="imageString">
              Image String
            </label>
            <input
              type="text"
              id="imageString"
              name="imageString"
              placeholder='TODO-WIP'
              value={formData.imageString}
              onChange={handleChange}
            />
      </div>
      <div className="input">
      <label htmlFor="website">
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              placeholder='TODO-WIP'
              value={formData.website}
              onChange={handleChange}
            />
      </div>
      <div className="input">
        <label htmlFor="biography"> Biography </label>
        <input
          type="text"
          id="biography"
          name="biography"
          placeholder='TODO-WIP'
          value={formData.biography}
          onChange={handleChange}
        />
      </div>
      <div className="input">{/* TODO: make this into a multi-select */} 
        <label htmlFor="exhibits">Known Exhibits </label>
        <select
          name="exhibits"
          onChange={(e) => setFormData({ ...formData, knownExhibits: [parseInt(e.target.value)] })}
          className="bg-white border border-emerald-950 text-sm rounded focus:outline-none
          focus:ring-black focus:border-emerald-500 block w-full p-1.5 
          dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {exhibits.map((exhibit) => (
            <option key={exhibit.id} value={exhibit.id}>
              {exhibit.name}
            </option>
          ))}
        </select>
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
      <button type="submit" className="btn-green">Add Artist</button>
      <button type="button" className="btn-gray" onClick={() => router.push('/artists')}>Back</button>
    </form>
  </div>
  )
}