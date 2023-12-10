"use client"
import { useEffect, useState } from "react"
import { remult } from "remult"
import { ArtPiece } from "../shared/art"
import Link from "next/link"
import ArtCard from "../components/artCard"

const artRepo = remult.repo(ArtPiece)

export default function ManageArtists() {
  const [Art, setArts] = useState<ArtPiece[]>([])

  useEffect(() => {
    artRepo.find().then(setArts)
  }, [])
  return (
    <main className='dark:text-white'>
      <Link href="/art/create" className="fixed btn-gray h-fit self-end right-5 top-24 text-white text-center font-semibold px-4 py-2 rounded-lg shadow-slate-900 shadow-[0_1px_2px_1px_rgba(0,0,0,0.25)]">New Art</Link>
      <div className="float-left ml-6 flex flex-col w-40 border-2 border-black rounded-xl">
        <div className="text-center p-4"> Painting </div>
        <div className="text-center p-4 border-y border-t-2 border-black"> Sculpture </div>
        <div className="text-center p-4 border-y border-black"> Photography </div>
        <div className="text-center p-4 border-y border-black"> Drawing </div>
        <div className="text-center p-4 border-y border-black"> Print </div>
        <div className="text-center p-4 border-y border-black"> Furniture </div>
        <div className="text-center p-4 border-y border-black border-b-2"> Hologram </div>
        <div className="text-center p-4"> Other </div>
      </div>
      <div>
        <div className="m-3 p-1"> filters </div>
        <div className="flex mx-12">
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