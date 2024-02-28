import { Entity, Fields, Relations } from "remult"
import { ArtPiece } from "./art"

@Entity("exhibits", {
  allowApiCrud: true
})
export class Exhibit {
    @Fields.autoIncrement()
    id!:number

    @Fields.string()
    name?: string = ""

    @Fields.string()
    location?: string = ""

    @Fields.dateOnly()
    startDate?: Date 

    @Fields.dateOnly()
    endDate?: Date
    
    @Relations.toMany(() => ArtPiece, {
      field: "id",
      defaultIncluded: true
    })
    artPieces?: ArtPiece[]
}