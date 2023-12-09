import Link from 'next/link';
import Image from 'next/image'
import userico from 'src/images/user-icon-lg-b.png'
import logo from 'src/images/temp-logo.png'

function NavLink({ href, inner }: { href: string, inner: string | JSX.Element}) {
    return(
        <li>
            <Link href={href} className='px-5'>
                <span>{inner}</span>
            </Link>
        </li>
    )
}

export default function Nav() {
    return (
        <nav className= "sticky top-0 w-screen px-4 bg-gradient-to-r from-emerald-800 to-[310px] to-emerald-400 text-black ">
            <Link className="text-2xl font-bold absolute left-5" href="/">
                <Image className="p-1" width={150} height={150} src={logo} alt="Temporary Logo"/>
            </Link>
            <ul id="navigation" className="flex justify-end items-center max-sm:absolute max-sm:inset">
                <NavLink href="/art" inner="Art"/>
                <NavLink href="/artists/manage" inner="Artists"/>
                <NavLink href="/exhibitions" inner="Exhibitions"/>
                <NavLink href="/literature" inner="Literature"/>
                <NavLink href="/media" inner="Media"/>
                <NavLink href="/sales" inner="Sales"/>
                <NavLink href="/login" inner={<Image width={30} height={30} src={userico} alt="User Icon"/>}/>
            </ul>
            {/*<button id="nav-toggle" aria-controls="navigation" aria-expanded="false" className='!shadow-none'>
                <span className="sr-only">Menu</span>
            </button>*/}
        </nav>
    );
} 