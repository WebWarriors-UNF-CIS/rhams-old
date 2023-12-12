export default function SizeInput({ id }: { id: string}) {
  return (
  <div className='input grow'>
    <label htmlFor={id.toLowerCase()}>{id}:</label>
    <div className='bg-white group border border-black text-sm rounded content flex focus:ring-black focus:border-emerald-500'>
      <input
        type="text"
        id={id.toLowerCase()}
        placeholder='20'
        className="!inline !w-20 grow !border-none !outline-none rounded"
      />
      <div className="grow text-sm rounded focus:outline-none
      dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <datalist>
          <option value="inches">inches</option>
          <option value="cm">cm</option>
        </datalist>
      </div>
    </div>
  </div>
  )
}