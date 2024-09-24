import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Commandbox } from './Commandbox'


function Searchbar() {
  return (
    <>


      <Dialog >
        <DialogTrigger>
          <div  className='sm:hidden bg-background p-2 rounded-[.5rem] shadow-sm hover:bg-accent hover:text-accent-foreground'>

            <MagnifyingGlassIcon width="22" height="22" className='sm:hidden' />
          </div>

          <div className='capitalize sm:flex  gap-2 items-center hidden transition-all text-gray-300 hover:bg-zinc-900 hover:text-accent-foreground text-xs font-semibold cursor-pointer border rounded-[.5rem] px-3 py-1.5 w-64 '>
            <MagnifyingGlassIcon width="20" height="20" />
            Search for stay...
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader></DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <Commandbox />
        </DialogContent>
      </Dialog>
    </>




  )
}

export default Searchbar