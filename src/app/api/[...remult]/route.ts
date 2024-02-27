import { remultNextApp } from 'remult/remult-next'
import { createPostgresDataProvider } from "remult/postgres"
import { ArtPiece } from '../../_shared/art'
import { User } from '../../_shared/user'
import { Artist } from '../../_shared/artist'
import { Exhibit } from '../../_shared/exhibit'
import { Media } from '../../_shared/media'
import { Sale } from '../../_shared/sale'
import { Collection } from '../../_shared/collection'

const api = remultNextApp({
    entities: [ArtPiece, User, Artist, Exhibit, Media, Sale, Collection],
    dataProvider: createPostgresDataProvider({
      connectionString: process.env["DB_URL"],
      configuration: {
        ssl: process.env.DB_URL ? true : false
      }
    })
})

export const { GET, POST, PUT, DELETE } = api;