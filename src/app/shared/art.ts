import { Entity, Fields } from "remult"

@Entity("artPiece", {
  allowApiCrud: true
})
export class ArtPiece {
  @Fields.cuid()
  id: string = ""

  @Fields.integer()
  catalogNum = ""

  @Fields.string()
  title = ""

  @Fields.string()
  artistId = ""

  @Fields.string()
  aquired?: Date

  // will only be a year
  @Fields.string()
  created?: Date
  
  @Fields.string()
  description = ""

  // Do they want multiple Images?
  // HEY add another table... ArtImages... with ArtId, ImageUrl, and maybe a caption
  // What about videos?
  @Fields.string()
  imageUrl = ""

  @Fields.json()
  salesIds = []

  @Fields.string()
  type = ""

  // TODO: Follow after MediumTypes table is created
  @Fields.string()
  medium = ""

  // Dimensions... might want to break this into multiple fields
  // What about weight?
  // Keep these columns on this table
  @Fields.string()
  size = ""

  // What do they want here? This is about Exhibitions. 
  // How detailed do they want or need this to be?
  // Do they want to track Exhibitions and Locations?
  @Fields.string()
  location = ""
}

// sample data
let ArtData = [
  {
    catalogNum: 1,
    title: "The Scream",
    artist: "Edvard Munch",
    created: new Date("1893-01-01"),
    description: "The Scream is the popular name given to a composition created by Norwegian Expressionist artist Edvard Munch in 1893.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/The_Scream.jpg/800px-The_Scream.jpg",
    isSold: false,
    medium: "Oil, tempera, pastel and crayon on cardboard",
    size: "91 cm × 73.5 cm (36 in × 28.9 in)",
    location: "National Gallery, Oslo, Norway"
  },
  {
    catalogNum: 2,
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    created: new Date("1503-01-01"),
    description: "The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci. It is considered an archetypal masterpiece of the Italian Renaissance.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Mona_Lisa.jpg/800px-Mona_Lisa.jpg",
    isSold: false,
    medium: "Oil on poplar panel",
    size: "77 cm × 53 cm (30 in × 21 in)",
    location: "Musée du Louvre, Paris, France"
  },
  {
    catalogNum: 3,
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    created: new Date("1889-01-01"),
    description: "The Starry Night is an oil on canvas by the Dutch post-impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    isSold: false,
    medium: "Oil on canvas",
    size: "73.7 cm × 92.1 cm (28.7 in × 36.3 in)",
    location: "Museum of Modern Art, New York City, United States"
  }
]