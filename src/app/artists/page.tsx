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
      
      <div>
        <h1 className="text-center justify-text-3xl font-bold p-12 dark:text-white">Artists</h1>
      <div className="grid grid-cols-7">
        <div className='col-span-1'>
          <h1 className="ml-10 dark:text-white text-xl  font-semibold whitespace-nowrap pr-1 pt-2">Find an Artist</h1>
        </div>
        <div className="mt-3">
          <input
            type="text"
            placeholder="First Name"
            className="px-1  border rounded-lg focus:outline-none focus:ring focus:border-emerald-500"
          />
          </div>
        <div className="mt-3">
          <input
            type="text"
            placeholder="Last Name"
            className="px-1 ml-3 border rounded-lg focus:outline-none focus:ring focus:border-emerald-500"
          />
        </div>
        <div className="mt-3">
          <button className="ml-3 bg-emerald-500 text-white rounded-md p-1 hover:bg-emerald-600 hover:shadow">
            Search
          </button>
        </div>
        <div className="col-span-3">
          <a href="../artists/create"><button className="ml-10 bg-emerald-500 text-white rounded-md  mt-3 p-1 hover:bg-emerald-600 hover:shadow">
              Add Artist
          </button></a>
        </div>
      </div>
      </div>


      

      <div className='flex flex-col justify-around items-center mx-auto mt-10'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mx-auto">
            {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} revalidate={1}/>
            ))}
        </div>
      </div>
    </div>
  );
}