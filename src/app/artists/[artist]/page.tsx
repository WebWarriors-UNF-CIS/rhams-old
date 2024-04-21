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
import { Exhibit } from "../../_shared/exhibit";    
import ExhibitRow from "../../_components/row-exhibit";
import ArtistModal from '../../_components/editmodal-artist';


//import { Type } from '../../_shared/artist';
const artistRepo = remult.repo(Artist);


export default function ArtistPage({ params }: { params: { artist: string } }) {
    const [artist, setArtist] = useState<Artist>();
    const [Art, setArts] = useState<ArtPiece[]>([]);
    //const [art, setArt] = useState<ArtPiece>();
    const [exhibits, setExhibits] = useState<Exhibit[]>([]);
    const artistRepo = remult.repo(Artist);
    const router = useRouter();
    const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
    
    

    useEffect(() => {
        let artistId = parseInt(params.artist);
        if (artistId && typeof artistId === 'number')
            artistRepo.findFirst({ id: artistId }).then(setArtist);
    }, [params.artist, artistRepo]);
    
    // Function to handle deletion of an artist with confirmation
  const deleteArtist = async (artistId: number) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this artist?');
    
    if (isConfirmed) {
      await artistRepo.delete(artistId);
      // Optionally, refetch the artists list or update the state here
      
      // Navigate to the artists page after deletion
      router.push('/artists'); // Adjust the path as needed
    }
  };
  const handleSaveArtist = async (updatedArtist: Artist) => {
    await artistRepo.save(updatedArtist);
    setSelectedExhibit(null);
  };
    if (!artist) return <div className='flex font-bold text-2xl items-center justify-center h-96 max-w-'><div>Loading...</div></div>;

    return (
        <main>
            <button type="button" className="btn-gray absolute right-4 top-20" onClick={() => router.push('./')}>Back</button>
            <div className="mt-8 mx-5 grid grid-cols-2 gap-5">
                <div>
                    <h1>{artist.name}</h1>
                    {artist.imageString && <Image src={artist.imageString} width={200} height={200} alt={artist.name!} className='float-right mt-14 border border-black' priority={true} />}
                </div>
                <div>
                    <h1 className="dark:text-white text-2xl">Artworks</h1>
                    <table>
                        <thead>
                            <tr className="border border-solid ">
                                <th className="border border-solid p-4">Title</th>
                                <th className="border border-solid p-4">Type</th>
                                <td className="border border-solid p-4">Medium</td>
                            </tr>
                        </thead>
                        <tbody>
                            {artist.artworks && artist.artworks.map((art: ArtPiece) => (
                                <tr key={art.id} onClick={() => router.push(`/art/${art.id}`)} className="hover:cursor-pointer hover:bg-slate-100">
                                    <td className="border border-solid p-4">{art.title}</td>
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
                                    <th className="border border-solid p-4">Name</th>
                                    <th className="border border-solid p-4">Location</th>
                                    <td className="border border-solid p-4"></td>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 dark:text-gray-300">
                                {Array.isArray(exhibits) ? (
                                    exhibits.map((exhibit: Exhibit) => (
                                        <div key={exhibit.id}>
                                            <ExhibitRow exhibit={exhibit} onClick={() => setSelectedExhibit(exhibit)} />
                                            <h1>{exhibit.location}</h1>
                                        </div>
                                    ))
                                ) : (
                                    <tr><td>Loading...</td></tr>
                                )}
                            </tbody>
                        </table>
                        <div>
                        {selectedExhibit && (
                        <ArtistModal 
                        artist={selectedArtist} 
                        onClose={() => setSelectedArtist(null)} 
                        onSave={handleSaveArtist}
                        />
                        )}
                        </div>
                        <br></br>
                        <br></br>
                        <button
                            onClick={() => deleteArtist(artist.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Delete Artist
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}