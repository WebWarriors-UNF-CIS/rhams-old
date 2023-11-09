import Link from 'next/link';
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { remult } from "remult"
import '../../globals.css'
import { Artist } from '../../shared/artist';
import React from 'react';

const artists = [
  { id: 1, firstName: 'Reuben', lastName: 'Hale' },
  { id: 2, firstName: 'Frida', lastName: 'Kahlo' },
  { id: 3, firstName: 'Andy', lastName: 'Warhol' },
  { id: 4, firstName: 'Georgia', lastName: 'O\'Keeffe' },
  { id: 5, firstName: 'Pablo', lastName: 'Picasso' },
  { id: 6, firstName: 'Claude', lastName: 'Monet' },
  { id: 7, firstName: 'Vincent', lastName: 'Van Gogh' },
  { id: 8, firstName: 'Leonardo', lastName: 'Da Vinci' },
  { id: 9, firstName: 'Michelangelo', lastName: 'Buonarroti' },
  { id: 10, firstName: 'Salvador', lastName: 'Dali' },
  { id: 11, firstName: 'Edgar', lastName: 'Degas' },
  { id: 12, firstName: 'Rembrandt', lastName: 'van Rijn' },
  { id: 13, firstName: 'Henri', lastName: 'Matisse' },
  { id: 14, firstName: 'Jackson', lastName: 'Pollock' },
  { id: 15, firstName: 'Wassily', lastName: 'Kandinsky' },
  { id: 16, firstName: 'Paul', lastName: 'Cezanne' },
  { id: 17, firstName: 'Edvard', lastName: 'Munch' },
  { id: 18, firstName: 'Gustav', lastName: 'Klimt' },
  { id: 19, firstName: 'Marc', lastName: 'Chagall' },
  { id: 20, firstName: 'Auguste', lastName: 'Rodin' },
  { id: 21, firstName: 'Paul', lastName: 'Klee' },
  { id: 22, firstName: 'Rene', lastName: 'Magritte' },
  { id: 23, firstName: 'Georges', lastName: 'Seurat' },
  { id: 24, firstName: 'Gustave', lastName: 'Courbet' },
  { id: 25, firstName: 'Roy', lastName: 'Lichtenstein' },
  { id: 26, firstName: 'Henri', lastName: 'Rousseau' },
  { id: 27, firstName: 'Pierre-Auguste', lastName: 'Renoir' },
  { id: 28, firstName: 'Georges', lastName: 'Braque' },
  { id: 29, firstName: 'Paul', lastName: 'Gauguin' },
  { id: 30, firstName: 'Camille', lastName: 'Pissarro' },
  { id: 31, firstName: 'Amedeo', lastName: 'Modigliani' },
];

function ArtistTable() {
  return (
    <div className="p-4">
      <div className="flex justify-center items-center">
      <h1 className="text-3xl font-bold p-12 dark:text-white">Artists</h1>
      </div>
      <div className="">
      <div className="flex w-5/5 mb-10">
        <div className=''>
        <h1 className="dark:text-white text-xl font-semibold whitespace-nowrap pr-1 pt-2">Find an Artist</h1>
        </div>
        <div className="flex pl-6">
          <input
            type="text"
            placeholder="First Name"
            className="px-3  border rounded-lg focus:outline-none focus:ring focus:border-emerald-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="px-3 ml-3 border rounded-lg focus:outline-none focus:ring focus:border-emerald-500"
          />
          <button className="ml-3 bg-emerald-500 text-white rounded-lg p-1 hover:bg-emerald-600 hover:shadow">
            Search
          </button>
        </div>
        <div className='flex pl-9'>
        <button className="ml-8 bg-emerald-500 text-white rounded-lg  p-1 hover:bg-emerald-600 hover:shadow">
            Add New Artist
        </button>
      </div>
      </div>
    </div>
    <div className="flex justify-center items-center border-solid border-2 border-black">
      <table className="w-3/4">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr key={artist.id}>
              <td className="dark:text-white px-4 py-2">{artist.firstName}</td>
              <td className="dark:text-white px-4 py-2">{artist.lastName}</td>
              <td className='px-4 py-2'><a href="../artists/artistview">
                <button className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded">View</button>
                </a></td>
                <td className='px-4 py-2'><a href="../artists/artistview">
                <button className="bg-orange-300 hover:bg-orange-700 text-white font-bold py-1 px-1 rounded">Update</button>
                </a></td><td className='px-4 py-2'><a href="../artists/artistview">
                <button className="bg-red-400 hover:bg-red-700 text-white font-bold py-1 px-1 rounded">Delete</button>
                </a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default ArtistTable;
