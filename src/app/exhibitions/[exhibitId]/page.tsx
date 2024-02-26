"use client";
import { useEffect, useState } from 'react';
import { remult } from 'remult';
import { Exhibit } from '../../_shared/exhibit';
import { ArtPiece } from '../../_shared/art';
import Image from 'next/image';

const ExhibitionView = ({params}: {params: { exhibitId: string}}) => {
  const [exhibit, setExhibit] = useState<Exhibit | null>(null);
  const [arts, setArts] = useState<ArtPiece[]>([]);

  useEffect(() => { remult.repo(Exhibit).findFirst({ id: parseInt(params.exhibitId) }).then(setExhibit) }, [params.exhibitId]);

  if (!exhibit) return <div className='flex font-bold text-2xl items-center justify-center h-96 max-w-'><div>Loading...</div></div>;

  return (
    <div className="container mx-auto px-4">
      <h1>{exhibit?.name}</h1>
      <p>{`Location: ${exhibit?.location}`}</p>
      <p>{`Start Date: ${exhibit?.startDate} - End Date: ${exhibit?.endDate}`}</p>
      <div className="grid grid-cols-3 gap-4">
        {arts.map((art, index) => (
          <div key={index}>
            <Image src={art.imageUrl} alt={art.title} width={300} height={300} />
            <p>{art.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExhibitionView;
