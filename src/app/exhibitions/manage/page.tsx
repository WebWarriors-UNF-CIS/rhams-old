"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import { Exhibit } from '../../shared/exhibit';
import Head from 'next/head';
import ExhibitCard from '../../_components/card-exhibit';
import '../../globals.css'

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
        <title>Manage Exhibitions</title>
      </Head>
      <div className='flex flex-row flex-wrap mx-auto mt-10 pl-8'>
        <h1 className='mr-4'>Manage Exhibitions</h1>
        <button className="ml-4 max-h-10 btn-green" onClick={() => router.push('./create')}>
            Create New Exhibition
        </button>
      </div>
      <div className="p-4 flex items-end justify-start">
          <div className="grid grid-cols-3">

          
          </div>
      </div>

      <div className='flex flex-col justify-around items-center mx-auto mt-10'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 min-w-fit mx-auto">
            {exhibits.map((exhibit) => (
            <ExhibitCard key={exhibit.id} exhibit={exhibit} canEditAndDelete={true} UIRefresh={function (): void {} } />
            ))}
        </div>
      </div>
    </div>
  );
}