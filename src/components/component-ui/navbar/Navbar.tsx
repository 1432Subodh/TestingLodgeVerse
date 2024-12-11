'use client';

import React from 'react';
import { ModeToggle } from '../../theme-control';
import { Navigation } from './Navigation';
import Searchbar from './Searchbar';
import { SheetDemo } from './SideMenu';
import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
  return (
    <header className="flex items-center justify-between sm:px-10 px-4 py-2 border-b fixed top-0 left-0 w-full backdrop-blur-sm z-50 dark:bg-[#020202af] bg-white/75">
      {/* Logo and Navigation */}
      <div className="flex items-center gap-10">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              width={24}
              height={24}
              src="/svg/logo.svg"
              className="dark:invert"
              alt="Lodge UI Logo"
            />
            <h1 className="font-bold text-normal">lodgeVerse</h1>
          </div>
        </Link>
        <Navigation />
      </div>

      {/* Right Section: Search, Mode Toggle, Login, and Menu */}
      <div className="flex items-center sm:gap-4 gap-2">
        <Searchbar />
        <ModeToggle />
        <SheetDemo />
      </div>
    </header>
  );
}

export default Navbar;
