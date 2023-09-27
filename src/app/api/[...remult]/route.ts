import { remultNextApp } from 'remult/remult-next'
import { ArtPiece } from '../../shared/art'
import { User } from '../../shared/user'

const api = remultNextApp({
    entities: [ArtPiece, User],
    initApi: async (api) => {
        const userRepo = api.repo(User)
        await userRepo.insert({
            name: 'John Doe',
            email: 'john@mail.com',
            password: '1234',
        });
        console.log('User inserted');
    }
})

export const { POST, PUT, DELETE, GET } = api