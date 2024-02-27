"use client"
import { useEffect, useState } from 'react';
import { remult } from 'remult';
import { useRouter } from 'next/navigation';
import { ArtPiece } from '../../_shared/art';
import { Artist, Type } from '../../_shared/artist';
import SizeInput from '../../_components/sizeInput';

export default function NewArt() {
  const [successMessage, setSuccessMessage] = useState('');
  const [artists, setArtists] = useState<Artist[]>([]);
  const router = useRouter();
  const artRepo = remult.repo(ArtPiece);
  const artistRepo = remult.repo(Artist);

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    // check for exisiting catalog number
    // let dates be input as just years/months
    // let artist and type be dropdowns
    // imageURL be a file upload
    // option for adding a sale
    const artPiece = {
      catalogNum: form.catalogNum.value,
      title: form.artTitle.value,
      artist: form.artist.value,
      aquired: new Date(form.aquired.value),
      created: new Date(form.created.value),
      description: form.description.value,
      imageUrl: form.imageUrl.value,
      exhibits: undefined,
      type: form.artType.value,
      medium: form.medium.value,
      height: form.height.value + ' ' + form.heightUnits.value,
      width: form.width.value + ' ' + form.widthUnits.value,
      depth: form.depth.value + ' ' + form.depthUnits.value,
      location: form.location.value
    };
    await artRepo.insert(artPiece).then(() => setSuccessMessage('Success!'));
    router.push('./');
  }

  useEffect(() => { artistRepo.find({}).then(setArtists) }, [artistRepo]);

return (
  <main className="flex flex-col justify-center items-center mx-auto mt-10">
    <h1>Add an Artwork</h1>
    <button type="button" className="fixed btn-gray h-fit self-end right-4 top-20" onClick={() => router.push('./')}>Back</button>
    { successMessage && <div className="bg-green-500 text-white p-4 mb-4">{successMessage}</div> }
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
        <select name="artist" id="artist" className='bg-white border border-emerald-950 text-sm rounded focus:outline-none focus:ring-black focus:border-emerald-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
          <option selected value='Unknown'>Unknown</option>
          {artists.map(artist => (
            <option value={artist.id} key={artist.id}>{artist.name}</option>
          ))}
        </select>
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
          className="border border-black text-sm rounded focus:outline-none
          focus:ring-black focus:border-emerald-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:text-white !min-h-[52px]"
        />
      </div>
      <div className='input'>
        <label htmlFor="artType">Type</label>
        <select name="artType" id="artType" className='bg-white border border-emerald-950 text-sm rounded focus:outline-none focus:ring-black focus:border-emerald-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
          {Object.values(Type).filter(value => isNaN(Number(value))).map((type) => (
            <option value={type} key={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className='input grow'>
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
      <div className='input grow'>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          placeholder='Location'
        />
      </div>
      {/* chekcbox to add exhibt and remove location option */}
      <button type="submit" className="btn-green h-fit self-end justify-self-end">Add</button>
      {/* create and add sale button, takes user to new sale form once art is inserted
      <button type="button" onClick={createAndSale} className="btn-green h-fit self-end justify-self-end">Add Sale</button> */}
    </form>
  </main>
);
}