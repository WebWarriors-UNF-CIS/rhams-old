import { ArtPiece } from '../shared/art';

export default function ArtCard({ art }: { art: ArtPiece }) {
  return (
    <div className='m-4 w-72 p-4 border border-black rounded-lg' key={art.id}>
      <h3>{art.title}</h3>
      <p className='overflow-auto h-16'>{art.description}</p>
    </div>
  )
}