import Link from 'next/link';
import Image from 'next/image'
import userico from 'src/images/user-icon-lg-w.png'
import logo from 'src/images/temp-logo.png'

export default function Nav() {
    return (
        <nav className="flex w-screen h-fit place-content-between items-center p-4 bg-emerald-400/90 text-white font-bold">
            <a className="left-5" href="/"><Image className="px-4" width={150} height={150} src={logo} alt="Temporary Logo"/></a>
            <div className=''>
                <Link className="px-5 py-15 basis-1/7" href="/art">
                    <span>Art</span>
                </Link>
                <Link className="px-5 basis-1/7" href="/artists/manage">
                    <span>Artists</span>
                </Link>
                <Link className="px-5 basis-1/7" href="/exhibitions">
                    <span>Exhibitions</span>
                </Link>
                <Link className="px-5 basis-1/7" href="/literature">
                    <span>Literature</span>
                </Link>
                <Link className="px-5 basis-1/7" href="/media">
                    <span>Media</span>
                </Link>
                <Link className="px-5 basis-1/7" href="/sales">
                    <span>Sales</span>
                </Link>
                <Link className="px-5 basis-1/7" href="/login">
                    
                </Link>
            </div>
        </nav>
    );
}