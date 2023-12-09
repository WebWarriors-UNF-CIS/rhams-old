"use client"
import { use, useEffect, useState } from "react"
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
    primaryType: '',
    imageString: '',
    website: '',
    biography: '',
    knownExhibits: '',
    notes: '',
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
    artistRepo.insert(formData);
    router.push('/artists');
    setSuccessMessage('Artist profile created successfully!');
  };
  
  //TODO: import exhibits from db
  /*
  useEffect(() => {
    async function getExhibits() {setExhibits(await exhibitsRepo.find()) }
    getExhibits();
  }, []);
  */

  
  return (
    <div className="flex flex-col justify-center items-center mx-auto mt-10">
    <h1>Enter New Artist</h1>
    {successMessage && (
      <div className="bg-green-500 text-white p-4 mb-4">{successMessage}</div>
    )}
    <form className="form" onSubmit={handleSubmit}>
      <div className="input">
      <label htmlFor="firstName">
              First Name
            </label>
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
      <label htmlFor="lastName">
              Last Name
            </label>
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
            <label htmlFor="dob">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              onChange={handleChange}
              required
            />
      </div>
      <div className="input">
            <label htmlFor="dod">
              Date of Death (if applicable)
            </label>
            <input
              type="date"
              id="dod"
              name="dod"
              onChange={handleChange}
            />
      </div>
      <div className="input">
      <label htmlFor="nationality">
              Nationality
            </label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              placeholder='Country of Origin'
              value={formData.nationality}
              onChange={handleChange}
              required
            />
      </div>
      <div className="input">
      <label htmlFor="primaryType">
              Primary Medium
            </label>
            <input
              type="text"
              id="primaryType"
              name="primaryType"
              placeholder='Painter, Sculptor, etc.'
              value={formData.primaryType}
              onChange={handleChange}
              required
            />
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
              required
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
              required
            />
      </div>
      <div className="input">
      <label htmlFor="biography">
              Biography
            </label>
            <input
              type="text"
              id="biography"
              name="biography"
              placeholder='TODO-WIP'
              value={formData.biography}
              onChange={handleChange}
              required
            />
      </div>
      <div className="input">
      <label htmlFor="knownExhibits">
              Exhibits
            </label>
            <input
              type="text"
              id="knownExhibits"
              name="knownExhibits"
              placeholder='TODO-WIP'
              value={formData.knownExhibits}
              onChange={handleChange}
              required
            />
      </div>
      <div className="input">
      <label htmlFor="notes">
              Notes
            </label>
            <input
              type="text"
              id="notes"
              name="notes"
              placeholder='TODO-WIP'
              value={formData.notes}
              onChange={handleChange}
              required
            />
      </div>
      <button type="submit" className="btn-green">Add Artist</button>
      <button type="button" className="btn-gray" onClick={() => router.push('/artists')}>Back</button>
    </form>
  </div>
  )
}