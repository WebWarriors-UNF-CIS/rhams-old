import { remultNextApp } from 'remult/remult-next'
import { ArtPiece } from '../../shared/art'
import { User } from '../../shared/user'
import { Artist } from '../../shared/artist'

const api = remultNextApp({
    entities: [ArtPiece, User, Artist]
})

export const { POST, PUT, DELETE, GET } = api