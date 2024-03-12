"use client";
import { useEffect, useState } from 'react';
import { remult } from 'remult';
import { Artist } from '../_shared/artist';
import Head from 'next/head';
import ArtistCard from '../_components/card-artist';
import Link from 'next/link';

const artistRepo = remult.repo(Artist);

export default function ArtistPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filteredArtists, setFilteredArtists] = useState('');

  useEffect(() => { artistRepo.find({ where: { name: { $contains:filteredArtists}}}).then(setArtists) }, [filteredArtists]);

  return (
    <main>
      <Head>
        <title>View Artists</title>
      </Head>
      <Link href="../artists/create"><button className="btn-green right-4 top-20 absolute"> Add Artist </button></Link>
      <h1 className="text-center justify-text-3xl font-medium p-4 m-10 dark:text-white">Artists</h1>
      <div className="grid grid-cols-3 relative">
        <div className='col-span-2 input sm:space-x-4'>
          <label className="dark:text-white !text-xl !inline !text-start">Search by name:</label>
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFilteredArtists(e.target.value)}
            className="!w-fit sm:!inline "
          />
        </div>
      </div>

      <div className="w-full overflow-hidden shadow-md mb-4">
  <div className="bg-gray-100 p-4">
    <div className="flex justify-between items-center">
      <div className="text-lg font-medium">Artist Name</div>
    </div>
  </div>
  {artists.map((artist) => (
    <div key={artist.id} className="flex justify-between items-center p-4 border-t border-gray-200">
      
      {/* <button className="btn-green"> */}
        <Link href={`/artists/${artist.id}`}><div className="text-lg">{artist.name}</div></Link>
      {/* </button> */}
    </div>
  ))}
</div>
    </main>
  );
}