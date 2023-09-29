"use client"
import { useState } from "react"


export default function Artist() {

  interface FormData {
    firstName: string;
    lastName: string;
    datesLived: string;
    nationality: string;
    primaryMedium: string;
    website: string;
    biography: string;
    artistNotes: string;
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    datesLived: '',
    nationality: '',
    primaryMedium: '',
    website: '',
    biography: '',
    artistNotes: ''
  });
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
     
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
  <>
    <form className="new-item-form">
      <div className="form-row">
        <h1>Enter New Artist</h1>
        <label htmlFor="item">First Name</label>
        <input 
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="firstName"/>
        <label htmlFor="item">Last Name</label>
        <input 
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"/>
        <label htmlFor="item">Nationality</label>
        <input 
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          placeholder="Nationality"/>
        <label htmlFor="item">Dates Lived</label>
        <input 
          type="text"
          name="datesLived"
          value={formData.datesLived}
          onChange={handleChange}
          placeholder="Dates Lived"/>
        <label htmlFor="item">Primary Medium</label>
        <input 
          type="text"
          name="primaryMedium"
          value={formData.primaryMedium}
          onChange={handleChange}
          placeholder="Primary Medium"/>
        <label htmlFor="item">Website</label>
        <input 
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Website"/>
        <label htmlFor="item">Biography</label>
        <input 
          type="text"
          name="biography"
          value={formData.biography}
          onChange={handleChange}
          placeholder="Biography"/>
        <label htmlFor="item">Notes on Artist</label>
        <input 
          type="text"
          name="artistNotes"
          value={formData.artistNotes}
          onChange={handleChange}
          placeholder="Notes"/>
      </div>
      <button type="submit" className="btn">Add</button>
    </form>
  </>
  )
}