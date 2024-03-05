"use client"
import { useEffect, useState } from 'react';
import { remult } from 'remult';
import { useRouter } from 'next/navigation';
import { ArtPiece } from '../../_shared/art';
import { Collection } from '../../_shared/collection';

export default function UpdateCollection({params} : { params: {edit: string}}) {
  const [successMessage, setSuccessMessage] = useState('');
  const [collection, setCollection] = useState<Collection>({
    title: '',
    owner: '',
    dateAcquired: new Date(),
    location: '',
    id: 0
  })
  const [arts, setArts] = useState<ArtPiece[]>();
  const collectionRepo = remult.repo(Collection);
  const artRepo = remult.repo(ArtPiece);
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
    await collectionRepo.save(collection).then(() => setSuccessMessage('Exhibition created successfully!'));
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
      <button type="button" className="fixed btn-gray h-fit self-end right-4 top-20" onClick={() => router.push('./')}>Back</button>
      {successMessage && (
        <div className="bg-green-500 text-white p-4 mb-4">{successMessage}</div>
      )}
      <form className='form !flex flex-wrap w-3/5 md:w-[600px]' onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="collectionTitle">Title</label>
          <input type="text" id="collectionTitle" name="collectionTitle" value={collection.title} onChange={handleChange} />
        </div>
        <div className="input">
          <label htmlFor="owner">Owner</label>
          <input type="text" id="owner" name="owner" value={collection.owner} onChange={handleChange} />
        </div>
        <div className="input">
          <label htmlFor="dateAcquired">Date Acquired</label>
          <input type="date" id="dateAcquired" name="dateAcquired" value={collection.dateAcquired?.toString()} onChange={handleChange} />
        </div>
        <div className="input">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" value={collection.location} onChange={handleChange} />
        </div>
        <button className="btn-red fixed h-fit self-end right-4 top-[124px]" onClick={deleteCollection}>Delete</button>
      </form>
    </main>
  );
}