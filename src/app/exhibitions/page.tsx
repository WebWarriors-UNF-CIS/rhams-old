"use client";
import { SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import { Exhibit } from '../_shared/exhibit';
import Head from 'next/head';
import ExhibitCard from '../_components/card-exhibit';
import { ExhibitSort } from '../_components/sort/ExhibitSort';
import { ExhibitFilter } from '../_components/filter/ExhibitFilter';
import '../globals.css'

const exhibitRepo = remult.repo(Exhibit);

export default function ExhibitPage() {
  const router = useRouter();
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [sortField, setSortField] = useState<string>('startDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState({ startDate: '', endDate: '', location: '' });

  useEffect(() => {
    const fetchExhibits = async () => {
      const fetchedExhibits = await remult.repo(Exhibit).find({
        orderBy: { [sortField]: sortOrder },
      });
      setExhibits(fetchedExhibits);
    };

    fetchExhibits();
  }, [sortField, sortOrder, filter]);
  
  const handleSortChange = (field: string, order: 'asc' | 'desc') => {
    setSortField(field);
    setSortOrder(order);
  };

  const handleFilterChange = (newFilter: SetStateAction<{ startDate: string; endDate: string; location: string; }>) => {
    setFilter(newFilter);
  };
  
  const doesExhibitMatchFilters = (exhibit: Exhibit) => {
    const exhibitStartDate = exhibit.startDate ? new Date(exhibit.startDate) : null;
    const exhibitEndDate = exhibit.endDate ? new Date(exhibit.endDate) : null;
    const filterStartDate = filter.startDate ? new Date(filter.startDate) : null;
    const filterEndDate = filter.endDate ? new Date(filter.endDate) : null;
    const matchesStartDate = filterStartDate && exhibitStartDate ? exhibitStartDate >= filterStartDate : true;
    const matchesEndDate = filterEndDate && exhibitEndDate ? exhibitEndDate <= filterEndDate : true;
    const matchesLocation = filter.location ? exhibit.location === filter.location : true;
    return matchesStartDate && matchesEndDate && matchesLocation;
  };

  return (
    <div>
      <Head>
        <title>View Exhibitions</title>
      </Head>
      <div className='flex flex-col mx-auto mt-10 pl-28'><h1>Exhibitions</h1></div>
      <div className="p-4 flex items-end justify-end">
        <ExhibitSort onSort={handleSortChange} />
        <ExhibitFilter onFilterChange={handleFilterChange} />
        <button className="btn-gray h-10 ml-40 mr-5 mb-0.5" onClick={() => router.push('exhibitions/manage')}>
            Edit Exhibitions
        </button>
      </div>

      <div className='flex flex-col justify-around items-center mx-auto mt-10'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mx-auto">
          {exhibits.filter(doesExhibitMatchFilters).map((exhibit) => (
          <ExhibitCard key={exhibit.id} exhibit={exhibit} canEditAndDelete={false} UIRefresh={() => {}}
          />
          ))}
        </div>
      </div>
    </div>
  );
}