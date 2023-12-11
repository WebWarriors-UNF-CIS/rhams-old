import { remultNextApp } from 'remult/remult-next'
import { ArtPiece } from '../../shared/art'
import { User } from '../../shared/user'
import { Artist } from '../../shared/artist'
import { Exhibit } from '../../shared/exhibit'
import { getUserOnServer } from '../auth/[...nextauth]/route'

const api = remultNextApp({
    entities: [ArtPiece, User, Artist, Exhibit],
    getUser: getUserOnServer
})

export const { POST, PUT, DELETE, GET } = api