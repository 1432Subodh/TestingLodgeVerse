'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, BoxIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

const Hero: React.FC = () => {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const setPlaybackSpeed = () => {
      console.log(videoRef)
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.5; // Set default playback speed
      }
    };

    // Delay execution slightly to ensure the video element is available
    const timeoutId = setTimeout(setPlaybackSpeed, 0);

    return () => clearTimeout(timeoutId); // Cleanup the timeout
  }, []); // Run once after the component mounts




  return (
    <div className='w-full h-[100vh] flex flex-col justify-center items-center z-40'>
      <span className='w-6 h'>
        <Image width='24' height={10} src="/img/down-arrow.png" className='dark:invert  h-12 animate-bounce absolute bottom-3 right-3' alt="" />
      </span>
      <video src="video/line-back.mp4" autoPlay loop muted playsInline
        ref={videoRef}
        className=" dark:mix-blend-screen opacity-20 mix-blend-exclusion w-full h-[100vh] object-cover absolute -z-50 top-0 "></video>

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