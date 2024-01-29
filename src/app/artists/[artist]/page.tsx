import { remult } from "remult"
import { Artist } from '../../shared/artist';
import React from 'react';
import Image from 'next/image'

var artistRepo = remult.repo(Artist);

async function ArtistView({ params }: { params: { artist: string } }) {
    //let currentArtist = await artistRepo.findId(params.artist);
  //{currentArtist.firstName + " " + currentArtist.lastName}
  return (
    <div>
        <div className="mt-8 mx-5 grid grid-cols-2 gap-5">
            <div>
                <h1 className="dark:text-white text-2xl"  >Reuben Aldridge Hale, Jr.</h1>
                <Image className="max-w-xs"src={'public/images/reuben.png'} alt="Reuben Hale" />
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
        <div className="mt-8 mx-5 grid grid-cols-2 gap-3">
            <div className="mx-5 grid grid-cols-2">
                <div className="col-span-1">
                    <h1 className="dark:text-white text-2xl">About</h1>
                    <p className="dark:text-white text-lg">1927-2018</p> <br></br>
                    <p className="dark:text-white text-lg">West Palm Beach, FL</p><br></br>
                    <p className="dark:text-white text-lg">Paint, photography, printmaking, holography. Sculpture: wood, stone, steel, concrete, bronze and polyester plastics.</p>
                </div>
            </div>
            <div className="mx-5 grid grid-cols-2 gap-2">
                <div className="col-span-1">
                    <h1 className="dark:text-white text-2xl">Notes</h1>
                    <p className="dark:text-white text-lg">Reuben Hale was born in 1945 in New York City. He studied art at the Art Students League of New York and the New York Studio School. He exhibited his work in New York, Los Angeles, and London. Hale was known for his paintings of people and his sculptures of animals.</p>
                </div>
                <div className="col-span-1">
                    <h1 className="dark:text-white text-2xl">Exhibitions</h1>
                    <table>
                        <thead>
                        <tr className="border border-solid ">
                            <th className="border border-solid p-4">Exhibit</th>
                            <th className="border border-solid p-4">Location</th>
                            <td className="border border-solid p-4">
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border border-solid p-4">Cummer Museum</td>
                            <td className="border border-solid p-4">Jacksonville, FL</td>
                            <td className='border border-solid p-4 px-4 py-2'><a href="../exhibitions">
                                <button  className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded">View</button>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-solid p-4">Museum of Art</td>
                            <td className="border border-solid p-4">Nashville, TN</td>
                            <td className='border border-solid p-4 px-4 py-2'><a href="../exhibitions">
                                <button  className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded">View</button>
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
    </div>
  );
}

export default ArtistView;
