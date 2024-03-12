import { Entity, Fields, Relations } from "remult"
import { Exhibit } from "./exhibit"
import { ArtPiece } from "./art"

@Entity("artists", {
  allowApiCrud: true
})
export class Artist {
  @Fields.autoIncrement()
  id!:number

  @Fields.string()
  name?: string = ""

  @Fields.dateOnly()
  dob?: Date

  @Fields.dateOnly()
  dod?: Date

  @Fields.string()
  imageString?: string = ""

  @Fields.string()
  website?: string = ""

  @Fields.string()
  biography?: string = ""

  @Relations.toMany(() => Exhibit, "id")
  exhibits?: Exhibit[]

  @Relations.toMany(() => ArtPiece, {
    field: "id",
    defaultIncluded: true,
  })
  artworks?: ArtPiece[]

  @Fields.string()
  notes?: string = ""
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