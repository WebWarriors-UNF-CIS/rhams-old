export default function SizeInput({ id }: { id: string}) {
  return (
  <div className='input grow dark:text-white'>
    <label htmlFor={id.toLowerCase()}>{id}:</label>
    <div className='bg-white dark:bg-gray-700 border rounded border-emerald-950 dark:border-gray-600 flex focus:ring-black focus:border-emerald-500'>
      <input
        type="number"
        id={id.toLowerCase()}
        placeholder='20'
        className="!inline !w-14 grow !border-none !outline-none appearance-none"
      />
      <div className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <select name="units" id={`${id.toLowerCase()}Units`} className="dark:bg-gray-700 h-full rounded focus:outline-none">
          <option value="in">in</option>
          <option value="ft">ft</option>
          <option value="cm">cm</option>
          <option value="m">m</option>
        </select>
      </div>
    </div>
  </div>
  )
}