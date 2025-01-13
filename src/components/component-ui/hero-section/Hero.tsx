'use client'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { ArrowRight, BoxIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const Image = dynamic(() => import('next/image'), { ssr: false });

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const setPlaybackSpeed = () => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.5;
      }
    };

    const timeoutId = setTimeout(setPlaybackSpeed, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setLoading(true);
    e.preventDefault();
    router.push(e.currentTarget.href);
  };

  return (
    <div className='w-full h-[100vh] flex flex-col justify-center items-center z-40'>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center dark:bg-[#000000b0] bg-[#ffffffc9] bg-opacity-75 z-50">
          <div className="loader border-t-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}
      <span className='w-6 h'>
        <Image width='24' height={10} src="/img/down-arrow.png" loading="lazy" className='dark:invert h-12 animate-bounce absolute bottom-3 right-3' alt="Down Arrow" />
      </span>
      <video src="video/line-back.mp4" autoPlay loop muted playsInline ref={videoRef} className="dark:mix-blend-screen opacity-20 mix-blend-exclusion w-full h-[100vh] object-cover absolute -z-50 top-0"></video>
      <h1 className='text-sm px-2 py-1 flex gap-2 -z-20 items-center font-semibold dark:bg-zinc-900 bg-zinc-200 rounded-[.5rem] cursor-pointer hover:bg-zinc-800'>
        <BoxIcon width='16' height='16' />
        Introducing Lodge Finder
        <ArrowRight width='16' height='16' />
      </h1>
      <h1 className="scroll-m-20 text-4xl px-3 font-extrabold tracking-tight lg:text-5xl text-center -z-20">Find your stay easily in Hazaribagh</h1>
      <p className="leading-5 my-3 text-sm font-semibold text-center w-[90%] sm:px-[300px] px-5">The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.</p>
      <div className='flex items-center gap-3'>
        <Link href={'/lodge'} onClick={handleLinkClick}><Button variant={'default'} className='border py-[19px]'>Get Started</Button></Link>
        <Button variant={'outline'} className='border py-[19px]'>Github</Button>
      </div>
    </div>
  )
}

export default Hero