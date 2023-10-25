import { Entity, Fields } from "remult"

@Entity("Exhibit", {
  allowApiCrud: true
})
export class Exhibit {
    @Fields.cuid()
    id = ""

    @Fields.json()
    artIds = []

    @Fields.string()
    startDate = ""

    @Fields.string()
    endDate = ""

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