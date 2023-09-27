import { Entity, Fields } from 'remult';

@Entity('user', {
  allowApiCrud: true
})
export class User {
    @Fields.string()
    name = ''
    
    @Fields.string()
    email = ''
    
    @Fields.string()
    password = ''

    @Fields.string()
    role: 'admin' | 'user' = 'admin' // default is admin for V1, since those will be the only users
}
