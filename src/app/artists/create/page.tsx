"use client"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { remult } from "remult"
import '../globals.css'
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
  <div className="forms-body">
    <form className="new-artist-form">
      <div className="form-row">
        <h1 className="form-title">Enter New Artist</h1>
        <br/>
        <label htmlFor="item">First Name: </label>
        <input 
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          />
        <label htmlFor="item">Last Name: </label>
        <input 
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          />
        <label htmlFor="item">Nationality: </label>
        <input 
          type="text"
          name="nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          />
        <label htmlFor="item">Dates Lived: </label>
        <input 
          type="text"
          name="datesLived"
          value={datesLived}
          onChange={(e) => setDatesLived(e.target.value)}
          />
        <label htmlFor="item">Primary Medium: </label>
        <input 
          type="text"
          name="primaryMedium"
          value={primaryMedium}
          onChange={(e) => setPrimaryMedium(e.target.value)}
          />
        <label htmlFor="item">Website: </label>
        <input 
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          />
        <label htmlFor="item">Biography: </label>
        <input 
          type="text"
          name="biography"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          />
        <label htmlFor="item">Notes on Artist: </label>
        <input 
          type="text"
          name="artistNotes"
          value={artistNotes}
          onChange={(e) => setArtistNotes(e.target.value)}
          />
          <br/>
      </div>
      <button type="submit" className="btn">Add</button>
    </form>
  </div>
  </>
  )
}