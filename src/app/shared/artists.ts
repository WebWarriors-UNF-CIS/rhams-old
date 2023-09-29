import { Entity, Fields } from "remult"

@Entity("art", {
  allowApiCrud: true
})
export class Artists {
  
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
  biography = ""

  @Fields.string()
  website = ""

  @Fields.string()
  artistNotes = ""
}