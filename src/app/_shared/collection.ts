import { Entity, Fields, Relations } from "remult"
import { ArtPiece } from "./art"

@Entity("Collections", {
  allowApiCrud: true
})

export class Collection {
  @Fields.autoIncrement()
  id!:number

  @Relations.toMany(() => ArtPiece)
  artPieces?: ArtPiece[]

  @Fields.string()
  title? = ""

  @Fields.string()
  location? = ""

  @Fields.string()
  owner? = ""

  @Fields.dateOnly()
  dateAcquired = new Date

  @Fields.string()
  notes? = ""
}

