'use client';

import React from 'react';
import { ModeToggle } from '../../theme-control';
import { Navigation } from './Navigation';
import Searchbar from './Searchbar';
import { SheetDemo } from './SideMenu';
import Image from 'next/image';
import Link from 'next/link';
import UserLogo from './UserLogo';

const Navbar = () => {
  return (
    <header className="flex items-center justify-between sm:px-10 px-4 py-2 border-b fixed top-0 left-0 w-full backdrop-blur-sm z-50">
      {/* Logo and Navigation */}
      <div className='flex gap-5 items-center'>
        <SheetDemo />
        <div className="flex items-center gap-10">
          <Link href="/">
            <p className="flex items-center gap-2">
              <Image
                width={28}
                height={28}
                src="/favicon.png"
                alt="Lodge UI Logo"
              />
              <span className="font-bold">lodgeVerse</span>
            </p>
          </Link>
          <Navigation />
        </div>
      </div>
      {/* Searchbar and User Controls */}
      <div className="flex items-center gap-5">
        <Searchbar />
        <ModeToggle />
        <UserLogo />
      </div>
    </header>
  );
};

// Navbar.displayName = 'Navbar';

export default Navbar;
