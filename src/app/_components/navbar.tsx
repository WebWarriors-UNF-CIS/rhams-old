"use client"
import Link from 'next/link';
import Image from 'next/image'
import blogo from '/public/images/logo-b.png'
import wlogo from '/public/images/logo-w.png'
import userico from '/public/images/user-icon-lg-b.png'
import usericoDark from '/public/images/user-icon-lg-w.png'
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Nav() {
    const [isExpanded, setExpanded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const { data: session } = useSession();
    if (session) setLoggedIn(true);

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
        <nav className="z-30 sticky flex top-0 justify-end md:justify-between w-full items-center px-4 bg-gradient-to-r from-emerald-800 dark:from-emerald-950 to-[310px] to-emerald-400 dark:to-emerald-700 dark:text-white font-medium text-lg">
            <Link className="p-1 mr-24 max-md:grow shrink-0 justify-self-start dark:hidden" href="/">
                <Image width={100} height={100} src={blogo} alt="Black Logo"/>
            </Link>
            <Link className="p-1 mr-24 max-md:grow shrink-0 justify-self-start dark:inline" href="/">
                <Image width={100} height={100} src={wlogo} alt="White Logo"/>
            </Link>
            <ul id="navigation" className={`md:flex flex-grow justify-between items-center text-l max-md:bg-emerald-400 dark:max-md:bg-emerald-700 max-md:top-0 max-md:pt-[58px] max-md:h-screen max-md:absolute max-md:inset max-md:right-0 ${isExpanded ? '' : 'max-md:hidden'}`}>
                <NavLink href="/art" inner="Art"/>
                <NavLink href="/artists" inner="Artists"/>
                <NavLink href="/exhibitions" inner="Exhibitions"/>
                <NavLink href="/collections" inner="Collections"/>
                <NavLink href="/media" inner="Media"/>
                { loggedIn  && <NavLink href="/sales" inner="Sales"/> }
            </ul>
            <Link className="z-10 p-1 ml-3 lg:ml-[5%] max-md:mr-3 shrink-0 dark:hidden" href={loggedIn ? "/profile" : "/api/auth/signIn"}>
                <Image width={30} height={30} src={userico} alt="User Icon"/>
            </Link>
            <Link className="z-10 p-1 ml-3 lg:ml-[5%] max-md:mr-3 shrink-0 hidden dark:inline" href={loggedIn ? "/profile" : "/api/auth/signIn"}>
                <Image width={30} height={30} src={usericoDark} alt="User Icon"/>
            </Link>
            <button id="nav-toggle" aria-controls="navigation" aria-expanded={isExpanded} onClick={toggleNav} className='z-10 md:hidden !shadow-none border-y-[0.15rem] rounded-sm w-6 h-4 p-0 border-black dark:border-white'>
                <span className="sr-only">Menu</span>
                <span className="block h-0.5 w-6 rounded-2xl bg-black dark:bg-white"></span>
            </button>
        </nav>
    );
} 