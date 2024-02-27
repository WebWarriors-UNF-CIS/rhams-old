import { Entity, Fields } from "remult"

@Entity("medialinks", {
  allowApiCrud: true
})
export class Media {
  @Fields.autoIncrement()
  id!: number

  @Fields.string()
  title? = ""

  @Fields.string()
  location? = ""
  /* do they need this or do they just want to link it to the related collection/art/exhibit/artist?
  @Fields.number()
  relatedId?: number

  @Fields.string()
  relatedType?: string
  */
  @Fields.string()
  author? = ""

  @Fields.dateOnly()
  datePublished = new Date

  @Fields.string()
  mediaType = MediaType.Other

  @Fields.string() //why?
  imageString? = ""

  @Fields.string()
  srcUrl? = ""

  @Fields.string()
  videoString? = ""

  @Fields.string()
  notes? = ""
}

// Ask Client about types of media
export enum MediaType {
  Book = "Book",
  Article = "Article",
  Video = "Video",
  Audio = "Audio",
  Other = "Other"
}