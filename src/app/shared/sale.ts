import { Entity, Fields } from "remult";

@Entity("Sale", {
  allowApiCrud: true
})
export class Sale {
    @Fields.cuid()
    id: string = "";

    @Fields.string()
    artId: string = "";

    @Fields.string()
    price: string = "";

    @Fields.string()
    date: string = "";

    @Fields.string()
    buyer: string = "";

    @Fields.string()
    location: string = "";

    @Fields.string()
    notes: string = "";
}