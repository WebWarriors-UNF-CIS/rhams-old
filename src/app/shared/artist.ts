import { Entity, Fields } from "remult"

@Entity("artist", {
  allowApiCrud: true
})
export class Artist {
  
  @Fields.autoIncrement()
  id = 0

  @Fields.string()
  firstName?: string

  @Fields.string()
  lastName?: string

  @Fields.string()
  dob?: Date

  @Fields.string()
  dod: Date | null = null
  
  @Fields.string()
  nationality?: string

  // Make a Type table, change to primaryTypeId
  @Fields.object()
  primaryType?: Type

  @Fields.string()
  imageString?: string

  @Fields.string()
  website?: string

  @Fields.string()
  biography?: string

  @Fields.json()
  knownExhibits: number[] = []

  @Fields.string()
  notes?: string
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