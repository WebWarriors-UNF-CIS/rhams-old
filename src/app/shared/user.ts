import { Entity, Fields } from 'remult';

@Entity("User", {
  allowApiCrud: true
})
export class User {

    @Fields.autoIncrement()
    id!:number 
    //id = 0
    
    @Fields.string()
    name = ""
    
    @Fields.string()
    email = ""
    
    @Fields.string()
    password = ""

    @Fields.object()
    roles = [Role.Admin] // default is admin for V1, since those will be the only users
    // we assign it as Role.Admin, but it is stored as 0, to make the roles anonymous. It also saves space in the database.
}

export enum Role {
  Admin, // = 0
  Student, // = 1
  Teacher,
  Volunteer
}