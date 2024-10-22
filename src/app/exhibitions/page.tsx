"use client";
import React, { useEffect, useState } from 'react';
import { remult, EntityFilter } from 'remult';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { Exhibit } from '../_shared/exhibit';
import ExhibitRow from '../_components/row-exhibit';
import ExhibitModal from '../_components/editmodal-exhibit';

const repo = remult.repo<Exhibit>(Exhibit);

const ExhibitPage = () => {
  const router = useRouter();
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());

  const toggleLocationFilter = (location: string) => {
    const newFilters = new Set(selectedLocations);
    newFilters.has(location) ? newFilters.delete(location) : newFilters.add(location);
    setSelectedLocations(newFilters);
  };

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSaveExhibit = async (updatedExhibit: Exhibit) => {
    await repo.save(updatedExhibit);
    setSelectedExhibit(null);
  };

  async function setLocationList() {
    const temp = await repo.find();
    setLocations(Array.from(new Set(temp.map(exhibit => exhibit.location))).filter(Boolean) as string[]);
  }

  useEffect(() => {
    setLocationList();
    let whereClause: EntityFilter<Exhibit> = {};
    if (selectedLocations.size > 0)
      whereClause.location = { $in: Array.from(selectedLocations) };
    const orderByClause = sortField ? { [sortField]: sortDirection === 'asc' ? 'ASC' : 'DESC' } : {};
  
    try {
      repo.find({
        where: whereClause,
        orderBy: orderByClause
      }).then(setExhibits);
    } catch (error) {
      console.error("Failed to fetch exhibits:", error);
    }
  }, [selectedLocations, sortField, sortDirection]);

   
  return (<>
    <Head>
      <title>Exhibitions</title>
    </Head> 
    <div className="mx-4 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold"> Exhibitions </h1>
        <button className="text-lg dark:text-gray-300 bg-gray-500  dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700" onClick={() => router.push('./exhibitions/manage')}> Manage </button>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-auto pr-4">
          <div className="mb-4 shadow overflow-hidden rounded bg-white dark:bg-gray-800">
            <h2 className="py-3 px-4 uppercase font-semibold text-sm text-left bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"> Filter by Location </h2>
            <ul className="list-none p-0">
              {locations.length > 0 ?
                locations.map(location => (
                  <li key={location} className={`cursor-pointer mb-2 text-sm text-gray-600 dark:text-gray-300 p-4 ${selectedLocations.has(location) ? 'border rounded' : ''}`} onClick={() => toggleLocationFilter(location)}> {location} </li>
                )) : (
                <li className="p-4 text-gray-600 dark:text-gray-300">Loading...</li>
              )}
            </ul>
            <button className="mb-2 ml-4 px-4 py-2 rounded bg-red-500 dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-700" onClick={() => setSelectedLocations(new Set())}>Clear Filters</button>
          </div>
        </div>
        <div className="w-full md:w-3/4 pl-4 pb-4 md:pb-0">
          <div className="shadow overflow-hidden rounded bg-white dark:bg-gray-800">
            <table className="min-w-full">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="py-3 px-4 uppercase font-semibold text-sm text-left cursor-pointer" style={{ width: "33.333%" }} onClick={() => toggleSort('name')}>
                    Name of Exhibition {sortField === 'name' && (sortDirection === 'asc' ? '- A-Z' : '- Z-A')}
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm text-left cursor-pointer" style={{ width: "33.333%" }}>
                    Location
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm cursor-pointer" style={{ width: "16.67%" }} onClick={() => toggleSort('startDate')}>
                    Start Date {sortField === 'startDate' && (sortDirection === 'asc' ? '- Earliest ↑' : '- Latest ↑')}
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm cursor-pointer" style={{ width: "16.67%" }} onClick={() => toggleSort('endDate')}>
                    End Date {sortField === 'endDate' && (sortDirection === 'asc' ? '- Earliest ↑' : '- Latest ↑')}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                {exhibits ?
                  exhibits.map(exhibit => (
                    <ExhibitRow key={exhibit.id} exhibit={exhibit} onClick={() => setSelectedExhibit(exhibit)} />
                  )) : (
                  <tr><td>Loading...</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {selectedExhibit && (
            <ExhibitModal 
              exhibit={selectedExhibit} 
              onClose={() => setSelectedExhibit(null)} 
              onSave={handleSaveExhibit}
            />
          )}
        </div>
      </div>
    </div>
  </>);
};

export default ExhibitPage;
