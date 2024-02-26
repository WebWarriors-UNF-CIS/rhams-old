"use client"
import React from 'react';
import { Artist } from '../_shared/artist';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { remult } from 'remult';
import Link from 'next/link';

interface ArtistCardProps 
{
  artist: Artist;
  revalidate: 1;
  canEditAndDelete: boolean;
  UIRefresh: () => void;
}

const artistRepo = remult.repo(Artist);

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => 
{
    const router = useRouter();
    const handleCardClick = () => {
        router.push('./view');
     };
     const deleteArtist = (event: { stopPropagation: () => void; }) => 
     {
        event.stopPropagation();
        artistRepo.delete(artist);
        window.location.reload();
     }
    return (
        <div className='card' key={artist.id}/*onClick={handleCardClick}*/>
            <h3>{artist.name}</h3><br/>
            <div className="flex justify-between">
                <button className="btn-green">
                    <Link href={`/artists/${artist.id}`}>View</Link>
                </button>
                <button className="btn-red" onClick={deleteArtist}>Delete</button>
            </div>
        </div>
    );
};

export default ArtistCard;