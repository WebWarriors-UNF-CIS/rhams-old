"use client"

import { useState } from 'react';
import { remult } from 'remult';
import { ArtPiece } from '../../shared/art';

export default function NewArt() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [art, setArt] = useState<ArtPiece | undefined>(undefined);
  const artRepo = remult.repo(ArtPiece);

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const artPiece = {
      catalogNum: form.catalogNum.value,
      title: form.artTitle.value,
      artist: form.artist.value,
      created: new Date(form.created.value),
      description: form.description.value,
      imageUrl: form.imageUrl.value,
      isSold: false,
      medium: form.medium.value,
      size: form.size.value,
      location: form.location.value
    };
    await artRepo.save(artPiece);
  }

return (
  <div className="flex flex-col justify-center items-center mx-auto mt-10">
    <h1 className='margin-auto text-3xl font-semibold mb-6 dark:text-white'>Add an Artwork</h1>
    <form className='form' onSubmit={handleSubmit}>
      <div className='input'>
        <label htmlFor="catalogNum">Catalog Number:</label>
        <input
          type="text"
          id="catalogNum"
          placeholder='001'
        />
      </div>
      <div className='input'>
        <label htmlFor="artTitle">Title:</label>
        <input
          type="text"
          id="artTitle"
          placeholder='Title'
        />
      </div>
      <div className='input'>
        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          id="artist"
          placeholder='Artist'
        />
      </div>
        <div className='input'>
        <label htmlFor="created">Created:</label>
        <input
          type="date"
          id="created"
        />
      </div>
      <div className='input col-span-2'>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder='Description'
          className="bg-gray-50 border-2 text-sm rounded-lg focus:outline-none
          focus:ring-black focus:border-emerald-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div className='input'>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="url"
          id="imageUrl"
          placeholder='Image URL'
        />
      </div>
      <div className='input'>
        <label htmlFor="medium">Medium:</label>
        <input
          type="text"
          id="medium"
          placeholder='Medium'
        />
      </div>
      <div className='input'>
        <label htmlFor="size">Size:</label>
        <input
          type="text"
          id="size"
          placeholder='Size'
        />
      </div>
      <div className='input'>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          placeholder='Location'
        />
      </div>
      <button type="submit" className="bg-emerald-500 rounded-lg p-2">Submit</button>
    </form>
  </div>
);
}
/*
  {
    catalogNum: 3,
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    created: new Date("1889-01-01"),
    description: "The Starry Night is an oil on canvas by the Dutch post-impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    isSold: false,
    medium: "Oil on canvas",
    size: "73.7 cm × 92.1 cm (28.7 in × 36.3 in)",
    location: "Museum of Modern Art, New York City, United States"
  }
*/