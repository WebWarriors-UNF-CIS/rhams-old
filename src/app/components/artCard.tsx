import { useRouter } from 'next/navigation';
import { ArtPiece } from '../shared/art';

export default function ArtCard({ art }: { art: ArtPiece }) {
  const router = useRouter();

  return (
    <div className='m-4 w-72 p-4 border border-black rounded-lg' key={art.id}>
      <h3>{art.title}</h3>
      <p className='bg-scroll overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 h-16'>{art.description}</p>
      <button onClick={() => router.push(`/art/${art.id}`)} className='btn-green py-1 px-3 mt-2'> view </button>
    </div>
  )
}