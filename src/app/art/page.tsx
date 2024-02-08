"use client"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { remult } from "remult"
import ArtCard from "../_components/card-art"
import { Artist, Type } from "../_shared/artist"
import { ArtPiece } from "../_shared/art"

const artRepo = remult.repo(ArtPiece)
const artistRepo = remult.repo(Artist);

export default function ManageArt() {
  const [Art, setArts] = useState<ArtPiece[]>([]);
  const [modalArt, setModalArt] = useState<ArtPiece>();
  const [modalArtist, setModalArtist] = useState<Artist>();
  const router = useRouter();

  function toggleFilters() {
    let filters = document.getElementById("filters");
    filters?.classList.toggle("hidden");
    filters?.classList.toggle("grid");
  }

  async function showModal(id: number) {
    setModalArt(Art.find(art => art.id === id));
    await artistRepo.findFirst({ id: modalArt?.artistId }).then(setModalArtist);
  }
  
  function hideModal() {
    setModalArt(undefined);
    setModalArtist(undefined);
  }

  useEffect(() => { artRepo.find().then(setArts) }, [])

  return (
    <main className='dark:text-white mt-2'>
      <Link href="/art/create" className="fixed right-5">
        <button className="btn-green">Create New Art</button>
      </Link>
      <div className="float-left ml-6 mt-12 border-[3px] border-black dark:border-slate-400 rounded-lg">
        {Object.values(Type).filter(value => isNaN(Number(value))).map((type) => (
          <div className="text-center p-4 border-y border-black dark:border-slate-400 first:border-0 first:border-b last:border-0 last:border-t" key={type}> {type} </div>
        ))}
      </div>
      <div>
        <button className="p-1 px-2 btn-gray ml-4" onClick={toggleFilters}> Filters </button>
        <div className="relative grid-cols-3 gap-2 w-3/4 m-2 p-2 left-4 hidden border border-black rounded-lg" id="filters">
          <div>
            <label className="m-3 p-1"> Catalog # </label>
            <input type="number" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div>
            <label className="m-3 p-1"> Title </label>
            <input type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div>
            <label className="m-3 p-1"> Artist </label>
            <input type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>{/*should be a drop-down menu of artists*/}
          </div>
          <div>
            <label className="m-3 p-1"> Aquired </label>
            <input type="date" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div>
            <label className="m-3 p-1"> Created </label>
            <input type="date" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div>
            <label className="m-3 p-1"> Medium </label>
            <input type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div>
            <label className="m-3 p-1"> Height </label>
            <input type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div>
            <label className="m-3 p-1"> Width </label>
            <input type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div>
            <label className="m-3 p-1"> Depth </label>
            <input type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div>
            <label className="m-3 p-1"> Location </label>
            <input type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div>
            <label className="m-3 p-1"> Exhibit </label>
            <input type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <button className="btn-green justify-self-end self-end">Apply Filters</button>
        </div>
        <div className="flex mx-12 flex-wrap">
          {Art.map(art => {
            return (
              <div key={art.id}>
                <ArtCard art={art} showModal={showModal} />
              </div>
            )
          })}
        </div>
      </div>
      {modalArt && 
        <div id='modal' className='absolute w-screen h-screen top-0 right-0 bg-black/80'>
          {/*centered div*/}
          <div className='absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-4 border border-black rounded-lg'>
            <Image src={modalArt.imageUrl} width={200} height={200} alt={modalArt.title} className='float-right top-0 border border-black' />
            <h1 className='font-bold text-2xl'>{modalArt.title}</h1>
            <div>Catalog # {modalArt.catalogNum}</div>
            <div>Artist: {modalArtist?.firstName + ' ' + modalArtist?.lastName}</div>
            <div>{modalArt.description}</div>
            <div>{}</div>
            <div>{modalArt.medium}</div>
            <div id='buttons' className="fixed right-3 bottom-3">
              <button className="btn-green" onClick={() => router.push(`/sales/${modalArt.id}`)}>Add Sale</button>
              <button className="btn-green mx-4" onClick={() => router.push(`/art/${modalArt.id}`)}>Update</button>
              <button className="btn-gray" onClick={hideModal}>Close</button>
            </div>
          </div>
        </div>
      }
    </main>
  )
}