"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { remult } from "remult"
import '../../globals.css'
import {Media, MediaType} from '../../_shared/media';



const mediaRepo = remult.repo(Media);

export default function AddMedia() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    author: '',
    datePublished: new Date,
    mediaType: MediaType.Other,
    imageString: '',
    srcUrl: '',
    videoString: '',
    notes: '',
  });
  const [media, setMedia] = useState<Media[]>([]);
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
    mediaRepo.insert(formData);
    router.push('/media/');
    setSuccessMessage('Media added successfully!');
  };

  useEffect(() => {
    mediaRepo.find().then(setMedia);
  }, []);
  
  return (
    <main className="flex flex-col justify-center items-center mx-auto mt-10">
      <h1>Enter New Media</h1>
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
          <label htmlFor="owner"> Author </label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder='Author'
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="datePublished"> Date Published </label>
          <input
            type="date"
            id="datePublished"
            name="datePublished"
            onChange={handleChange}
          />
        </div>
        <div className="input">
            <label htmlFor="mediaType"> Media Type </label>
            <input
            type="text"
            id="mediaType"
            name="mediaType"
            placeholder='Media Type'
            value={formData.mediaType}
            onChange={handleChange}
            />
        </div>
        <div className="input">
          <label htmlFor="imageString"> Image </label>
          <input
            type="text"
            id="imageString"
            name="imageString"
            placeholder='Image URL'
            value={formData.imageString}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="website"> Website </label>
          <input
            type="text"
            id="website"
            name="website"
            placeholder='Website URL'
            value={formData.srcUrl}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="owner"> Video </label>
          <input
            type="text"
            id="videoString"
            name="videoString"
            placeholder='Video URL'
            value={formData.videoString}
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
          <button type="submit" className="btn-green">Add Media</button>
          <button type="button" className="btn-gray" onClick={() => router.push('/media')}>Back</button>
        </div>
      </form>
    </main>
  )
}