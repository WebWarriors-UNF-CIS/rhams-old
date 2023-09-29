"use client"
import { useState } from "react"


export default function ArtistForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [primaryMedium, setPrimaryMedium] = useState("")
  const [nationality, setNationality] = useState("")
  const [website, setWebsite] = useState("")
  const [datesLived, setDatesLived] = useState("")
  const [biography, setBiography] = useState("")
  const [artistNotes, setArtistNotes] = useState("")
  return (
  <>
    <form className="new-item-form">
      <div className="form-row">
        <h1>Enter New Artist</h1>
        <label htmlFor="item">First Name</label>
        <input 
          value={firstName} 
          onChange={e => setFirstName(e.target.value)} 
          type="text" 
          id="item"/>
        <label htmlFor="item">Last Name</label>
        <input 
          value={lastName} 
          onChange={e => setLastName(e.target.value)} 
          type="text" 
          id="item"/>
        <label htmlFor="item">Nationality</label>
        <input 
          value={nationality} 
          onChange={e => setNationality(e.target.value)} 
          type="text" 
          id="item"/>
        <label htmlFor="item">Dates Lived</label>
        <input 
          value={datesLived} 
          onChange={e => setDatesLived(e.target.value)} 
          type="text" 
          id="item"/>
        <label htmlFor="item">Primary Medium</label>
        <input 
          value={primaryMedium} 
          onChange={e => setPrimaryMedium(e.target.value)} 
          type="text" 
          id="item"/>
        <label htmlFor="item">Website</label>
        <input 
          value={website} 
          onChange={e => setWebsite(e.target.value)} 
          type="text" 
          id="item"/>
        <label htmlFor="item">Biography</label>
        <input 
          value={biography} 
          onChange={e => setBiography(e.target.value)} 
          type="text" 
          id="item"/>
        <label htmlFor="item">Notes on Artist</label>
        <input 
          value={artistNotes} 
          onChange={e => setArtistNotes(e.target.value)} 
          type="text" 
          id="item"/>
      </div>
      <button className="btn">Add</button>
    </form>
  </>
  )
}