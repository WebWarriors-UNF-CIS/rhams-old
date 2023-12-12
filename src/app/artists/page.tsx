"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import { Artist } from '../shared/artist';
import Head from 'next/head';
import ArtistCard from '../components/card-artist';
import '../globals.css'

const artistRepo = remult.repo(Artist);

export default function ArtistPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchArtists() {
      const allArtists = await artistRepo.find();
      setArtists(allArtists);
    }
    fetchArtists();
  }, []);

  return (
    <div>
      <Head>
        <title>View Artists</title>
      </Head>
      <div className='flex flex-col mx-auto mt-10 pl-28'><h1>Artists</h1></div>
      <div className="p-4 flex items-end justify-end">
          <div className="space-x-4 grid grid-cols-2">
          </div>
      </div>

      <div className='flex flex-col justify-around items-center mx-auto mt-10'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mx-auto">
            {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist}/>
            ))}
        </div>
      </div>
    </div>
  );
}