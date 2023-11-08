import { User } from '../../shared/user';
import { remult } from 'remult';

export default function NewArt() {
return (
  <div className="flex flex-col justify-center items-center mx-auto mt-10">
    <h1 className='margin-auto text-3xl font-semibold mb-6 dark:text-white'>Add an Artwork</h1>
    <form className='form'>
      <div className='input'>
        <label htmlFor="catalogNum">Catalog Number:</label>
        <input
          type="text"
          id="catalogNum"
          className='w-1/12'
        />
      </div>
      <div className='input'>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder='Title'
        />
      </div>
      <div className='input'>
        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          id="artist"
          placeholder='Artist'
        />
      </div>
        <div className='input'>
        <label htmlFor="created">Created:</label>
        <input
          type="date"
          id="created"
        />
      </div>
      <div className='input'>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder='Description'
        />
      </div>
      <div className='input'>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="url"
          id="imageUrl"
          placeholder='Image URL'
        />
      </div>
      <div className='input'>
        <label htmlFor="medium">Medium:</label>
        <input
          type="text"
          id="medium"
          placeholder='Medium'
        />
      </div>
      <div className='input'>
        <label htmlFor="size">Size:</label>
        <input
          type="text"
          id="size"
          placeholder='Size'
        />
      </div>
      <div className='input'>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          placeholder='Location'
        />
      </div>
    </form>
  </div>
);
}
/*
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
*/