import { Entity, Fields } from "remult"
import { Type } from "./artist"

@Entity("artPiece", {
  allowApiCrud: true
})
export class ArtPiece {
  @Fields.autoIncrement()
  id = 0

  @Fields.integer()
  catalogNum = ""

  @Fields.string()
  title = ""

  @Fields.number()
  artistId?: number

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
  salesIds = []

  @Fields.object()
  type = Type

  // TODO: Follow after MediumTypes table is created
  @Fields.string()
  medium = ""

  // Dimensions... might want to break this into multiple fields
  // What about weight?
  // Keep these columns on this table
  @Fields.string()
  height = ""

  @Fields.string()
  width = ""

  @Fields.string()
  depth?: string

  // What do they want here? This is about Exhibitions. 
  // How detailed do they want or need this to be?
  // Do they want to track Exhibitions and Locations?
  @Fields.string()
  location = ""
}