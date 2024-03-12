import React from 'react';
import { Exhibit } from '../_shared/exhibit';

interface ExhibitRowProps {
  exhibit: Exhibit;
  onClick: () => void;
}

const formatDate = (date?: Date) => {
  if (!date) return 'N/A';
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
  return date.toLocaleDateString(undefined, options);
};

const ExhibitRow: React.FC<ExhibitRowProps> = ({ exhibit, onClick}) => {
  return (
    <tr onClick={onClick} className={`cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700`}>
      <td className="py-3 px-4 text-sm sm:text-base text-gray-900 dark:text-white" style={{ width: "33.333%" }}>
        {exhibit.name}
      </td>
      <td className="py-3 px-4 text-sm sm:text-base text-gray-900 dark:text-gray-300" style={{ width: "33.333%" }}>
        {exhibit.location}
      </td>
      <td className="py-3 px-4 text-sm sm:text-base text-center text-gray-900 dark:text-gray-300" style={{ width: "16.67%" }}>
        {exhibit.startDate ? formatDate(new Date(exhibit.startDate)) : 'N/A'}
      </td>
      <td className="py-3 px-4 text-sm sm:text-base text-center text-gray-900 dark:text-gray-300" style={{ width: "16.67%" }}>
        {exhibit.endDate ? formatDate(new Date(exhibit.endDate)) : 'N/A'}
      </td>
    </tr>
  );
};

export default ExhibitRow;
