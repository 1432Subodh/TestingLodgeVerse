'use client';

import React from 'react';
import { ModeToggle } from '../../theme-control';
import { Navigation } from './Navigation';
import Searchbar from './Searchbar';
import { SheetDemo } from './SideMenu';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar } from '@/components/ui/avatar';
import UserLogo from './UserLogo';

function Navbar() {
  return (
    <header className="flex items-center justify-between sm:px-10 px-4 py-2 border-b fixed top-0 left-0 w-full backdrop-blur-sm z-50 ">
      {/* Logo and Navigation */}
      <div className='flex gap-5 items-center'>

        <SheetDemo />
        <div className="flex items-center gap-10">

          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                width={28}
                height={28}
                src="/favicon.png"
                // className="dark:invert"
                alt="Lodge UI Logo"
              />
              <h1 className="font-bold text-normal sm:block hidden">lodgeVerse</h1>
            </div>
          </Link>
        </div>
        <Navigation />
      </div>

      {/* Right Section: Search, Mode Toggle, Login, and Menu */}
      <div className="flex items-center sm:gap-4 gap-2">
        <Searchbar />
        <ModeToggle />
        <UserLogo />
      </div>
    </header>
  );
}

export default Navbar;
