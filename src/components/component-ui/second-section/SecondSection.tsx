import Image from 'next/image'
import React from 'react'
import { Bebas_Neue } from 'next/font/google';

const BebasNeue = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'], // Define font weights
    style: ['normal'], // Optional: set style
});
function SecondSection() {


    return (
        <div className='pb-10 mt-5'>

            <h1 className={`${BebasNeue.className} font-bold text-3xl text-center tracking-wider capitalize leading-6`}>Facilities & Amenities</h1>
            <p className='text-center text-sm '>Lorem ipsum dolor sit amet consectetur adipisicing ferendis neque, quisquam error eos aperiam minus unde </p>
            <div className='sm:px-40 px-5 flex flex-wrap gap-6 item-center justify-center mt-8'>
                <div className='sm:inline-flex hidden rounded-md transition-all w-64  sm:h-32 h-24  justify-between px-2 hover:bg-accent cursor-default'>
                    <div className='flex items-center justify-center'>

                        <Image src={'/img/gif/security.gif'} loading="lazy" alt='' width={200} height={200} className='object-cover' />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <h1 className={`font-bold text-normal tracking-wider capitalize`}>
                            Security
                        </h1>
                        <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className='rounded-md transition-all w-64  sm:h-32 h-24  flex justify-between px-2 hover:bg-accent gap-5 pl-5 cursor-default'>

                    <div className='flex items-center justify-center'>
                        <Image src={'/img/gif/wifi.gif'} loading="lazy" alt='' width={80} height={80} className='object-cover' />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <h1 className={`font-bold text-normal tracking-wider capitalize`}>
                            Wifi
                        </h1>
                        <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className='rounded-md transition-all w-64  sm:h-32 h-24  flex justify-between px-2 hover:bg-accent cursor-default '>

                    <div className='flex items-center justify-center'>
                        <Image src={'/img/gif/kitchen.gif'} loading="lazy" alt='' width={150} height={150} className='object-cover' />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <h1 className={`font-bold text-normal tracking-wider capitalize`}>
                            Mess
                        </h1>
                        <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className='rounded-md transition-all w-64  sm:h-32 h-24  flex justify-between gap-4 px-2 hover:bg-accent cursor-default pl-5 '>

                    <div className='flex items-center justify-center w-[100px] h-16 object-cover'>
                        <Image src={'/img/gif/cycle.gif'} loading="lazy" alt='' width={150} height={150} className='object-cover' />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <h1 className={`font-bold text-normal tracking-wider capitalize`}>
                            Parking
                        </h1>
                        <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className='rounded-md transition-all w-64  sm:h-32 h-24  flex justify-between px-2 hover:bg-accent cursor-default '>

                    <div className='flex items-center justify-center'>
                        <Image src={'/img/gif/clean.gif'} loading="lazy" alt='' width={150} height={150} className='object-cover' />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <h1 className={`font-bold text-normal tracking-wider capitalize`}>
                            Clean Room
                        </h1>
                        <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className='rounded-md transition-all w-64  sm:h-32 h-24  flex justify-between px-2 hover:bg-accent cursor-default gap-2 '>

                    <div className='flex items-center justify-center'>
                        <Image src={'/img/gif/price.gif'} loading="lazy" alt='' width={150} height={150} className='dark:mix-blend-screen mix-blend-exclusion scale-150 object-cover' />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <h1 className={`font-bold text-normal tracking-wider capitalize`}>
                            Best Price
                        </h1>
                        <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondSection