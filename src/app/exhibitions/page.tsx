"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import { Exhibit } from '../shared/exhibit';
import Head from 'next/head';
import ExhibitCard from '../components/ExhibitCard';
import '../globals.css'

const exhibitRepo = remult.repo(Exhibit);

export default function ExhibitPage() {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchExhibits() {
      const allExhibits = await exhibitRepo.find();
      setExhibits(allExhibits);
    }
    fetchExhibits();
  }, []);

  return (
    <div>
      <Head>
        <title>View Exhibitions</title>
      </Head>
      <div className='flex flex-col mx-auto mt-10 pl-28'><h1>Exhibitions</h1></div>
      <div className="p-4 flex items-end justify-end">
          <div className="space-x-4 grid grid-cols-2">
          <div className="input">
            <label htmlFor="date-filter" className="text-gray-600">Dates:</label>
            <input className="h-11"
            type="date"
            id="date-filter"
            />
          </div>
          <div className="input">
            <label htmlFor="location-filter">Location:</label>
            <input
            type="text"
            id="location-filter"
            placeholder="Enter location"
            />
          </div>
          </div>
          <button className="btn-gray h-10 ml-40 mr-5 mb-0.5" onClick={() => router.push('exhibitions/manage')}>
              Edit Exhibitions
          </button>
      </div>

      <div className='flex flex-col justify-around items-center mx-auto mt-10'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
            {exhibits.map((exhibit) => (
            <ExhibitCard key={exhibit.id} exhibit={exhibit} />
            ))}
        </div>
      </div>
    </div>
  );
}