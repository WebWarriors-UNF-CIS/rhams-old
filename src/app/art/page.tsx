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
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [aquired, setAquired] = useState('');
  const [created, setCreated] = useState('');
  const [type, setType] = useState('');
  const [medium, setMedium] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [location, setLocation] = useState('');
  const [exhibit, setExhibit] = useState('');

  function toggleFilters() {
    let filters = document.getElementById("filters");
    filters?.classList.toggle("hidden");
    filters?.classList.toggle("grid");
  }
  
  // original format: weekday mmm yyyy dd hh:mm:ss GMT-0000 (Coordinated Universal Time)
  // new format: yyyy
  function convertDate(date: Date) { return date.toString().split(' ')[3] }

  async function typeFilter(filter: string) {
    setTitle('');     setArtist('');    setAquired('');   setCreated('');
    setType(filter);  setMedium('');    setHeight('');    setWidth('');
    setDepth('');     setLocation('');  setExhibit('');   
    await artRepo.find({ where: { type: { $contains:filter } } }).then(setArts);
  }

  async function filterChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    switch (name) {
      case 'title': setTitle(value); break;
      case 'artist': setArtist(value); break;
      case 'aquired': setAquired(value); break;
      case 'created': setCreated(value); break;
      case 'medium': setMedium(value); break;
      case 'height': setHeight(value); break;
      case 'width': setWidth(value); break;
      case 'depth': setDepth(value); break;
      case 'location': setLocation(value); break;
      case 'exhibit': setExhibit(value); break;
    }
  }

  async function showModal(id: number) { setModalArt(Art.find(art => art.id === id)) }
  
  function hideModal() { setModalArt(undefined) }

  useEffect(() => {
    artRepo.find({ where: {
      title: { $contains:title },
      //aquired: { $contains:aquired },
      //created: { $contains:created },
      type: { $contains:type },
      medium: { $contains:medium },
      height: { $contains:height },
      width: { $contains:width },
      depth: { $contains:depth },
      location: { $contains:location },
      //exhibit: { $contains:exhibit
    }}).then(setArts);
  }, [title, medium, location, type, height, width, depth])
  
  return (
    <main className='dark:text-white mt-2'>
      <button className="relative p-1 px-2 m-2 btn-gray ml-4" onClick={toggleFilters}> Filters </button>
      <Link href="/art/create" className="absolute my-2 right-5"><button className="btn-green">New Art</button></Link>
      <div className="max-sm:hidden absolute float-left ml-4 mr-3 mt-2 border-[3px] border-black dark:border-slate-400 rounded-lg">
        {Object.values(Type).filter(value => isNaN(Number(value))).map((type) => (
          <div className="cursor-pointer text-center m-1 p-2 text-lg hover:bg-slate-200 border-y border-black dark:border-slate-400 first:!mt-0 first:border-0 first:border-b" onClick={() => typeFilter(type as string)} key={type}> {type} </div>
        ))}
        <div className="cursor-pointer text-center m-1 mb-0 p-2 text-lg hover:bg-slate-200 border-t border-black dark:border-slate-400" onClick={() => typeFilter('')}> All </div>
      </div>
      <div className="grid-cols-2 my-2 sm:ml-[170px] p-2 max-sm:mx-4 sm:w-2/3 md:w-3/4 max-sm:max-h-52 md:grid-cols-3 gap-x-2 max-sm:overflow-y-scroll bg-slate-100 dark:bg-slate-800 border border-slate-400 dark:border-slate-600 hidden rounded-lg" id="filters">
        <div>
          <label htmlFor="title" className="m-3 p-1"> Title </label>
          <input
          type="text"
          name="title"
          onChange={filterChanged}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        {/*<div>
          <label htmlFor="artist" className="m-3 p-1"> Artist </label>
          <input
          type="text"
          name="artist"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>{/*should be a drop-down menu of artists/}
        </div>*/}
        <div>
          <label htmlFor="aquired" className="m-3 p-1"> Aquired </label>
          <input
          type="date"
          name="aquired"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div>
          <label htmlFor="created" className="m-3 p-1"> Created </label>
          <input
          type="date"
          name="created"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div>
          <label htmlFor="medium" className="m-3 p-1"> Medium </label>
          <input
          type="text"
          name="medium"
          onChange={filterChanged}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div>
          <label htmlFor="height" className="m-3 p-1"> Height </label>
          <input
          type="text"
          name="height"
          onChange={filterChanged}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div>
          <label htmlFor="width" className="m-3 p-1"> Width </label>
          <input
          type="text"
          name="width"
          onChange={filterChanged}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div>
          <label htmlFor="depth" className="m-3 p-1"> Depth </label>
          <input
          type="text"
          name="depth"
          onChange={filterChanged}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div>
          <label htmlFor="location" className="m-3 p-1"> Location </label>
          <input
          type="text"
          name="location"
          onChange={filterChanged}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div>
          <label htmlFor="exhibit" className="m-3 p-1"> Exhibit </label>
          <input
          type="text"
          name="exhibit"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
      </div>
      <div className="flex flex-wrap max-sm:justify-center sm:ml-40">
        {Art.map(art => {
          return (
            <div key={art.id}>
              <ArtCard art={art} showModal={showModal}/>
            </div>
          )
        })}
      </div>
      {modalArt && 
        <div id='modal' className='fixed w-screen h-screen top-0 right-0 bg-black/80'>
          <div tabIndex={-1} onBlur={hideModal} className='absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-4 border border-black rounded-lg focus-visible:outline-none'>
            <Image src={modalArt.imageUrl} width={200} height={200} alt={modalArt.title} className='float-right top-0 border border-black' />
            <h1 className='font-bold text-2xl'>{modalArt.title}</h1>
            <div>Catalog # {modalArt.catalogNum}</div>
            <div>Artist: {modalArt.artist?.firstName + ' ' + modalArt.artist?.lastName}</div>
            <div>{Object.values(modalArt.type)}</div>
            <div>{modalArt.medium}</div>
            <div>Height: {modalArt.height}</div>
            <div>Width: {modalArt.width}</div>
            <div>Depth: {modalArt.depth}</div>
            <div>Location: {modalArt.location}</div>
            <div>{modalArt.description}</div>
            {modalArt.aquired && <div>Aquired: {convertDate(modalArt.aquired)}</div>}
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