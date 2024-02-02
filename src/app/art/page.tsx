"use client"
import { useEffect, useState } from "react"
import { remult } from "remult"
import { ArtPiece } from "../shared/art"
import Link from "next/link"
import ArtCard from "../_components/card-art"
import { Type } from "../shared/artist"

const artRepo = remult.repo(ArtPiece)

export default function ManageArt() {
  const [Art, setArts] = useState<ArtPiece[]>([])

  function toggleFilters() {
    let filters = document.getElementById("filters");
    if (filters!.style.display === "none")
      filters!.style.display = "flex";
    else
      filters!.style.display = "none";
  }
  
  useEffect(() => {
    artRepo.find().then(setArts)
  }, [])

  return (
    <main className='dark:text-white mt-2'>
      <Link href="/art/create" className="fixed btn-green h-fit self-end right-5 top-24 text-white text-center font-semibold px-4 py-2 rounded-lg shadow-slate-900 shadow-[0_1px_2px_1px_rgba(0,0,0,0.25)]">New Art</Link>
      <div className="float-left ml-6 mt-12 border-2 border-black rounded-xl">
        {Object.values(Type).filter(value => isNaN(Number(value))).map((type) => (
          <div className="text-center p-4 border-y border-black first:border-0 first:border-b last:border-0 last:border-t" key={type}> {type} </div>
        ))}
      </div>
      <div>
        <button className="p-1 px-2 btn-gray ml-4" onClick={toggleFilters}> Filters </button>
        <div className="relative flex-wrap w-3/4 m-2 left-4 hidden border border-black rounded-2xl" id="filters">
          <div>
            <label className="m-3 p-1"> Catalog # </label>
            <input/>
          </div>
          <div>
            <label className="m-3 p-1"> Title </label>
            <input/>
          </div>
          <div>
            <label className="m-3 p-1"> Artist </label>
            <input/>
          </div>
          <div>
            <label className="m-3 p-1"> Aquired </label>
            <input/>
          </div>
          <div>
            <label className="m-3 p-1"> Created </label>
            <input/>
          </div>
          <div>
            <label className="m-3 p-1"> Medium </label>
            <input/>
          </div>
          <div>
            <label className="m-3 p-1"> Height </label>
            <input/>
          </div>
          <div>
            <label className="m-3 p-1"> Width </label>
            <input/>
          </div>
          <div>
            <label className="m-3 p-1"> Depth </label>
            <input/>
          </div>
          <div>
            <label className="m-3 p-1"> Location </label>
            <input className="m-3 p-1"/>
          </div>
          <div>
            <label className="m-3 p-1"> Exhibit </label>
            <input className="m-3 p-1"/>
          </div>
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