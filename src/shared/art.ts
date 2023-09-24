import { Entity, Fields } from "remult"

@Entity("art", {
  allowApiCrud: true
})
export class Art {
  @Fields.cuid()
  id = ""

  @Fields.string()
  title = ""

  @Fields.boolean()
  completed = false

  @Fields.createdAt()
  createdAt?: Date
}