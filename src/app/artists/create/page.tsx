"use client"
import { use, useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { remult } from "remult"
import '../../globals.css'
import { Artist, Type } from '../../shared/artist';
import { Exhibit } from "../../shared/exhibit";


export default function AddArtist() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [dob, setDob] = useState('');
  const [dod, setDod] = useState('');
  const [primaryType, setPrimaryType] = useState(Type.Photography);//TODO: somehow make this default to undefined
  const [imageString, setImageString] = useState('');
  const [website, setWebsite] = useState('');
  const [biography, setBiography] = useState('');
  const [knownExhibits, setKnownExhibits] = useState([]);
  const [artistNotes, setArtistNotes] = useState('');
  const router = useRouter();
  const artistRepo = remult.repo(Artist);
  const exhibitsRepo = remult.repo(Exhibit);
  let [exhibits, setExhibits] = useState<Exhibit[]>([]);

  useEffect(() => {
    async function getExhibits() { setExhibits(await exhibitsRepo.find()) }
    getExhibits();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(dod); // TODO: make dod undefined if not put in

    const newArtist = {
      firstName: firstName,
      lastName: lastName,
      dob: new Date(dob),
      dod: new Date(dod),
      nationality: nationality,
      primaryType: primaryType,
      imageString: '',
      website: website,
      biography: biography,
      knownExhibits: knownExhibits,
      notes: artistNotes,
    }
    await artistRepo.save(newArtist);
  }
  
  return (
  <div className="flex flex-col justify-center items-center mx-auto mt-10">
    <h1 className="text-xl font-semibold mb-4">Enter New Artist</h1>
    <form className="form" onSubmit={handleSubmit}>
      <div className="input">
        <label htmlFor="item">First Name </label>
        <input 
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="item">Last Name </label>
        <input 
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="item">Nationality </label>
        <input 
          type="text"
          name="nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="dob">Date of Birth </label>
        <input 
          type="date"
          name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="dod">Date of Death (if applicable) </label>
        <input 
          type="date"
          name="dod"
          value={dod}
          onChange={(e) => setDod(e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="item">Primary Art Type </label>
        <select
        className="bg-white border border-emerald-950 text-sm rounded focus:outline-none
        focus:ring-black focus:border-emerald-500 block w-full p-1.5 
        dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          name="primaryType"
          value={primaryType}
          onChange={(e) => setPrimaryType(e.target.value as unknown as Type)}//TODO: fix this
        >
          {Object.values(Type).filter(value => isNaN(Number(value))).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="input">
        <label htmlFor="item">Image </label>
        <input 
          type="text"
          name="image"
          value={imageString}
          onChange={(e) => setImageString(e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="item">Website </label>
        <input 
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="item">Biography </label>
        <input 
          type="text"
          name="biography"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
        />
      </div>
      <div className="input">{/* TODO: make this into a multi-select */} 
        <label htmlFor="exhibits">Known Exhibits </label>
        <select
          name="exhibits"
          //onChange={(e) => setKnownExhibits([e.target.value])} TODO: fix this
          className="bg-white border border-emerald-950 text-sm rounded focus:outline-none
          focus:ring-black focus:border-emerald-500 block w-full p-1.5 
          dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {exhibits.map((exhibit) => (
            <option key={exhibit.id} value={exhibit.id}>
              {exhibit.name}
            </option>
          ))} //TODO: fix this
        </select>
      </div>
      <div className="input">
        <label htmlFor="item">Notes on Artist </label>
        <input 
          className="focus:border-blue-300 .outline-none .border-2 .border-gray-300 .rounded-md .p-2 .w-1/2 .focus:border-blue-500"
          type="text"
          name="artistNotes"
          value={artistNotes}
          onChange={(e) => setArtistNotes(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-blue-500 bg-opacity-10 border border-blue-500 text-blue-500 px-1 py-2 rounded-md cursor-pointer focus:outline-none">Add</button>
    </form>
  </div>
  )
}