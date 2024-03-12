"use client";
import React, { useEffect, useState } from 'react';
import { remult } from 'remult';
import { EntityFilter } from 'remult';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { Exhibit } from '../../_shared/exhibit';
import ExhibitModal from '../../_components/editmodal-exhibit';
import AddExhibitModal from '../../_components/addmodal-exhibit';

interface IExhibit extends Exhibit {}

interface IConfirmationModalProps {
  exhibit: IExhibit | null;
  onDelete: () => void;
  onCancel: () => void;
}


const ExhibitPage = () => {
  const router = useRouter();
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());
  const [showAddModal, setShowAddModal] = useState(false); // State for showing Add Exhibit Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing Delete Exhibit Modal
  const [exhibitToDelete, setExhibitToDelete] = useState<Exhibit | null>(null); // State to hold exhibit to delete

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true); // Begin loading state
      const fetchedExhibits = await remult.repo(Exhibit).find();
      setExhibits(fetchedExhibits);
      setIsLoading(false); // End loading state

      const uniqueLocations = Array.from(new Set(fetchedExhibits.map(exhibit => exhibit.location))).filter(Boolean) as string[];
      setLocations(uniqueLocations);
    };

    fetchInitialData();
  }, []);

  const navigate = () => {
    router.push('./');
  };

  const toggleLocationFilter = (location: string) => {
    const newFilters = new Set(selectedLocations);
    if (newFilters.has(location)) {
      newFilters.delete(location);
    } else {
      newFilters.add(location);
    }
    setSelectedLocations(newFilters);
  };

  const clearFilters = () => setSelectedLocations(new Set());

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const fetchExhibits = async () => {
    const repo = remult.repo<Exhibit>(Exhibit);
    let whereClause: EntityFilter<Exhibit> = {};
  
    if (selectedLocations.size > 0) {
      whereClause.location = { $in: Array.from(selectedLocations) };
    }
  
    const orderByClause = sortField ? { [sortField]: sortDirection === 'asc' ? 'ASC' : 'DESC' } : {};
  
    try {
      const fetchedExhibits = await repo.find({
        where: whereClause,
        orderBy: orderByClause
      });
      setExhibits(fetchedExhibits);
    } catch (error) {
      console.error("Failed to fetch exhibits:", error);
    }
  };

  useEffect(() => {
    fetchExhibits();
  }, [selectedLocations, sortField, sortDirection, fetchExhibits  ]);

  const handleRowClick = (exhibit: Exhibit) => {
    setSelectedExhibit(exhibit);
  };

  const handleSaveExhibit = async (updatedExhibit: Exhibit) => {
    await remult.repo(Exhibit).save(updatedExhibit);
    setSelectedExhibit(null);
    fetchExhibits();
  };

  const handleAddExhibit = () => {
    setShowAddModal(true);
  };

  
  const ConfirmationModal: React.FC<IConfirmationModalProps> = ({ exhibit, onDelete, onCancel }) => {
    if (!exhibit) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Confirm Deletion</h2>
          <p className="mb-4">Are you sure you want to delete the exhibit &quot{exhibit.name}&quot?</p>
          <div className="flex justify-end">
            <button onClick={onDelete} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md">Delete</button>
            <button onClick={onCancel} className="mr-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md">Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  const handleDeleteExhibit = (exhibit: Exhibit) => {
    setExhibitToDelete(exhibit);
    setShowDeleteModal(true);
  };

  const confirmDeleteExhibit = async () => {
    if (exhibitToDelete) {
      await remult.repo(Exhibit).delete(exhibitToDelete.id);
      setExhibitToDelete(null);
      setShowDeleteModal(false);
      fetchExhibits();
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };
  

  return (
    <>
      <Head>
        <title>Exhibitions</title>
      </Head> 
      <div className="mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold" style={{ width: "90%" }}>Exhibitions</h1>
            <button onClick={handleAddExhibit} className="text-lg bg-green-500 hover:bg-green-600 text-white font-bold px-4">+</button>
            <button className="text-lg dark:text-gray-300 bg-gray-500  dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700" onClick={navigate}>
              Back
            </button>
          </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-auto pr-4">
            <div className="mb-4 shadow overflow-hidden rounded bg-white dark:bg-gray-800">
              <h2 className="py-3 px-4 uppercase font-semibold text-sm text-left bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">Filter by Location</h2>
              <ul className="list-none p-0">
                {locations.length > 0 ? (
                  locations.map(location => (
                    <li key={location} className={`cursor-pointer mb-2 text-sm text-gray-600 dark:text-gray-300 p-4 ${selectedLocations.has(location) ? 'border rounded' : ''}`} onClick={() => toggleLocationFilter(location)}>
                      {location}
                    </li>
                  ))
                ) : (
                  <li className="p-4 text-gray-600 dark:text-gray-300">Loading...</li>
                )}
              </ul>
              <button className="mb-2 ml-4 px-4 py-2 rounded bg-red-500 dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-700" onClick={clearFilters}>Clear Filters</button>
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
                  {!isLoading ? (
                    exhibits.map(exhibit => (
                      <tr key={exhibit.id}>
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
                          <button className="mr-4 px-4 bg-red-500  dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-700" onClick={() => handleDeleteExhibit(exhibit)}>-</button>
                        </td>
                      </tr>
                    ))
                  ) : (
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
            {showAddModal && (
              <AddExhibitModal 
                onClose={() => setShowAddModal(false)}
                onSuccess={() => {
                  fetchExhibits();
                  setShowAddModal(false);
                }}
              />
            )}
            {showDeleteModal && (
              <ConfirmationModal 
                exhibit={exhibitToDelete} 
                onDelete={confirmDeleteExhibit}
                onCancel={() => setShowDeleteModal(false)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};  

export default ExhibitPage;