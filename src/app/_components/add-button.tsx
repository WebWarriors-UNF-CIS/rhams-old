import Link from "next/link"

export default function AddButton({ href }: { href: string}) {
  return (
    
    <Link href={href}>
      <button className="btn-green rounded-full absolute right-4 top-20 w-8 h-8">
        <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
          <g id="plus">
            <line className="fill-none stroke-black dark:stroke-white stroke-[6px]" x1="23" x2="23" y1="2" y2="44"/>
            <line className="fill-none stroke-black dark:stroke-white stroke-[6px]" x1="2" x2="44" y1="23" y2="23"/>
          </g>
        </svg>
      </button>
    </Link>
  )
}