"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { remult } from "remult"
import { Artist} from '../../_shared/artist';
import { Exhibit } from "../../_shared/exhibit";

const artistRepo = remult.repo(Artist);
const exhibitsRepo = remult.repo(Exhibit);

export default function AddArtist() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: new Date,
    dod: new Date,
    imageString: '',
    website: '',
    biography: '',
    exhibitIds: [] as number[] || undefined,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      name: `${formData.firstName} ${formData.lastName}`,
      dob: formData.dob,
      dod: formData.dod,
      imageString: formData.imageString,
      website: formData.website,
      biography: formData.biography,
      exhibitIds: formData.exhibitIds,
      notes: formData.notes,
    };
    await artistRepo.insert(submitData);
    setSuccessMessage('Artist profile created successfully!');
    router.push('/artists');
  };

  useEffect(() => {
    exhibitsRepo.find().then(setExhibits);
  }, []);
  
  return (
    <div className="flex flex-col justify-center items-center mx-auto mt-10">
      <button type="button" className="btn-gray absolute right-4 top-20" onClick={() => router.push('./')}>Back</button>
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
            onChange={(e) => setFormData({ ...formData, exhibitIds: [parseInt(e.target.value)] })}
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
        <button type="submit" className="btn-green self-end justify-self-end">Add</button>
      </form>
    </div>
  )
}