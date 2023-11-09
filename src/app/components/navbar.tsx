import Link from 'next/link';
import reubenLogo from '../src/images/ReubenLogo.jpg'

export default function Nav() {
    return (
        <nav className="flex w-screen justify-end items-center p-4 bg-emerald-400/90 font-bold">
            <a className="text-2xl font-bold absolute left-5" href="/">Logo</a>
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
                <span>user</span>
            </Link>
        </nav>
    );
}