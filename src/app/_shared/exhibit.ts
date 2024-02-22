import { Entity, Fields, Relations } from "remult"
import { ArtPiece } from "./art"

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
    
    @Relations.toMany(() => ArtPiece, "id")
    artPieces?: ArtPiece[]
}