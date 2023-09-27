import { remultNextApp } from 'remult/remult-next'
import { ArtPiece } from '../../shared/art'
import { User } from '../../shared/user'

const api = remultNextApp({
    entities: [ArtPiece, User]
})

export const { POST, PUT, DELETE, GET } = api