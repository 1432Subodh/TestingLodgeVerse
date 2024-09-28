import React from 'react'
import { BebasNeue } from '../second-section/SecondSection'
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { XIcon } from 'lucide-react'

function Footer() {
  return (
    <>
      <div className='w-full flex justify-between sm:px-40 px-5 mt-16 '>
        <div className='border-t-2 dark:border-zinc-100 border-zinc-900 w-80 min-h-44 uppercase text-[0.6rem] tracking-wider font-bold flex items-center text-center justify-center flex-col gap-1 [&>*]:cursor-pointer '>
          <p>Privacy policy</p>
          <p>Terms & conditions</p>
          <p>About</p>
          <p>Contact</p>
        </div>
        <div className='w-64 min-h-44 flex flex-col items-center relative  '>
          <div className='flex gap-2 justify-center absolute -top-4 flex-col '>
            <h1 className={`${BebasNeue.className} font-semibold tracking-wider text-xl text-center leading-[.50rem] `}>lodge/ui</h1>
            <p className='text-center text-xs capitalize'>The lodge finding website.</p>
          </div>
          <div className='flex w-full justify-between items-center h-50% sm:px-10 mb-10 px-2 mt-14'>
            <span>
              <GitHubLogoIcon width={20} height={20} />
            </span>
            <span>
              <LinkedInLogoIcon width={20} height={20} />
            </span>
            <span>
              <TwitterLogoIcon width={20} height={20} />
            </span>
          </div>
          <div className='border-l-2 h-16 border-zinc-900'> </div>
        </div>
        <div className='border-t-2 dark:border-zinc-100 border-zinc-900 w-80 min-h-44 uppercase text-[0.6rem] tracking-wider font-bold flex items-center text-center justify-center flex-col gap-1 [&>*]:cursor-pointer '>
          <p>Boys</p>
          <p>Girls</p>
          <p>Family</p>
          <p>More</p>
        </div>
      </div>
      <p className='text-center text-sm my-5 '>© 2024 Lodgeui, Inc. | Subodh Ravidas</p>
    </>
  )
}

export default Footer