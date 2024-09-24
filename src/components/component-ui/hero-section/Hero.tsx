import { Button } from '@/components/ui/button'
import { ArrowRight, BoxIcon } from 'lucide-react'
import React from 'react'

function Hero() {
    return (
        <div className='w-full sm:py-28 py-16 flex flex-col justify-center items-center '>
            <p className='text-sm px-2 py-1 flex gap-2 -z-20 items-center font-semibold dark:bg-zinc-900 bg-zinc-200 rounded-[.5rem] cursor-pointer hover:bg-zinc-800'>
                <BoxIcon width='16' height='16' />
                Introducing Lodge Finder
                <ArrowRight width='16' height='16' />
            </p>
            <h2 className="scroll-m-20 text-4xl px-3 font-extrabold tracking-tight lg:text-5xl text-center -z-20">Find your stay easily in Hazaribagh</h2>
            <p className="leading-5 my-3 text-sm font-semibold text-center w-[90%] sm:px-[300px] px-5">The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax. </p>
            <div className='flex items-center gap-3'>
                <Button variant={'default'} className='border py-[19px]'>Get Started</Button>
                <Button variant={'outline'} className='border py-[19px]'>Github</Button>
            </div>
        </div>
    )
}

export default Hero