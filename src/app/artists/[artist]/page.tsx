import Link from 'next/link';
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { remult } from "remult"
import 'src/app/globals.css'
import { Artist } from '../../shared/artist';
import React from 'react';
import reubenPic from 'src/images/reuben.png'
import Image from 'next/image'

var artistRepo = remult.repo(Artist);

async function ArtistView({ params }: { params: { artist: string } }) {
    //let currentArtist = await artistRepo.findId(params.artist);
  //{currentArtist.firstName + " " + currentArtist.lastName}
  return (
    <div className="mt-8 grid grid-cols-2 gap-5">
        <div>
            <h1 className="dark:text-white text-2xl"  >Reuben Hale</h1>
            <Image className="max-w-xs"src={reubenPic} alt="Reuben Hale" />
        </div>
        <div>
            <div>
                <h1 className="dark:text-white text-2xl">Artworks</h1>
                <table>
                    <thead>
                    <tr className="border border-solid ">
                        <th className="border border-solid p-4">Title</th>
                        <th className="border border-solid p-4">Date</th>
                        <th className="border border-solid p-4">Medium</th>
                        <td className="border border-solid p-4">
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="border border-solid p-4">Sculpture of a Woman</td>
                        <td className="border border-solid p-4">1973</td>
                        <td className="border border-solid p-4">Clay Sculpture</td>
                        <td className='border border-solid p-4 px-4 py-2'><a href="../art">
                            <button  className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded">View</button>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-solid p-4">Painting of a Prince</td>
                        <td className="border border-solid p-4">1984</td>
                        <td className="border border-solid p-4">Oil on Canvas</td>
                        <td className='border border-solid p-4 px-4 py-2'><a href="../art">
                            <button  className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded">View</button>
                            </a>
                        </td>
                    </tr>
        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

export default ArtistView;
