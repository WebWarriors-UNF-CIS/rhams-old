"use client" 
import { ArtPiece } from '../_shared/art';
import { Artist } from '../_shared/artist';
import { useState, useEffect } from 'react';
import { remult } from 'remult';
import Image from 'next/image';

const artistRepo = remult.repo(Artist);

export default function ArtCard({ art, showModal }: { art: ArtPiece, showModal: (id: number) => void}) {
  const [artist, setArtist] = useState<Artist>();
  useEffect(() => {
    try {
      artistRepo.findFirst({ id: art.artistId }).then(setArtist);
    } catch (error) {
      console.error(error);
    }
  }, [art.artistId]);
  
  return (
    <div className='m-4 w-72 p-2 border border-slate-400 dark:border-slate-600 bg-slate-200 dark:bg-gray-700 rounded-md' key={art.id}>
      <h3>{art.title}</h3>
      <Image src={art.imageUrl} width={100} height={200} alt={art.title} className='float-right relative -top-8 border border-black' priority={true} />
      <p className='overflow-hidden h-16'>{art.description}</p>
      <p>{artist?.firstName}</p>
      <p>{art.medium}</p>
      <button className='btn-gray' onClick={() => showModal(art.id)}>View</button>
    </div>
  )
}