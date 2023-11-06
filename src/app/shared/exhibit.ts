import { Entity, Fields } from "remult"

@Entity("Exhibit", {
  allowApiCrud: true
})
export class Exhibit {
    @Fields.cuid()
    id = ""

    @Fields.json()
    artIds = []

    @Fields.json()
    otherArtists = []

    @Fields.string()
    startDate = Date

    @Fields.string()
    endDate = Date

    @Fields.string()
    contactName = ""

    @Fields.string()
    contactEmail = ""

    @Fields.string()
    contactPhone = ""

    @Fields.string()
    location = ""

    @Fields.string()
    notes = ""
}