"use client"
import { useEffect, useState } from "react"
import { remult } from "remult"
import { ArtPiece } from "../shared/art"

const artRepo = remult.repo(ArtPiece)

export default function Todo() {
  const [Art, setArts] = useState<ArtPiece[]>([])

  useEffect(() => {
    artRepo.find().then(setArts)
  }, [])
  return (
    <div>
      <h1>All Art</h1>
      <main>
        {Art.map((artWork) => {
          return (
            <div key={artWork.catalogNum}>
              {artWork.title}
            </div>
          )
        })}
      </main>
    </div>
  )
}