"use client";
import React, { useEffect, useState } from 'react';
import { remult, EntityFilter } from 'remult';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { Exhibit } from '../../_shared/exhibit';
import ExhibitModal from '../../_components/editmodal-exhibit';

const repo = remult.repo<Exhibit>(Exhibit);

const ManageExhibitsPage = () => {
  const router = useRouter();
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());
  const [exhibitToDelete, setExhibitToDelete] = useState<Exhibit | null>(null); // State to hold exhibit to delete

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
  
  function ConfirmationModal ({ exhibit }: { exhibit: Exhibit }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Confirm Deletion</h2>
          <p className="mb-4">Are you sure you want to delete the exhibit <br/>"{exhibit.name}"?</p>
          <div className="flex justify-between">
            <button onClick={confirmDeleteExhibit} className="btn-red">Delete</button>
            <button onClick={() => setExhibitToDelete(null)} className="btn-gray">Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  const confirmDeleteExhibit = async () => {
    if (exhibitToDelete) {
      await repo.delete(exhibitToDelete.id);
      setExhibitToDelete(null);
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
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
        <h1 className="text-3xl font-bold w-[90%]">Exhibitions</h1>
        <button onClick={() => router.push('./create')} className="text-lg px-4 btn-green"> + </button>
        <button className="text-lg btn-gray" onClick={() => router.push('./')}> Back </button>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-auto pr-4">
          <div className="mb-4 shadow overflow-hidden rounded bg-white dark:bg-gray-800">
            <h2 className="py-3 px-4 uppercase font-semibold text-sm text-left bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">Filter by Location</h2>
            <ul className="list-none p-0">
              {locations.length > 0 ?
                locations.map(location => (
                  <li key={location} className={`cursor-pointer mb-2 text-sm text-gray-600 dark:text-gray-300 p-4 ${selectedLocations.has(location) ? 'border rounded' : ''} hover:bg-gray-700/60`} onClick={() => toggleLocationFilter(location)}>
                    {location}
                  </li>
                )) : (
                <li className="p-4 text-gray-600 dark:text-gray-300">Loading...</li>
              )}
            </ul>
            <button className="btn-red ml-3 mb-3" onClick={() => setSelectedLocations(new Set())}>Clear Filters</button>
          </div>
        </div>
        <div className="w-full md:w-3/4 pl-4 pb-4 md:pb-0">
          <div className="shadow overflow-hidden rounded bg-white dark:bg-gray-800 relative">
            <table className="min-w-full">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="py-3 px-4 uppercase font-semibold text-sm text-left cursor-pointer" style={{ width: "30%" }} onClick={() => toggleSort('name')}>
                    Name of Exhibition {sortField === 'name' && (sortDirection === 'asc' ? '- A-Z' : '- Z-A')}
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm text-left cursor-pointer" style={{ width: "30%" }}>
                    Location
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm cursor-pointer" style={{ width: "15%" }} onClick={() => toggleSort('startDate')}>
                    Start Date {sortField === 'startDate' && (sortDirection === 'asc' ? '- Earliest ↑' : '- Latest ↑')}
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm cursor-pointer" style={{ width: "15%" }} onClick={() => toggleSort('endDate')}>
                    End Date {sortField === 'endDate' && (sortDirection === 'asc' ? '- Earliest ↑' : '- Latest ↑')}
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm"></th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                { exhibits ?
                  exhibits.map(exhibit => (
                    <tr key={exhibit.id} onClick={() => setSelectedExhibit(exhibit)} className="hover:bg-gray-700/60">
                      <td className="py-3 px-4 text-sm sm:text-base text-gray-900 dark:text-white" style={{ width: "33.333%" }}>
                        {exhibit.name}
                      </td>
                      <td className="py-3 px-4 text-sm sm:text-base text-gray-900 dark:text-gray-300" style={{ width: "33.333%" }}>
                        {exhibit.location}
                      </td>
                      <td className="py-3 px-4 text-sm sm:text-base text-center text-gray-900 dark:text-gray-300" style={{ width: "16.67%" }}>
                        {exhibit.startDate ? formatDate(new Date(exhibit.startDate)) : 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-sm sm:text-base text-center text-gray-900 dark:text-gray-300" style={{ width: "16.67%" }}>
                        {exhibit.endDate ? formatDate(new Date(exhibit.endDate)) : 'N/A'}
                      </td>
                      <td>
                        <button className="btn-red px-3 mr-3" onClick={() => setExhibitToDelete(exhibit)}>-</button>
                      </td>
                    </tr>
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
          {exhibitToDelete && <ConfirmationModal exhibit={exhibitToDelete} />}
        </div>
      </div>
    </div>
  </>);
};  

export default ManageExhibitsPage;