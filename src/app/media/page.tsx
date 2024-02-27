"use client";
import { useEffect, useState } from 'react';
import { remult } from 'remult';
import { Media } from '../_shared/media';
import Head from 'next/head';
import MediaCard from '../_components/card-media';
import Link from 'next/link';

const mediaRepo = remult.repo(Media);

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);

  useEffect(() => { mediaRepo.find().then(setMedia) }, []);

  return (
    <main>
      <Head>
        <title>View Media</title>
      </Head>
      <Link href="../media/create"><button className="btn-green absolute top-20 right-4"> Add Media </button></Link>
      <h1 className="text-center justify-text-3xl font-medium p-12 dark:text-white">Media will go here!</h1>
      <div className="col-span-3">
        {media.map((media) => (
          <MediaCard key={media.id} media={media} canEditAndDelete={false} revalidate={1} UIRefresh={function (): void {} } />
        ))}
      </div>
    </main>
  );
}