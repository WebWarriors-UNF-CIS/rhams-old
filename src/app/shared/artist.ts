import { Entity, Entity, Fields } from "remult"

@Entity("artist", {
  allowApiCrud: true
})
export class Artist {
  
  @Fields.string()
  firstName = ""

  @Fields.string()
  lastName = ""

  // Split into Birth Year and Death Year (nullable)
  // For now go with numbers, see if they want date pickers and all that jazz
  @Fields.string()
  datesLived = ""
  
  @Fields.string()
  nationality = ""

  // Make a Mediums table, change to primaryMediumTypeId
  @Fields.string()
  primaryMedium = ""

  @Fields.string()
  website = ""

  @Fields.string()
  biography = ""

  @Fields.string()
  artistNotes = ""
}