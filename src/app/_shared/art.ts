import { Entity, Fields, Relations } from "remult"
import { Artist, Type } from "./artist"
import { Sale } from "./sale"
import { Exhibit } from "./exhibit"

@Entity("artworks", {
  allowApiCrud: true
})
export class ArtPiece {
  @Fields.autoIncrement()
  id = 0

  @Fields.integer()
  catalogNum?: number

  @Fields.string()
  title = ""

  @Relations.toOne(() => Artist, { defaultIncluded: true})
  artist?: Artist

  @Fields.string()
  aquired?: Date

  // will only be a year
  @Fields.string()
  created?: Date
  
  @Fields.string()
  description = ""

  // Do they want multiple Images?
  // HEY add another table... ArtImages... with ArtId, ImageUrl, and maybe a caption
  // What about videos?
  @Fields.string()
  imageUrl = ""

  @Fields.json()
  saleIds?: number[]
  @Relations.toMany(() => Sale, {
    defaultIncluded: true
  })
  sales?: Sale[]

  @Relations.toMany(() => Exhibit, {
    field: "id",
    defaultIncluded: true
  })
  exhibits?: Exhibit[]

  @Fields.object()
  type = Type.Other

  @Fields.string()
  medium = ""

  // What about weight?
  @Fields.string()
  height = ""

  @Fields.string()
  width = ""

  @Fields.string()
  depth?: string

  // How detailed do they want or need this to be?
  @Fields.string()
  location = ""
}