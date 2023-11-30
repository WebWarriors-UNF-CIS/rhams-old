import Link from 'next/link';
import Image from 'next/image'
import userico from 'src/images/user-icon-lg-w.png'
import logo from 'src/images/temp-logo.png'

export default function Nav() {
    return (
        <nav className="flex w-screen justify-end items-center p-4 bg-emerald-400/90 text-white font-bold">
            <a className="text-2xl font-bold absolute left-5" href="/"><Image className="px-4" width={150} height={150} src={logo} alt="Temporary Logo"/></a>
            <Link className="px-5" href="/art">
                <span>Art</span>
            </Link>
            <Link className="px-5" href="/artists/manage">
                <span>Artists</span>
            </Link>
            <Link className="px-5" href="/exhibitions">
                <span>Exhibitions</span>
            </Link>
            <Link className="px-5" href="/literature">
                <span>Literature</span>
            </Link>
            <Link className="px-5" href="/media">
                <span>Media</span>
            </Link>
            <Link className="px-5" href="/sales">
                <span>Sales</span>
            </Link>
            <Link className="px-5" href="/login">
                <span><Image width={30} height={30} src={userico} alt="User Icon White"/></span>
            </Link>
        </nav>
    );
}