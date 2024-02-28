"use client"
import React from 'react';
import { Collection } from '../_shared/collection';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';


export default function CollectionCard({ collection } : {collection: Collection}) {
    const router = useRouter();
    return (
        <div className='card' onClick = {() => router.push(`/collections/${collection.id}`)}>
            {collection.title}
            <div>{collection.owner}</div>
            <div>{collection.dateAcquired?.toString()}</div>
            <div>{collection.location}</div>
        </div>
    );
};