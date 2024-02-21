import { Entity, Fields } from "remult"

@Entity("Medias", {
  allowApiCrud: true
})

export class Media {
  @Fields.autoIncrement()
  id!:number

//connect to artist table

  @Fields.string()
  title? = ""

  @Fields.string()
  location? = ""
  // do they need this or do they just want to link it to the related collection/art/exhibit?

  @Fields.string()
  author? = ""

  @Fields.dateOnly()
  datePublished = new Date

  // Make a Type table, change to mediaTypeId
  @Fields.string()
  mediaType? = ""

  @Fields.string()
  imageString? = ""

  @Fields.string()
  website? = ""

  @Fields.string()
  videoString? = ""


  @Fields.string()
  notes? = ""
}

