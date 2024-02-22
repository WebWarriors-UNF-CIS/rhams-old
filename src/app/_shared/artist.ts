import { Entity, Fields, Relations } from "remult"
import { Exhibit } from "./exhibit"
import { ArtPiece } from "./art"

@Entity("Artists", {
  allowApiCrud: true
})

export class Artist {
  @Fields.autoIncrement()
  id!:number

  @Fields.string()
  firstName? = ""

  @Fields.string()
  lastName? = ""

  @Fields.dateOnly()
  dob = new Date

  @Fields.dateOnly()
  dod = new Date
  
  @Fields.string()
  nationality? = ""

  @Fields.object()
  primaryType?: Type

  @Fields.string()
  imageString? = ""

  @Fields.string()
  website? = ""

  @Fields.string()
  biography? = ""

  @Fields.json()
  exhibitIds?: number[]
  @Relations.toMany(() => Exhibit, "id")
  exhibits?: Exhibit[]

  @Relations.toMany(() => ArtPiece, {
    field: "id",
    defaultIncluded: true,
  })
  artworks?: ArtPiece[]

  @Fields.string()
  notes? = ""
}

export enum Type {
  Painting,
  Sculpture,
  Photography,
  Drawing,
  Printmaking,
  MixedMedia,
  Furniture,
  Other
}