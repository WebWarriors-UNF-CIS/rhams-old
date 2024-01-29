import { remultNextApp } from 'remult/remult-next'
import { ArtPiece } from '../../shared/art'
import { User } from '../../shared/user'
import { Artist } from '../../shared/artist'
import { Exhibit } from '../../shared/exhibit'

export const api = remultNextApp({
    entities: [ArtPiece, User, Artist, Exhibit]
})

export const { GET, POST, PUT, DELETE } = api