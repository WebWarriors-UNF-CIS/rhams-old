"use client"
import { useEffect, useState } from 'react';
import { remult } from 'remult';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArtPiece } from '../../_shared/art';
import { Artist, Type } from '../../_shared/artist';
import SizeInput from '../../_components/sizeInput';
import { Collection } from '../../_shared/collection';

export default function UpdateArt({params} : { params: {edit: string}}) {
  const [successMessage, setSuccessMessage] = useState('');
  const [collection, setCollection] = useState<Collection>({
    title: '',
    owner: '',
    dateAcquired: new Date(),
    location: '',
    id: 0
  })
  const [arts, setArts] = useState<Artist[]>();
  const collectionRepo = remult.repo(Collection);
  const artRepo = remult.repo(Artist);
  const router = useRouter();

  async function deleteCollection() {
    try { await collectionRepo.delete(collection!) }
    catch (error) { console.error(error)}
  }
  
  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    setCollection((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setCollection({
      ...collection,
      title: form.collectionTitle.value,
      owner: form.owner.value,
      dateAcquired: form.dateAcquired.value,
      location: form.location.value
    });
    await artRepo.save(collection).then(() => setSuccessMessage('Exhibition created successfully!'));
    router.push('./');
  }

  useEffect(() => {
    if (params.edit)
      collectionRepo.findFirst({ id: parseInt(params.edit) }).then(setCollection);
    artRepo.find({}).then(setArts);
 
  }, [params.edit, collectionRepo, artRepo]);

  if (!collection) return <div className='flex font-bold text-2xl items-center justify-center h-96 max-w-'><div>Loading...</div></div>;
  
  return (
    <main className="mx-auto p-10">
      <button type="button" className="fixed btn-gray h-fit self-end right-3 top-16" onClick={() => router.push('./')}>Back</button>
      {successMessage && (
        <div className="bg-green-500 text-white p-4 mb-4">{successMessage}</div>
      )}
      <form className='form !flex flex-wrap w-3/5 md:w-[600px]' onSubmit={handleSubmit}>
      </form>
      <button className="btn-red fixed h-fit self-end right-3 top-[104px]" onClick={deleteCollection}>Delete</button>
    </main>
  );
}