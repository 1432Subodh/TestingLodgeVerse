import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ExternalLinkIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
function page() {
    return (
        <div className='pt-16 pb-4 sm:px-10 px-5 min-h-screen w-full flex gap-4'>
            <div className='sm:w-[45%] h-full flex flex-col gap-8'>
                <Image src={'/img/placeholder.svg'} alt='' width={0} height={0} className='opacity-60 sm:w-full h-[70vh] rounded-md object-cover  ' />
                <div className='flex gap-3 justify-center'>
                    <Image src={'/img/placeholder.svg'} alt='' width={0} height={0} className='opacity-60 w-28 h-20 border-2 border-primary overflow-hidden rounded-md object-cover' />
                    <Image src={'/img/placeholder.svg'} alt='' width={0} height={0} className='opacity-60 w-28 h-20 overflow-hidden rounded-md object-cover' />
                    <Image src={'/img/placeholder.svg'} alt='' width={0} height={0} className='opacity-60 w-28 h-20 overflow-hidden rounded-md object-cover' />
                </div>
            </div>
            <div className='rounded-md sm:w-[55%]'>
                <p className='text-xs tracking-wider font-light'>Lodge Name</p>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl font-extrabold tracking-wide leading-none pb-3'>Chhotu Lodge</h1>
                    <button className='text-xs flex font-semibold items-center gap-1 rounded-md bg-card px-2 py-1.5 hover:opacity-75'>
                        <span>View in Map</span>
                        <span><ExternalLinkIcon width={12} height={12} /></span>
                    </button>
                </div>
                <p className='text-xs tracking-wider font-light'>Address</p>
                <h3 className='font-semibold text-normal text-sm pb-1'>Near Sasta Bazar, Nutan Nagar Colony, Hazaribagh</h3>
                <p className='text-xs tracking-wider font-light'>Category</p>
                <h3 className='font-semibold text-normal text-sm pb-5 border-b'>Boys & Family</h3>


                <div className='flex justify-center gap-3 w-full [&>*]:rounded-sm [&>*]:p-2 mt-3'>
                    <Card className='w-[50%] capitalize'>
                        <h1 className='text-xl font-bold tracking-wide'>Facilities</h1>
                        <ol type='a' className='text-sm font-light tracking-wider list-decimal pl-6'>
                            <li>wifi</li>
                            <li>clean room</li>
                            <li>at lest 10 X 10 room</li>
                            <li>clean bathroom</li>
                            <li>Balcony</li>
                        </ol>
                    </Card>
                    <Card className=' w-[50%] '>
                        <h1 className='text-xl font-bold tracking-wide'>Contact & Owner</h1>
                        <p className='text-sm font-light'>Mahesh Kumar</p>
                        <p className='text-sm font-light'>7046584686</p>

                    </Card>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Sr.No</TableHead>
                            <TableHead>Catgory</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">01</TableCell>
                            <TableCell>Boys</TableCell>
                            <TableCell>10 X 10</TableCell>
                            <TableCell className="text-right">₹ 800.00/M</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">02</TableCell>
                            <TableCell>Boys</TableCell>
                            <TableCell>12 X 12</TableCell>
                            <TableCell className="text-right">₹ 1200.00/M</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">03</TableCell>
                            <TableCell>Family</TableCell>
                            <TableCell className='sm:pl-7'>-</TableCell>
                            <TableCell className="text-right">₹ 5200.00/M</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className='relative'>

                <Button className='absolute right-0'>Add To Favorite</Button>
                </div>

            </div>
        </div>
    )
}

export default page
