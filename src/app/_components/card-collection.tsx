"use client"
import React from 'react';
import { Collection } from '../_shared/collection';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { remult } from 'remult';
import Link from 'next/link';

interface CollectionCardProps 
{
  collection: Collection;
  revalidate: 1;
  canEditAndDelete: boolean;
  UIRefresh: () => void;
}

const collectionRepo = remult.repo(Collection);

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => 
{
    const router = useRouter();
    const handleCardClick = () => {
        router.push('./view');
     };
     const deleteCollection = (event: { stopPropagation: () => void; }) => 
     {
        event.stopPropagation();
        collectionRepo.delete(collection.id);
        window.location.reload();
     }
    return (
       <div>
            <h3>{collection.title} {collection.id}</h3><br/>
            <div className="flex justify-center">
                <button className="btn-green mx-5">
                    <Link href={`/collection/${collection.id}`}>View</Link>
                </button>
                <button className="btn-green mx-5">
                    <Link href={`/collection/${collection.id}`}>Update</Link>
                </button>
                <button className="btn-red mx-5" onClick={deleteCollection}>Delete</button>
            </div>
       </div>
    );
};

export default CollectionCard;