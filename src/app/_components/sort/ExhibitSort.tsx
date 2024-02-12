import React from 'react';

interface ExhibitSortProps {
  onSort: (sortField: string, sortOrder: 'asc' | 'desc') => void;
}

export const ExhibitSort: React.FC<ExhibitSortProps> = ({ onSort }) => {
  return (
    <div className="input mx-auto w-full max-w-xs">
      <label className="text-sm text-gray-800">Sort by</label>
      <div className="mt-1">
        <select 
          className="mt-1 block w-full rounded-md border border-slate-500 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
          onChange={(e) => {
            const value = e.target.value.split(',');
            const field = value[0];
            const order = value[1] as 'asc' | 'desc';
            onSort(field, order);
          }}
        >
          <option value="startDate,asc">Start Date Ascending</option>
          <option value="startDate,desc">Start Date Descending</option>
          <option value="name,asc">Title A-Z</option>
          <option value="name,desc">Title Z-A</option>
        </select>
      </div>
    </div>
  );
};
