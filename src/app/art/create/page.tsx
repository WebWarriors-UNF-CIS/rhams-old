"use client"

import { useState } from 'react';
import { remult } from 'remult';
import { useRouter } from 'next/navigation';
import { ArtPiece } from '../../_shared/art';
import { Artist } from '../../_shared/artist';
import SizeInput from '../../_components/sizeInput';

export default function NewArt() {
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const artRepo = remult.repo(ArtPiece);
  const artists = remult.repo(Artist);

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const artPiece = {
      catalogNum: form.catalogNum.value,
      title: form.artTitle.value,
      artistId: form.artist.value,
      aquired: new Date(form.aquired.value),
      created: new Date(form.created.value),
      description: form.description.value,
      imageUrl: form.imageUrl.value,
      salesIds: [],
      type: form.artType.value,
      medium: form.medium.value,
      height: form.height.value,
      location: form.location.value
    };
    await artRepo.save(artPiece).then(() => setSuccessMessage('Exhibition created successfully!'));
  }

return (
  <main className="flex flex-col justify-center items-center mx-auto mt-10">
    <h1>Add an Artwork</h1>
      <button type="button" className="fixed btn-gray h-fit self-end right-3 top-24" onClick={() => router.push('./')}>Back</button>
        {successMessage && (
          <div className="bg-green-500 text-white p-4 mb-4">{successMessage}</div>
        )}
    <form className='form !flex flex-wrap w-3/5 md:w-[600px]' onSubmit={handleSubmit}>
      <div className='input w-32'>
        <label htmlFor="catalogNum">Catalog Number</label>
        <input
          type="text"
          id="catalogNum"
          placeholder='001'
          className="text-center"
        />
      </div>
      <div className='input col-span-3 man grow'>
        <label htmlFor="artTitle">Title</label>
        <input
          type="text"
          id="artTitle"
          placeholder='Title'
        />
      </div>
      <div className='input grow'> {/* will be a dropdown of artists names */}
        <label htmlFor="artist">Artist</label>
        <input
          type="text"
          id="artist"
          placeholder='Artist'
        />
      </div>
      <div className='input'>
        <label htmlFor="aquired">Aquired</label>
        <input
          type="date"
          id="aquired"
        />
      </div>
      <div className='input'>
        <label htmlFor="created">Created</label>
        <input
          type="date"
          id="created"
        />
      </div>
      <div className='input grow'>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="url"
          id="imageUrl"
          placeholder='Image URL'
        />
      </div>
      <div className='input w-full'>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder='Description'
          className="border border-black text-sm rounded-md focus:outline-none
          focus:ring-black focus:border-emerald-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:text-white !min-h-[52px]"
        />
      </div>
      <div className='input'>
        <label htmlFor="artType">Type</label>
        <input
          type="text"
          id="artType"
          placeholder='Painting'
        />
      </div>
      <div className='input'>
        <label htmlFor="medium">Medium</label>
        <input
          type="text"
          id="medium"
          placeholder='Oil'
        />
      </div>
      <SizeInput id='Height' />
      <SizeInput id='Width' />
      <SizeInput id='Depth' />
      <div className='input'>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          placeholder='Location'
        />
      </div>
      <button type="submit" className="btn-green h-fit self-end justify-self-end">Add Artwork</button>
    </form>
  </main>
);
}