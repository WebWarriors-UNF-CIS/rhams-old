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
  const [artists, setArtists] = useState<Artist[]>([]);
  const [modalArt, setModalArt] = useState<ArtPiece>();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [aquired, setAquired] = useState('');
  const [created, setCreated] = useState('');
  const [type, setType] = useState('none');
  const [medium, setMedium] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [location, setLocation] = useState('');
  const [exhibit, setExhibit] = useState('');
  const filters = [ 'Title', 'Aquired', 'Created', 'Medium', 'Height', 'Width', 'Depth', 'Location', 'Exhibit' ]

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

  async function filterChanged(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) {
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

  async function showModal(id: number) { setModalArt(Art.find(art => art.id === id)); }
  
  function hideModal() { setModalArt(undefined) }

  useEffect(() => {
    artRepo.find({ where: {
      title: { $contains:title },
      aquired: { $contains:aquired },
      created: { $contains:created },
      type: { $contains:type },
      medium: { $contains:medium },
      height: { $contains:height },
      width: { $contains:width },
      depth: { $contains:depth },
      location: { $contains:location },
      //exhibit: { $contains:exhibit
    }}).then(setArts);
    artistRepo.find({}).then(setArtists);
  }, [title, medium, location, type, height, width, depth, artist])
  
  return (
    <main className='dark:text-white mt-2'>
      <button className="relative p-1 px-2 m-3 btn-gray ml-4" onClick={toggleFilters}> Filters </button>
      <Link href="/art/create" className="absolute my-3 right-4"><button className="btn-green">Add Art</button></Link>
      <div className="max-sm:hidden absolute float-left ml-4 mr-3 mt-2 border-[3px] border-black dark:border-slate-400 rounded-lg">
        {Object.values(Type).filter(value => isNaN(Number(value))).map((type) => (
          <div className="cursor-pointer text-center m-1 p-2 text-lg hover:bg-slate-200 dark:hover:bg-slate-700 border-y border-black dark:border-slate-400 first:!mt-0 first:border-0 first:border-b" onClick={() => typeFilter(type as string)} key={type}> {type} </div>
        ))}
        <div className="cursor-pointer text-center m-1 mb-0 p-2 text-lg hover:bg-slate-200 dark:hover:bg-slate-700 border-t border-black dark:border-slate-400" onClick={() => typeFilter('')}> All </div>
      </div>
      <div className="grid-cols-2 max-w-[880px] my-2 sm:ml-[170px] p-2 max-sm:mx-4 sm:w-2/3 max-sm:max-h-52 md:grid-cols-3 xl:grid-cols-4 gap-x-2 max-sm:overflow-y-scroll bg-slate-100 dark:bg-slate-800 border border-slate-400 dark:border-slate-600 hidden rounded-lg" id="filters">
        <div>
          <label htmlFor="artist" className="m-3 p-1"> Artist </label>
          <input
            name="artist"
            id="artist"
            list="artists"
            type="text"
            onChange={filterChanged}
            className="shadow border rounded w-full py-[0.46rem] px-3 text-gray-700 dark:text-white dark:bg-slate-600 dark:border-slate-500 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        {filters.map(filter => (
          <div>
            <label htmlFor={filter.toLowerCase()} className="m-3 p-1"> {filter} </label>
            <input
              type="text"
              name={filter.toLowerCase()}
              onChange={filterChanged}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-slate-600 dark:border-slate-500 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
        ))}
        <div>
          <label htmlFor="exhibit" className="m-3 p-1"> Exhibit </label>
          <input
            type="text"
            name="exhibit"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-slate-600 dark:border-slate-500 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
      </div>
      <div className="flex flex-wrap max-sm:justify-center sm:ml-40">
        {Art.map(art => { return <ArtCard key={art.id} art={art} showModal={showModal}/> })}
      </div>
      {modalArt && 
        <div id='modal' className='fixed w-screen h-screen top-0 right-0 bg-black/80'>
          <div tabIndex={-1} onBlur={hideModal} className='absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-4 border border-black rounded-lg focus-visible:outline-none'>
            { modalArt.imageUrl && <Image src={modalArt.imageUrl} width={200} height={200} alt={modalArt.title} className='float-right top-0 border border-black' />}
            <h1 className='font-medium text-3xl'>{modalArt.title}</h1>
            { modalArt.artist && <div className="text-lg pb-2">Artist: {modalArt.artist.name}</div>}
            <div>{Object.values(modalArt.type)}</div>
            <div>{modalArt.medium}</div>
            <div>Height: {modalArt.height}</div>
            <div>Width: {modalArt.width}</div>
            <div>Depth: {modalArt.depth}</div>
            <div>Catalog # {modalArt.catalogNum}</div>
            <div>Location: {modalArt.location}</div>
            {modalArt.exhibits && 
              modalArt.exhibits.map(exhibit => ( <Link href={`/exhibitions/${exhibit.id}`} key={exhibit.id}>{exhibit.name}</Link> ))
            }
            {modalArt.created && <div>Created: {modalArt.created}</div>}
            {modalArt.aquired && <div>Aquired: {modalArt.aquired}</div>}
            {modalArt.sales && <div>Sales: {modalArt.sales.length}</div>}
            <div>{modalArt.description}</div>
            <div id='buttons' className="fixed right-3 bottom-3">
              <button className="btn-green" onClick={() => router.push(`/sales/${modalArt.id}`)}>Add Sale</button>
              <button className="btn-green mx-4" onClick={() => router.push(`/art/${modalArt.id}`)}>Update</button>
              <button className="btn-gray" onClick={hideModal}>Close</button>
            </div>
          </div>
        </div>
      }
      <datalist id="artists">
        <option value={undefined}>Select</option>
        {artists.map(artist => (
          <option value={artist.name} key={artist.id}></option>
        ))}
        <option value={'Unknown'}>Unknown</option>
      </datalist>
    </main>
  )
}