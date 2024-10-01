import { GitHubLogoIcon, LinkedInLogoIcon, LinkNone2Icon, MixIcon } from '@radix-ui/react-icons'
import { MailIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Sidebar() {
  return (
    <aside className='sm:inline-flex hidden w-64 pt-16 pb-4 dark:bg-black h-[100vh] justify-between fixed top-0 left-0 px-4 border-r flex-col gap-5'>
        <div className='flex flex-col gap-3'>

          <p className=" transition-colors text-foreground leading-4 text-xs">Note: Image of lodge are not parent at we fixed it in next update.</p>
          <div>
            <h1 className='font-semibold tracking-wide flex gap-2 items-center'>
              <MixIcon className='w-5 h-5' />
              <span>Category</span>
            </h1>

            <div className='pl-7 text-sm [&>*]:cursor-pointer [&>*]:my-1'>
              <p className="text-muted-foreground transition-colors hover:text-foreground">Boys</p>
              <p className="text-muted-foreground transition-colors hover:text-foreground">Girls</p>
              <p className="text-muted-foreground transition-colors hover:text-foreground">Familys</p>
            </div>
          </div>
          <div>
            <h1 className='font-semibold tracking-wide flex gap-2 items-center'>
              <LinkNone2Icon className='w-5 h-5' />
              <span>Popular Place</span>
            </h1>

            <div className='pl-7 text-sm [&>*]:cursor-pointer [&>*]:my-1'>
              <p className="text-muted-foreground transition-colors hover:text-foreground">Matwari</p>
              <p className="text-muted-foreground transition-colors hover:text-foreground">Babugaon</p>
              <p className="text-muted-foreground transition-colors hover:text-foreground">Nutan Nagar</p>
              <p className="text-muted-foreground transition-colors hover:text-foreground">Lakhe</p>
              <p className="text-muted-foreground transition-colors hover:text-foreground">Zabara</p>
              <p className="text-muted-foreground transition-colors hover:text-foreground">Lochan Path</p>
              <p className="hover:text-muted-foreground transition-colors text-foreground">More</p>
            </div>
          </div>
          
        </div>




        <div className='flex flex-col gap-1'>

          <p className=" transition-colors text-foreground leading-4 text-xs font-semibold text-justify">Welcome to Hazaribagh and find your best lodge at Lodge/ui. We provide you, to find a lodge in lowest price and best place for the collage, coaching and many more. Have a good day!</p>
          <h1 className='text-xs tracking-wide flex gap-2 items-center'>
            <MailIcon className='w-4 h-4' />
            <p className="text-muted-foreground transition-colors hover:text-foreground">subodh14329@gmail.com</p>
            </h1>
          <Link href={'https://github.com/1432Subodh'} target='_blank' className='font-normal text-xs tracking-wide flex gap-2 items-center'>
            <GitHubLogoIcon className='w-4 h-4' />
            <p className="text-muted-foreground transition-colors hover:text-foreground">Github</p>

          </Link>
          <Link href={'https://www.linkedin.com/in/subodhravidas/'} target='_blank' className='text-xs tracking-wide flex gap-2 items-center'>
            <LinkedInLogoIcon className='w-4 h-4' />
            <p className="text-muted-foreground transition-colors hover:text-foreground">Linkedin</p>

          </Link>


        </div>
      </aside>
  )
}

export default Sidebar