"use client"
import { useEffect, useState } from 'react';
import { ArtPiece } from '../../_shared/art';
import { remult } from 'remult';
import Image from 'next/image';
import { Artist } from '../../_shared/artist';
import { useRouter } from 'next/navigation';

export default function ArtPage({params} : { params: {edit: string}}) {
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
    <div className='w-3/4 m-auto pt-4'>
      <Image src={art.imageUrl} width={200} height={200} alt={art.title} className='float-right top-0 border border-black' priority={true} />
      <h1 className='font-bold text-2xl'>{art.title}</h1>
      <div>Catalog # {art.catalogNum}</div>
      <div>Artist: {artist?.firstName + ' ' + artist?.lastName}</div>
      <div>{art.description}</div>
      <div>{}</div>
      <div>{art.medium}</div>
      <button className="btn-red fixed h-fit self-end right-3 top-[104px]" onClick={deleteArt}>Delete</button>
      <button type="button" className="fixed btn-gray h-fit self-end right-3 top-16" onClick={() => router.push('./')}>Back</button>
    </div>
  );
}