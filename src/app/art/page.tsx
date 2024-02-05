"use client"
import { useEffect, useState } from "react"
import { remult } from "remult"
import { ArtPiece } from "../_shared/art"
import Link from "next/link"
import ArtCard from "../_components/card-art"
import { Type } from "../_shared/artist"
import { useRouter } from "next/navigation"

const artRepo = remult.repo(ArtPiece)

export default function ManageArt() {
  const [Art, setArts] = useState<ArtPiece[]>([])
  const router = useRouter();

  function toggleFilters() {
    let filters = document.getElementById("filters");
    filters?.classList.toggle("hidden");
    filters?.classList.toggle("grid");
  }
  
  useEffect(() => {
    artRepo.find().then(setArts)
  }, [])

  return (
    <main className='dark:text-white mt-2'>
      <button onClick={() => router.push("/art/create")} className="fixed btn-green h-fit self-end right-5 top-24">New Art</button>
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
                <ArtCard art={art} />
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}