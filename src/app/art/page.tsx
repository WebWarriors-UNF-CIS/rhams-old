"use client"
import { useEffect, useState } from "react"
import { remult } from "remult"
import { ArtPiece } from "../shared/art"
import { Select } from "../components/filter"
import Link from "next/link"

const artRepo = remult.repo(ArtPiece)
const options = [
  { label: "Title", value: "title" },
  { label: "Artist", value: "artist" },
  { label: "Is Sold", value: "isSold" },
  { label: "Medium", value: "paint" },
]

export default function Todo() {
  const [Art, setArts] = useState<ArtPiece[]>([])
  const [value, setValue] = useState<typeof options[0] | undefined>(options[0]) /*state variable can either be an option or an undefined*/

  useEffect(() => {
    artRepo.find().then(setArts)
  }, [])
  return (
    <main className='dark:text-white'>
      <Link href="/art/create" className="absolute right-6 top-20">New Art</Link>
      <Select options={options} value={value} onChange={o => setValue(o)} />
      {Art.map((artWork) => {
        return (
          <div key={artWork.catalogNum}>
            {artWork.title}
          </div>
        )
      })}
    </main>
  )
}