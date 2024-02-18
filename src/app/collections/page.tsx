"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
//import { Collection } from '../_shared/collection';
import Head from 'next/head';
//import CollectionCard from '../_components/card-collection';
import '../globals.css'

//const collectionRepo = remult.repo(Collection);

export default function CollectionPage() {
 // const [collection, setCollection] = useState<Collection[]>([]);
  //const router = useRouter();

 // useEffect(() => {collectionRepo.find().then(setCollection) }, []);

  return (
    <div>
      <Head>
        <title>View Collection</title>
      </Head>
      
      <div>
        <h1 className="text-center justify-text-3xl font-bold p-12 dark:text-white">Collections will go here!</h1>
      </div>
      </div>
  );
}