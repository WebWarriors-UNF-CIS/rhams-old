"use client"
import React from 'react';
import { Media } from '../_shared/media';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { remult } from 'remult';
import Link from 'next/link';

interface MediaCardProps 
{
  media: Media;
  revalidate: 1;
  canEditAndDelete: boolean;
  UIRefresh: () => void;
}

const mediaRepo = remult.repo(Media);

const MediaCard: React.FC<MediaCardProps> = ({ media }) => 
{
    const router = useRouter();
    const handleCardClick = () => {
        router.push('./view');
     };
     const deleteMedia = (event: { stopPropagation: () => void; }) => 
     {
        event.stopPropagation();
        //mediaRepo.delete(media);
        window.location.reload();
     }
    return (
       <div>
            <h3>{media.title} {media.id}</h3><br/>
            <div className="flex justify-center">
                <button className="btn-green mx-5">
                    <Link href={`/media/${media.id}`}>View</Link>
                </button>
                <button className="btn-green mx-5">
                    <Link href={`/media/${media.id}`}>Update</Link>
                </button>
                <button className="btn-red mx-5" onClick={deleteMedia}>Delete</button>
            </div>
       </div>
    );
};

export default MediaCard;