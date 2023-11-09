import React from 'react';
import { Exhibit } from '../shared/exhibit';

interface ExhibitCardProps {
  exhibit: Exhibit;
}

const ExhibitCard: React.FC<ExhibitCardProps> = ({ exhibit }) => {
    return (
        <div className="border rounded-md border-gray-300 p-4 cursor-pointer">
            <h3>{exhibit.name}</h3>
            <p>{exhibit.location}</p>
            <p>Dates: {exhibit.startDate.toString()} - {exhibit.endDate.toString()}</p>
            {/* Could add more exhibit details here */}
        </div>
    );
};

export default ExhibitCard;
