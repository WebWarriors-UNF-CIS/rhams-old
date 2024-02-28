import { Entity, Fields } from "remult"

@Entity("medialinks", {
  allowApiCrud: true
})
export class Media {
  @Fields.autoIncrement()
  id!: number

  @Fields.string()
  title?: string = ""

  @Fields.string()
  location?: string = ""
  /* do they need this or do they just want to link it to the related collection/art/exhibit/artist?
  @Fields.number()
  relatedId?: number

  @Fields.string()
  relatedType?: string
  */
  @Fields.string()
  author?: string = ""

  @Fields.dateOnly()
  datePublished?: Date

  @Fields.string()
  mediaType = MediaType.Other

  @Fields.string() //why?
  imageString?: string = ""

  @Fields.string()
  srcUrl?: string = ""

  @Fields.string()
  videoString?: string = ""

  @Fields.string()
  notes?: string = ""
}

// Ask Client about types of media
export enum MediaType {
  Book = "Book",
  Article = "Article",
  Video = "Video",
  Audio = "Audio",
  Other = "Other"
}