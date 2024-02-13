"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { remult } from 'remult';
import { Exhibit } from '../../_shared/exhibit';
import { ArtPiece } from '../../_shared/art';
import Image from 'next/image';

const ExhibitionView = () => {
  const [exhibit, setExhibit] = useState<Exhibit | null>(null);
  const [arts, setArts] = useState<ArtPiece[]>([]);
  const router = useRouter();
  const exhibitId = typeof router.query.exhibitId === 'string' ? parseInt(router.query.exhibitId) : undefined;
  useEffect(() => {
    if (!exhibitId) return;
    const fetchExhibitAndArts = async () => {
      const fetchedExhibit = await remult.repo(Exhibit).find({ where: { id: exhibitId } });
      const exhibit = fetchedExhibit[0];
      setExhibit(exhibit);

      if (exhibit && exhibit.artIds && Array.isArray(exhibit.artIds)) {
        const fetchedArts = await Promise.all(
          exhibit.artIds.map(async (artId) => {
            const arts = await remult.repo(ArtPiece).find({ where: { id: artId } });
            return arts;
          })
        );
        setArts(fetchedArts.flat());
      }
    };
    fetchExhibitAndArts();
  }, [exhibitId]);

  if (!exhibit) return <div>Loading...</div>;

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
