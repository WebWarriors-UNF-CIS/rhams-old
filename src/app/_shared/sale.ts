import { Entity, Fields } from "remult";

@Entity("Sales", {
  allowApiCrud: true
})
export class Sale {
    @Fields.autoIncrement()
    id = 0;

    @Fields.number()
    artId!: number;
    // will there be multiple art pieces in a sale?

    @Fields.string()
    price: string = "";

    @Fields.string()
    date: string = "";

    @Fields.string()
    foundry: string = ""; // what is this?

    @Fields.string()
    buyer: string = ""; // does she want to store more information about the buyer? or just the name?

    @Fields.string()
    location: string = "";

    // rights given to the buyer
    @Fields.string()
    rights?: string = "";

    @Fields.string()
    notes: string = "";
}