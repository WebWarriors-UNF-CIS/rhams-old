import { remultNextApp } from 'remult/remult-next'
import { createPostgresDataProvider } from "remult/postgres"
import { ArtPiece } from '../../_shared/art'
import { Role, User } from '../../_shared/user'
import { Artist, Type } from '../../_shared/artist'
import { Exhibit } from '../../_shared/exhibit'
import { Media } from '../../_shared/media'
import { Sale } from '../../_shared/sale'
import { Collection } from '../../_shared/collection'
import { remult } from 'remult'

const api = remultNextApp({
  entities: [ArtPiece, User, Artist, Exhibit, Media, Sale, Collection],
  dataProvider: createPostgresDataProvider({
    connectionString: process.env["DB_URL"],
    configuration: {
      ssl: process.env.DB_URL ? true : false
    }
  }),
  initApi: async () => {
    const artRepo = remult.repo(ArtPiece);
    const userRepo = remult.repo(User);
    const artistRepo = remult.repo(Artist);
    const exhibitRepo = remult.repo(Exhibit);

    if (await artRepo.count() === 0) {
      await artRepo.insert([
        {
          catalogNum: 5,
          title: "Reuben's art",
          artist_name: "Reuben Hale",
          artist: {
            name: "Reuben Hale",
            dob: new Date("1927-01-14"),
            dod: new Date("2018-07-16"),
            imageString: "picofme.jpg",
            website: "www.reubenhale.com",
            biography: "Reuben Hale is a versatile artist. In addition to his sculptural work, Reuben has pursued work in various other mediums. His body of work also includes pieces completed in paint, photography, printmaking (etchings, lithographs, and monoprints) and holography. In sculpture he has worked in wood, stone, steel, concrete, bronze and polyester plastics. He is inventive and experimental, and his work shows control and understanding of each medium",
            notes: "Original Artist for Reuben Hale Museum.",
            id: 2,
            exhibits: [
              {
                name: "Exhibit A",
                location: "everywhere",
                startDate: new Date("2024-02-02"),
                endDate: new Date("2024-02-16"),
                id: 1
              },{
                name: "Exhibit B",
                location: "nowhere",
                startDate: new Date("2024-01-28"),
                endDate: new Date("2024-02-01"),
                id: 2
              }
            ]
          },
          aquired: "2018",
          created: "1995",
          description: "this is a test",
          imageUrl: "https://static.thenounproject.com/png/4066324-200.png",
          type: Type.Sculpture,
          medium: "web",
          height: "20 in",
          width: "20 in",
          depth: "20 in",
          location: "everywhere",
          exhibits: [
            {
              name: "Exhibit A",
              location: "everywhere",
              startDate: new Date("2024-02-02"),
              endDate: new Date("2024-02-16"),
              id: 1
            },{
              name: "Exhibit B",
              location: "nowhere",
              startDate: new Date("2024-01-28"),
              endDate: new Date("2024-02-01"),
              id: 2
            }
          ]
        },{
          catalogNum: 86,
          title: "delete me",
          artist_name: "Pablo Picasso",
          artist: {
            name: "Pablo Picasso",
            dob: new Date("2024-02-02"),
            dod: new Date("2024-02-02"),
            imageString: "",
            website: "",
            biography: "I am awesome",
            notes: "My mom is great!",
            id: 1,
            exhibits: [
              {
                name: "Exhibit C",
                location: "everywhere",
                startDate: new Date("2024-02-07"),
                endDate: new Date("2024-02-09"),
                id: 3
              }
            ]
          },
          aquired: "2000",
          created: "1990",
          description: "",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Key_delete.jpg",
          type: Type.Other,
          medium: "web",
          height: " in",
          width: " in",
          depth: " in",
          location: "...",
          exhibits: [
            {
              name: "Exhibit C",
              location: "everywhere",
              startDate: new Date("2024-02-07"),
              endDate: new Date("2024-02-09"),
              id: 3
            }
          ]
        },
        {
          catalogNum: 1,
          title: "The Scream",
          artist_name: "Edvard Munch",
          artist: {
            name: "Edvard Munch",
            dob: new Date("1863-12-12"),
            dod: new Date("1944-01-23"),
            imageString: "",
            website: "",
            biography: "I am awesome",
            notes: "My mom is great!",
            id: 3,
            exhibits: [],
          },
          aquired: "2000",
          created: "1893",
          description: "The scream is a painting by Edvard Munch",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg",
          type: Type.Painting,
          medium: "Oil, tempera, pastel and crayon on cardboard",
          height: "36 in",
          width: "28 in",
          location: "National Gallery, Oslo",
          exhibits: []
        }
      ]);
    }

    if (await artistRepo.count() === 0) {
      await artistRepo.insert([
        {
          name: "Pablo Picasso",
          dob: new Date("2024-02-02"),
          dod: new Date("2024-02-02"),
          imageString: "",
          website: "",
          biography: "I am awesome",
          notes: "My mom is great!",
          exhibits: [
            {
              name: "Exhibit C",
              location: "everywhere",
              startDate: new Date("2024-02-07"),
              endDate: new Date("2024-02-09"),
              id: 3
            }
          ]
        },{
          name: "Reuben Hale",
          dob: new Date("1927-01-14"),
          dod: new Date("2018-07-16"),
          imageString: "picofme.jpg",
          website: "www.reubenhale.com",
          biography: "Reuben Hale is a versatile artist. In addition to his sculptural work, Reuben has pursued work in various other mediums. His body of work also includes pieces completed in paint, photography, printmaking (etchings, lithographs, and monoprints) and holography. In sculpture he has worked in wood, stone, steel, concrete, bronze and polyester plastics. He is inventive and experimental, and his work shows control and understanding of each medium",
          notes: "Original Artist for Reuben Hale Museum.",
          exhibits: [
            {
              name: "Exhibit A",
              location: "everywhere",
              startDate: new Date("2024-02-02"),
              endDate: new Date("2024-02-16"),
              id: 1
            },{
              name: "Exhibit B",
              location: "nowhere",
              startDate: new Date("2024-01-28"),
              endDate: new Date("2024-02-01"),
              id: 2
            }
          ]
        }
      ]
      )
    }

    if (await exhibitRepo.count() === 0) {
      await exhibitRepo.insert([
        {
          name: "Exhibit A",
          location: "everywhere",
          startDate: new Date("2024-02-02"),
          endDate: new Date("2024-02-16")
        },{
          name: "Exhibit B",
          location: "nowhere",
          startDate: new Date("2024-01-28"),
          endDate: new Date("2024-02-01")
        },
        {
          name: "Exhibit C",
          location: "everywhere",
          startDate: new Date("2024-02-07"),
          endDate: new Date("2024-02-09")
        }
      ]
      )
    }

    if (await userRepo.count() === 0) {
      await userRepo.insert([
        {
          name: "jon",
          email: "john@mail.com",
          password: "123",
          roles: [
            Role.Admin
          ],
          id: 1
        },
        {
          name: "jsmith",
          email: "123@now.com",
          password: "art",
          roles: [
            Role.Admin
          ],
          id: 2
        }
      ]);
    }
  }
})

export const { GET, POST, PUT, DELETE } = api;