import { Entity, Fields } from "remult"

@Entity("collection", {
  allowApiCrud: true
})

export class Collection {
  @Fields.autoIncrement()
  id!:number

//connect to artist table
//connect to art table

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

