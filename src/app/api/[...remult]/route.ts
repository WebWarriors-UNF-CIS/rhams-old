import { remultNextApp } from 'remult/remult-next'
import { ArtPiece } from '../../shared/art'
import { User } from '../../shared/user'
import { Artist } from '../../shared/artist'
import { Exhibit } from '../../shared/exhibit'

const api = remultNextApp({
    entities: [ArtPiece, User, Artist, Exhibit]
})

export const { POST, PUT, DELETE, GET } = api