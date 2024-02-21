import { Entity, Fields } from "remult"

@Entity("Exhibits", {
  allowApiCrud: true
})

export class Exhibit {
    @Fields.autoIncrement()
    id!:number

    @Fields.string()
    name? = ""

    @Fields.string()
    location? = ""

    @Fields.dateOnly()
    startDate = new Date

    @Fields.dateOnly()
    endDate = new Date

    @Fields.json()
    artIds = [] as number []
}