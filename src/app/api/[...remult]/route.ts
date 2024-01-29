import { remultNextApp } from 'remult/remult-next'
import { createPostgresDataProvider } from "remult/postgres"
import { ArtPiece } from '../../shared/art'
import { User } from '../../shared/user'
import { Artist } from '../../shared/artist'
import { Exhibit } from '../../shared/exhibit'

const dataProvider = createPostgresDataProvider({
    connectionString: process.env["POSTGRES_URL"] || process.env["DATABASE_URL"],
    configuration: {
      ssl: Boolean(process.env["POSTGRES_URL"]),
    },
  })

export const api = remultNextApp({
    entities: [ArtPiece, User, Artist, Exhibit],
    dataProvider: createPostgresDataProvider()
})

export const { GET, POST, PUT, DELETE } = api