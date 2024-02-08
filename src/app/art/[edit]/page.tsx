"use client"
import { useEffect, useState } from 'react';
import { ArtPiece } from '../../_shared/art';
import { remult } from 'remult';
import Image from 'next/image';
import { Artist } from '../../_shared/artist';
import { useRouter } from 'next/navigation';
import SizeInput from '../../_components/sizeInput';

export default function ArtPage({params} : { params: {edit: string}}) {
  const [successMessage, setSuccessMessage] = useState('');
  const [art, setArt] = useState<ArtPiece>();
  const [artist, setArtist] = useState<Artist>();
  const artRepo = remult.repo(ArtPiece);
  const artistRepo = remult.repo(Artist);
  const router = useRouter();

  async function deleteArt() {
    try { await artRepo.delete(art!) }
    catch (error) { console.error(error)}
      router.push('./');
  }

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
    router.push('./');
  }

  useEffect(() => {
    let artId = parseInt(params.edit);
    if (artId && typeof artId === 'number')
      artRepo.findFirst({ id: artId }).then(setArt);
    if (art?.artistId)
      artistRepo.findFirst({ id: art.artistId }).then(setArtist);
  }, [params.edit, artRepo, art?.artistId, artistRepo]);

  if (!art) {
    return <div className='flex font-bold text-2xl items-center justify-center h-96'><div>Loading...</div></div>;
  }
  return (
    <main className="mx-auto p-10">
      <button type="button" className="fixed btn-gray h-fit self-end right-3 top-16" onClick={() => router.push('./')}>Back</button>
      {successMessage && (
        <div className="bg-green-500 text-white p-4 mb-4">{successMessage}</div>
      )}
      <Image src={art.imageUrl} width={200} height={200} alt={art.title} className='float-right mt-14 border border-black' priority={true} />
      <form className='form !flex flex-wrap w-3/5 md:w-[600px]' onSubmit={handleSubmit}>
        <div className='input w-32'>
          <label htmlFor="catalogNum">Catalog Number</label>
          <input
            type="text"
            id="catalogNum"
            placeholder='001'
            className="text-center"
            value={art.catalogNum}
          />
        </div>
        <div className='input col-span-3 man grow'>
          <label htmlFor="artTitle">Title</label>
          <input
            type="text"
            id="artTitle"
            placeholder='Title'
            value={art.title}
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
            value={art.imageUrl}
            className='overflow-visible'
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
            value={art.description}
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
            value={art.medium}
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
            value={art.location}
          />
        </div>
        <button type="submit" className="btn-green h-fit self-end justify-self-end">Add Art</button>
        <button className="btn-red fixed h-fit self-end right-3 top-[104px]" onClick={deleteArt}>Delete</button>
        {/* create and add sale button, takes user to new sale form once art is inserted
        <button type="button" onClick={createAndSale} className="btn-green h-fit self-end justify-self-end">Add Sale</button> */}
      </form>
    {/*<div className='w-3/4 m-auto pt-4'>
      <h1 className='font-bold text-2xl'>{art.title}</h1>
      <div>Artist: {artist?.firstName + ' ' + artist?.lastName}</div>
      aquired and created dates
      size values
      <button type="button" className="fixed btn-gray h-fit self-end right-3 top-16" onClick={() => router.push('./')}>Back</button>
    </div>*/}
  </main>
  );
}