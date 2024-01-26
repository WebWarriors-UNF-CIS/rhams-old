"use client" 
import { ArtPiece } from '../shared/art';
import { Artist } from '../shared/artist';
import { useState, useEffect } from 'react';
import { remult } from 'remult';
import Link from 'next/link';

const artistRepo = remult.repo(Artist);

export default function ArtCard({ art }: { art: ArtPiece }) {
  const [artist, setArtist] = useState<Artist>();
  useEffect(() => {
    try {
      artistRepo.findFirst({ id: art.artistId }).then(setArtist);
    } catch (error) {
      console.error(error);
    }
  }, [art.artistId]);
  return (
    <div className='m-4 w-72 p-4 border border-black rounded-lg' key={art.id}>
      <h3>{art.title}</h3>
      <p className='overflow-auto h-16'>{art.description}</p>
      <p>{artist?.firstName}</p>
      <p>{art.medium}</p>
      <button className='btn-gray'>
        <Link href={`/art/${art.id}`}>View</Link>
      </button>
    </div>
  )
}