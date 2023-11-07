"use client"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { remult } from "remult"
import '../../globals.css'
import { Artist } from '../../shared/artist';

const artistRepo = remult.repo(Artist);

export default function AddArtist() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [datesLived, setDatesLived] = useState('');
  const [primaryMedium, setPrimaryMedium] = useState('');
  const [website, setWebsite] = useState('');
  const [biography, setBiography] = useState('');
  const [artistNotes, setArtistNotes] = useState('');
  const router = useRouter();

  const artist = async () => {
    const artistInfo = {
      firstName: firstName,
      lastName: lastName,
      nationality: nationality,
      datesLived: datesLived,
      primaryMedium: primaryMedium,
      website: website,
      biography: biography,
      artistNotes: artistNotes,
  };

    try {
     
      const response = await fetch('/api/artist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(artistInfo),
      });

      if (response.ok) {
        
        console.log('Form submitted successfully');

      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  
  return (
  <>
  <div className="bg-gray-800 text-blue-200 max-w-screen-sm p-4 mx-auto">
    <form className=".flex .flex-col .gap-2">
      <div className=".flex .flex-col .gap-1">
        <h1 className="text-center text-lg font-semibold mb-4">Enter New Artist</h1>
        <br/>
        <label htmlFor="item">First Name: </label>
        <input 
          className="focus:border-blue-300 .outline-none .border-2 .border-gray-300 .rounded-md .p-2 .w-1/2 .focus:border-blue-500"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          />
        <label htmlFor="item">Last Name: </label>
        <input 
          className="focus:border-blue-300 .outline-none .border-2 .border-gray-300 .rounded-md .p-2 .w-1/2 .focus:border-blue-500"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          />
        <label htmlFor="item">Nationality: </label>
        <input 
          className="focus:border-blue-300 .outline-none .border-2 .border-gray-300 .rounded-md .p-2 .w-1/2 .focus:border-blue-500"
          type="text"
          name="nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          />
        <label htmlFor="item">Dates Lived: </label>
        <input 
          className="focus:border-blue-300 .outline-none .border-2 .border-gray-300 .rounded-md .p-2 .w-1/2 .focus:border-blue-500"
          type="text"
          name="datesLived"
          value={datesLived}
          onChange={(e) => setDatesLived(e.target.value)}
          />
        <label htmlFor="item">Primary Medium: </label>
        <input 
          className="focus:border-blue-300 .outline-none .border-2 .border-gray-300 .rounded-md .p-2 .w-1/2 .focus:border-blue-500"
          type="text"
          name="primaryMedium"
          value={primaryMedium}
          onChange={(e) => setPrimaryMedium(e.target.value)}
          />
        <label htmlFor="item">Website: </label>
        <input 
          className="focus:border-blue-300 .outline-none .border-2 .border-gray-300 .rounded-md .p-2 .w-1/2 .focus:border-blue-500"
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          />
        <label htmlFor="item">Biography: </label>
        <input 
          className="focus:border-blue-300 .outline-none .border-2 .border-gray-300 .rounded-md .p-2 .w-1/2 .focus:border-blue-500"
          type="text"
          name="biography"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          />
        <label htmlFor="item">Notes on Artist: </label>
        <input 
          className="focus:border-blue-300 .outline-none .border-2 .border-gray-300 .rounded-md .p-2 .w-1/2 .focus:border-blue-500"
          type="text"
          name="artistNotes"
          value={artistNotes}
          onChange={(e) => setArtistNotes(e.target.value)}
          />
          <br/>
      </div>
      <button type="submit" className="bg-blue-500 bg-opacity-10 border border-blue-500 text-blue-500 px-1 py-2 rounded-md cursor-pointer focus:outline-none">Add</button>
    </form>
  </div>
  </>
  )
}