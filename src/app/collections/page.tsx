"use client";
import { useEffect, useState } from 'react';
import { remult } from 'remult';
import { Collection } from '../_shared/collection';
import Head from 'next/head';
import CollectionCard from '../_components/card-collection';
import Link from 'next/link';

const collectionRepo = remult.repo(Collection);

export default function CollectionPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  
  useEffect(() => {collectionRepo.find().then(setCollections) }, []);

  if (!collections) return <div>Loading...</div>;
  return (
    <main>
      <Head>
        <title>View Collection</title>
      </Head>
      <Link href="/collections/create"><button className="btn-green absolute right-4 top-20"> Add Collection </button></Link>
      <h1 className="text-center justify-text-3xl font-medium p-12 dark:text-white">Collections</h1>
      <div className="col-span-3">
        { collections.length === 0 ? <div className="text-center text-white p-8 text-xl">No collections found</div> :
        collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </main>
  );
}