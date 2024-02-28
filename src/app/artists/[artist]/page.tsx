"use client"
import { remult } from "remult"
import { useEffect, useState } from 'react';
import { Artist } from '../../_shared/artist';
import React from 'react';
import Image from 'next/image'
import reubenPic from '/public/images/reuben.png'
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { ArtPiece } from "../../_shared/art"

//import { Type } from '../../_shared/artist';


export default function ArtistPage({ params }: { params: { artist: string } }) {
    const [artist, setArtist] = useState<Artist>();
    const [Art, setArts] = useState<ArtPiece[]>([]);
    //const [art, setArt] = useState<ArtPiece>();
    const artistRepo = remult.repo(Artist);
    const router = useRouter();
    
    useEffect(() => {
        let artistId = parseInt(params.artist);
        if (artistId && typeof artistId === 'number')
            artistRepo.findFirst({ id: artistId }).then(setArtist);
    }, [params.artist, artistRepo]);

    if (!artist) return <div className='flex font-bold text-2xl items-center justify-center h-96 max-w-'><div>Loading...</div></div>;

    return (
        <main>
            <button type="button" className="btn-gray absolute right-4 top-20" onClick={() => router.push('./')}>Back</button>
            <div className="mt-8 mx-5 grid grid-cols-2 gap-5">
                <div>
                    <h1>{artist.name}</h1>
                    <Image className="max-w-xs"src={reubenPic} alt="Reuben Hale" />
                </div>
                <div>
                    <h1 className="dark:text-white text-2xl">Artworks</h1>
                    <table>
                        <thead>
                        <tr className="border border-solid ">
                            <th className="border border-solid p-4">Title</th>
                            <th className="border border-solid p-4">Date</th>
                            <th className="border border-solid p-4">Type</th>
                            <td className="border border-solid p-4">Medium</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border border-solid p-4">Sculpture of a Woman</td>
                            <td className="border border-solid p-4">1973</td>
                            <td className="border border-solid p-4">Clay Sculpture</td>
                            <td className='border border-solid p-4 px-4 py-2'></td>
                        </tr>
                        <tr>
                            <td className="border border-solid p-4">Painting of a Prince</td>
                            <td className="border border-solid p-4">1984</td>
                            <td className="border border-solid p-4">Oil on Canvas</td>
                            <td className='border border-solid p-4 px-4 py-2'></td>
                        </tr>
                        { artist.artworks && artist.artworks.map((art) => (
                            <tr key={art.id} onClick={() => router.push(`/art/${art.id}`)} className="hover:cursor-pointer hover:bg-slate-100">
                                <td className="border border-solid p-4">{art.title}</td>
                                <td className="border border-solid p-4">{}</td>
                                <td className="border border-solid p-4">{art.type}</td>
                                <td className="border border-solid p-4">{art.medium}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-8 mx-5 grid grid-cols-2 gap-3">
                <div className="mx-5 grid grid-cols-2">
                    <div className="col-span-1">
                        <h1 className="dark:text-white text-2xl">Biography</h1>
                        <p className="dark:text-white text-lg"><h2>{artist.biography}</h2></p><br></br>
                        {artist.dob && <p className="dark:text-white text-lg"><h2>Born: {artist.dob.toDateString()}</h2></p>} 
                        {artist.dod && <p className="dark:text-white text-lg"><h2>Died: {artist.dod.toDateString()}</h2></p>}
                        <p className="dark:text-white text-lg"><h2>{artist.nationality}</h2></p><br></br>
                        <div>
                            <h2>Primary Medium:</h2>
                            {artist.primaryType ? Object.values(artist.primaryType) : 'Unknown' /* delete Object.values if not working */}
                        </div>
                    </div>
                </div>
                <div className="mx-5 grid grid-cols-2 gap-2">
                    <div className="col-span-1">
                        <h1 className="dark:text-white text-2xl">Notes</h1>
                        <p className="dark:text-white text-lg"><h2>{artist.notes}</h2></p>
                    </div>
                    <div className="col-span-1">
                        <h1 className="dark:text-white text-2xl">Exhibitions</h1>
                        <table>
                            <thead>
                            <tr className="border border-solid ">
                                <th className="border border-solid p-4">Exhibit</th>
                                <th className="border border-solid p-4">Location</th>
                                <td className="border border-solid p-4"></td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border border-solid p-4">Cummer Museum</td>
                                <td className="border border-solid p-4">Jacksonville, FL</td>
                                <td className='border border-solid p-4 px-4 py-2'>
                                    <Link href="../exhibitions"><button  className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded">View</button></Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-solid p-4">Museum of Art</td>
                                <td className="border border-solid p-4">Nashville, TN</td>
                                <td className='border border-solid p-4 px-4 py-2'>
                                    <Link href="../exhibitions"><button  className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded">View</button></Link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
        </main>
    );
}