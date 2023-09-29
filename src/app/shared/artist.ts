import { Entity, Fields } from "remult"

@Entity("artist", {
  allowApiCrud: true
})
export class Artist {
  
  @Fields.string()
  firstName = ""

  @Fields.string()
  lastName = ""

  @Fields.string()
  datesLived = ""
  
  @Fields.string()
  nationality = ""

  @Fields.string()
  primaryMedium = ""

  @Fields.string()
  website = ""

  @Fields.string()
  biography = ""

  @Fields.string()
  artistNotes = ""
}