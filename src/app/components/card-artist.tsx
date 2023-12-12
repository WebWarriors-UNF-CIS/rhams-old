import React from 'react';
import { Artist } from '../shared/artist';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { remult } from 'remult';
import Modal from 'react-modal';
import '../globals.css'


interface ArtistCardProps 
{
  artist: Artist;
}

const artistRepo = remult.repo(Artist);

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => 
{
    const router = useRouter();
    return (
        <div className="card" onClick={() => router.push('./view')}>
            <h3>{artist.firstName}</h3>
            <h3>{artist.lastName}</h3>
        </div>
    );
};

export default ArtistCard;

