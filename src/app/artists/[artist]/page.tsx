"use client"
import { remult } from "remult"
import { useEffect, useState } from 'react';
import { Artist } from '../../_shared/artist';
//import { ArtPiece } from '../../_shared/art';
import React from 'react';
import Image from 'next/image'
import reubenPic from '/public/images/reuben.png'
import { useRouter } from 'next/navigation';
//import { Type } from '../../_shared/artist';


export default function ArtistPage({ params }: { params: { artist: string } }) {
    const [artist, setArtist] = useState<Artist>();
    //const [art, setArt] = useState<ArtPiece>();
    const artistRepo = remult.repo(Artist);
    //const artRepo = remult.repo(ArtPiece);
    const router = useRouter();
    
    

    useEffect(() => {
        let artistId = parseInt(params.artist);
        if (artistId && typeof artistId === 'number')
            artistRepo.findFirst({ id: artistId }).then(setArtist);
    }, [params.artist, artistRepo]);

    

    return (
        <div className='w-3/4 m-auto pt-4'>
            <h1>Artist: {artist?.firstName} {artist?.lastName}</h1>
            <h2>{artist?.dob.toDateString()}</h2>
            <h2>{artist?.dod.toDateString()}</h2>
            <h2>{artist?.nationality}</h2>
            <div>
    {(() => {
      switch (artist?.primaryType) {
        case 0:
            return "Painting";
        case 1:
            return "Sculpture";
        case 2:
            return "Photography";
        case 3:
            return "Drawing";
        case 4:
            return "Printmaking";
        case 5:
            return "Mixed Media";
        case 6:
            return "Furniture";
        case 7:
            return "Other";
        default:
            return "Unknown Type";
    }
    })()}
  </div>
            <h2>{artist?.biography}</h2>
            <h2>{artist?.website}</h2>
            <h2>{artist?.notes}</h2>
        </div>
    );

    if (!artist) {
        return <div>Loading...</div>;
    }
    return (
        <div className='w-3/4 m-auto pt-4'>
            <h1>Artist: {artist?.firstName} {artist?.lastName}</h1>
        </div>
    );
}