import { Entity, Fields } from 'remult';

@Entity("users", {
  allowApiCrud: true
})
export class User {

    @Fields.autoIncrement()
    id!:number 
    //id = 0
    
    @Fields.string()
    name?: string
    
    @Fields.string()
    email?: string
    
    @Fields.string()
    password?: string

    @Fields.object()
    //roles? = [Role.Admin] 
    roles?: Role[] = [Role.Admin]
    // default is admin for V1, since those will be the only users
    // we assign it as Role.Admin, but it is stored as 0, to make the roles anonymous. It also saves space in the database.
}

export enum Role {
  Admin = "administrator", 
  Student = "student",
  Teacher = "teacher",
  Volunteer = "volunteer",
}