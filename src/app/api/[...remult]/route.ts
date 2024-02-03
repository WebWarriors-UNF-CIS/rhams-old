import { remultNextApp } from 'remult/remult-next'
import { createPostgresDataProvider } from "remult/postgres"
import { ArtPiece } from '../../_shared/art'
import { User } from '../../_shared/user'
import { Artist } from '../../_shared/artist'
import { Exhibit } from '../../_shared/exhibit'

const api = remultNextApp({
    entities: [ArtPiece, User, Artist, Exhibit],
    dataProvider: createPostgresDataProvider({
      connectionString: process.env["POSTGRES_URL"]
    })
})

export const { GET, POST, PUT, DELETE } = api;