"use client"
import Link from 'next/link';
import Image from 'next/image'
import logo from '/public/images/temp-logo.png'
import userico from '/public/images/user-icon-lg-b.png'
import { useState } from 'react';

export default function Nav() {
    const [isExpanded, setExpanded] = useState(false);

    function NavLink({ href, inner }: { href: string, inner: string }) { return (
        <li className='hover:bg-emerald-500/60'>
            <Link onClick={toggleNav} href={href} className='block py-4 px-3'>
                <span>{inner}</span>
            </Link>
        </li>
    )}

    const toggleNav = () => {
        var nav = document.getElementById('navigation');
        nav!.classList.toggle('max-md:block');
        setExpanded(!isExpanded);
    };

    return (
        <nav className="z-30 sticky flex top-0 justify-end md:justify-between w-screen items-center px-4 bg-gradient-to-r from-emerald-800 to-[310px] to-emerald-400 font-bold text-lg">
            <Link className="p-1 mr-32 grow shrink-0 justify-self-start" href="/">
                <Image width={100} height={100} src={logo} alt="Temporary Logo"/>
            </Link>
            <ul id="navigation" className={`md:flex flex-grow justify-between items-center text-l max-md:bg-emerald-400 max-md:top-0 max-md:pt-[58px] max-md:h-screen max-md:absolute max-md:inset max-md:right-0 ${isExpanded ? '' : 'max-md:hidden'}`}>
                <NavLink href="/art" inner="Art"/>
                <NavLink href="/artists" inner="Artists"/>
                <NavLink href="/exhibitions" inner="Exhibitions"/>
                <NavLink href="/literature" inner="Literature"/>
                <NavLink href="/media" inner="Media"/>
                <NavLink href="/sales" inner="Sales"/>
            </ul>
            <Link className="z-10 p-1 ml-[6%] max-md:mr-3 shrink-0" href="/">
                <Image width={30} height={30} src={userico} alt="User Icon"/>
            </Link>
            <button id="nav-toggle" aria-controls="navigation" aria-expanded={isExpanded} onClick={toggleNav} className='z-10 md:hidden !shadow-none border-y-[0.15rem] rounded-sm w-6 h-4 p-0 border-black'>
                <span className="sr-only">Menu</span>
                <span className="block h-0.5 w-6 rounded-2xl bg-black"></span>
            </button>
        </nav>
    );
} 