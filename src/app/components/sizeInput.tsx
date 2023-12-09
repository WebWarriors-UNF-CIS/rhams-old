export default function SizeInput() {
  return (
  <div className='input grow'>
    <label htmlFor="height">Height:</label>
    <div className='bg-white group border border-black text-sm rounded-lg content flex focus:ring-black focus:border-emerald-500'>
      <input
        type="text"
        id="height"
        placeholder='20'
        className="!inline !w-20 grow !border-none !outline-none rounded-xl"
      />
      <div className="grow text-sm rounded-xl focus:outline-none
      dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <option value="inches">inches</option>
        <option value="cm">cm</option>
      </div>
    </div>
  </div>
  )
}