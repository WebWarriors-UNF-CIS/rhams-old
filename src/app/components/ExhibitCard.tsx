import React from 'react';
import { Exhibit } from '../shared/exhibit';
import { useRouter } from 'next/navigation';
import { Chip } from "@material-tailwind/react";

interface ExhibitCardProps {
  exhibit: Exhibit;
}

const ExhibitCard: React.FC<ExhibitCardProps> = ({ exhibit }) => {
    const router = useRouter();
    return (
        <div className="card" onClick={() => router.push('./view')}>
            <h3>{exhibit.name}</h3>
            <p className='italic'>{exhibit.location}</p>
            <div className='grid grid-cols-1 gap-2 mt-4'>
                <div className='flex gap-2'>
                    <span className='chip'> Start </span>
                    <p>{exhibit.startDate.toDateString()}</p>
                </div>
                <div className='flex gap-2'>
                    <span className='chip'> End </span>
                    <p>{exhibit.endDate.toDateString()}</p>
                </div>
            </div>
            if () {
              
            }
        </div>
    );
};

export default ExhibitCard;
