"use client"
import { remult } from "remult"
import { useEffect, useState } from 'react';
import { Artist } from '../../_shared/artist';
//import { ArtPiece } from '../../_shared/art';
import React from 'react';
import Image from 'next/image'
import reubenPic from '/public/images/reuben.png'
import { useRouter } from 'next/navigation';

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

    <div className='w-3/4 m-auto pt-4'>
            <h1>Artist: {artist?.firstName} {artist?.lastName}</h1>
        </div>
    if (!artist) {
        return <div>Loading...</div>;
    }
    return (
        <div className='w-3/4 m-auto pt-4'>
            <h1>Artist: {artist?.firstName} {artist?.lastName}</h1>
        </div>
    );
}