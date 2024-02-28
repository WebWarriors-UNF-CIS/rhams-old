export default function YearPicker({ id }: { id: string}) {
  const currentYear = new Date().getFullYear();
  return (
    <div className='input !grow-0 dark:text-white'>
      <label htmlFor={id.toLowerCase()}>{id}</label>
      <input
        type="number"
        id={id.toLowerCase()}
        name={id.toLowerCase()}
        min="1900"
        max={currentYear}
        placeholder={`${currentYear}`}
        className="appearance-none"
      />
    </div>
  );
}