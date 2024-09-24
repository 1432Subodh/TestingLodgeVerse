import React from 'react'
import { ModeToggle } from '../../theme-control'
import { Navigation } from './Navigation'
import Searchbar from './Searchbar'
import { AvatarDemo } from './Avatar'
import { SheetDemo } from './SideMenu'
import Image from 'next/image'

function Navbar() {
  return (
    <div className='flex items-center justify-between sm:px-10 px-4 py-2 border-b'>
      <div className='flex items-center gap-10'>

        <div className='flex gap-2 items-center'>
          <Image width='24' height={10} src="svg/logo.svg" className='dark:invert w-6' alt="" />
          <h1 className='font-bold text-normal '>lodge/ui</h1>
        </div>
        <Navigation />
      </div>
      <div className='flex items-center sm:gap-4 gap-1'>

        <Searchbar />
        <ModeToggle />

        <SheetDemo />
        <AvatarDemo />
      </div>
    </div>
  )
}

export default Navbar