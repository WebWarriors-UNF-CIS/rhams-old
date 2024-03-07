export default function SizeInput({ id }: { id: string}) {
  return (
  <div className='input !grow-0 dark:text-white'>
    <label htmlFor={id.toLowerCase()}>{id}</label>
    <div className='bg-white dark:bg-gray-700 border rounded border-emerald-950 dark:border-gray-600 flex focus:ring-black focus:border-emerald-500'>
      <input
        type="number"
        id={id.toLowerCase()}
        placeholder='20'
        min="0"
        step='.01'
        className="!inline !w-16 shrink !border-none !outline-none appearance-none"
      />
      <div>
        <label htmlFor={`${id.toLowerCase()}Units`} className="!hidden">Units</label>
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