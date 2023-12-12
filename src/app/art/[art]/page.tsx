"use client"
import { useEffect, useState } from 'react';
import { ArtPiece } from '../../shared/art';
import { remult } from 'remult';
import Image from 'next/image';
import { Artist } from '../../shared/artist';

export default function ArtPage({params} : { params: {art: string}}) {
  const [art, setArt] = useState<ArtPiece>();
  const [artist, setArtist] = useState<Artist>();
  const artRepo = remult.repo(ArtPiece);
  const artistRepo = remult.repo(Artist);

  useEffect(() => {
    let artId = parseInt(params.art);
    if (artId && typeof artId === 'number')
      artRepo.findFirst({ id: artId }).then(setArt);
    if (art?.artistId)
      artistRepo.findFirst({ id: art.artistId }).then(setArtist);
  });

  if (!art) {
    return <div>Loading...</div>;
  }
  return (
    <div className='w-3/4 m-auto pt-4'>
      <Image src={art.imageUrl} width={200} height={200} alt={art.title} className='float-right top-0 border border-black' priority={true} />
      <h1 className='font-bold text-2xl'>{art.title}</h1>
      <div>Catalog # {art.catalogNum}</div>
      <div>Artist: {artist?.firstName + ' ' + artist?.lastName}</div>
      <div>{art.description}</div>
      <div>{}</div>
      <div>{art.medium}</div>
    </div>
  );
}