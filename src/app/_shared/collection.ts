import { Entity, Fields, Relations } from "remult"
import { ArtPiece } from "./art"

@Entity("collections", {
  allowApiCrud: true
})
export class Collection {
  @Fields.autoIncrement()
  id!:number

  @Relations.toMany(() => ArtPiece, { defaultIncluded: true, field: "id"})
  artPieces?: ArtPiece[]
  // add a date for each collection

  @Fields.string()
  title?: string = ""

  @Fields.string()
  location?: string = ""

  @Fields.string()
  owner?: string = ""

  @Fields.string()
  notes? = ""
}

