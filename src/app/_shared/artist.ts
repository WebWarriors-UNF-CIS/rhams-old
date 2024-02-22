import { Entity, Fields, Relations } from "remult"
import { Exhibit } from "./exhibit"

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

  // Make a Type table, change to primaryTypeId
  @Fields.object()
  primaryType?: Type

  @Fields.string()
  imageString? = ""

  @Fields.string()
  website? = ""

  @Fields.string()
  biography? = ""

  @Relations.toMany(() => Exhibit)
  exhibits?: Exhibit[]

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