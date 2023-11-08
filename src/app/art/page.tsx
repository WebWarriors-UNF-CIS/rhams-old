"use client"
import { useEffect, useState } from "react"
import { remult } from "remult"
import { ArtPiece } from "../shared/art"
import { Select } from "../components/filter"

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
    <div className='dark:text-white'>
      <h1 className="dark:text-white">All Art</h1>
      <Select options={options} value={value} onChange={o => setValue(o)} />
      <main>
        {Art.map((artWork) => {
          return (
            <div className='dark:text-white' key={artWork.catalogNum}>
              {artWork.title}
            </div>
          )
        })}
      </main>
    </div>
  )
}