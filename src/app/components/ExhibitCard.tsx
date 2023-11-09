import React from 'react';
import { Exhibit } from '../shared/exhibit';
import { useRouter } from 'next/navigation';

interface ExhibitCardProps {
  exhibit: Exhibit;
}

const ExhibitCard: React.FC<ExhibitCardProps> = ({ exhibit }) => {
    const router = useRouter();
    return (
        <div className="border rounded-md border-gray-300 hover:border-gray-500 p-4 h-60 w-64 cursor-pointer"
             onClick={() => router.push('exhibitions/view')}>
            <h3>{exhibit.name}</h3>
            <p className='italic'>{exhibit.location}</p>
            <p>Start: {exhibit.startDate.toDateString()}</p>
            <p>End: {exhibit.endDate.toDateString()}</p>
            {/* Could add more exhibit details here */}
        </div>
    );
};

export default ExhibitCard;
