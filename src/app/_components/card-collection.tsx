"use client"
import React from 'react';
import { Collection } from '../_shared/collection';
import { useRouter } from 'next/navigation';


export default function CollectionCard({ collection } : {collection: Collection}) {
    const router = useRouter();
    return (
        <div className='card dark:text-white' onClick = {() => router.push(`/collections/${collection.id}`)}>
            <h3 className='font-medium text-2xl'>{collection.title}</h3>
            <div>{collection.owner}</div>
        </div>
    );
};