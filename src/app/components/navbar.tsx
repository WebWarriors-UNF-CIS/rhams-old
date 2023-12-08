import Link from 'next/link';
import Image from 'next/image'
import userico from 'src/images/user-icon-lg-w.png'
import logo from 'src/images/temp-logo.png'

export default function Nav() {
    return (
        <nav className="px-4 lg:px-6 bg-emerald-400/90 text-white font-bold">
            <div className='flex flex-nowrap justify-between items-center mx-auto min-w-fit py-2'>
                <a className="flex-shrink-0" href="/">
                    <Image width={100} height={100} src={logo} alt="Temporary Logo"/>
                </a>
                <div className='flex flex-nowrap'>
                <Link className="px-10 basis-1/6 hover:text-slate-100" href="/art">
                    <span>Art</span>
                </Link>
                <Link className="px-10 basis-1/6 hover:text-slate-100" href="/artists/manage">
                    <span>Artists</span>
                </Link>
                <Link className="px-10 basis-1/6 hover:text-slate-100" href="/exhibitions">
                    <span>Exhibitions</span>
                </Link>
                <Link className="px-10 basis-1/6 hover:text-slate-100" href="/literature">
                    <span>Literature</span>
                </Link>
                <Link className="px-10 basis-1/6 hover:text-slate-100" href="/media">
                    <span>Media</span>
                </Link>
                <Link className="px-10 basis-1/6 hover:text-slate-100" href="/sales">
                    <span>Sales</span>
                </Link>
                </div>
                <a className="flex-shrink-0" href="/login">
                    <Image width={30} height={30} src={userico} alt="User Icon White"/>
                </a>
            </div>
        </nav>
    );
} 