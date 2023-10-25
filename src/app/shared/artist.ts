import { Entity, Fields } from "remult"

@Entity("artist", {
  allowApiCrud: true
})
export class Artist {
  
  @Fields.string()
  firstName: string

  @Fields.string()
  lastName: string

  @Fields.string()
  dob: string

  @Fields.string()
  dod: string | null = null
  
  @Fields.string()
  nationality?: string

  // Make a Mediums table, change to primaryMediumTypeId
  @Fields.object()
  primaryMedium: MediumType

  @Fields.string()
  website?: string

  @Fields.string()
  biography?: string

  @Fields.string()
  notes?: string

  constructor(
    firstName: string,
    lastName: string,
    dob: string,
    primaryMedium: MediumType,
    dod?: string | null,
    nationality?: string,
    website?: string,
    biography?: string,
    notes?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    if(dod || dod === null)
      this.dod = dod;
    this.nationality = nationality;
    this.primaryMedium = primaryMedium;
    this.website = website;
    this.biography = biography;
    this.notes = notes;
  }
}

export enum MediumType {
  Painting,
  Sculpture,
  Photography,
  Drawing,
  Printmaking,
  MixedMedia,
  Other
}