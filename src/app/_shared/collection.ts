import { Entity, Fields } from "remult"

@Entity("Collections", {
  allowApiCrud: true
})

export class Collection {
  @Fields.autoIncrement()
  id!:number

  @Fields.object()
  artIds = [] as number[]

  @Fields.string()
  title? = ""

  @Fields.string()
  location? = ""

  @Fields.string()
  owner? = ""

  @Fields.dateOnly()
  dateAcquired = new Date

  @Fields.string()
  notes? = ""
}

