'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";  // Adjust the path as per your project
import Image from "next/image";
import { ExternalLinkIcon, Table } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from "@/components/ui/skeleton";
import { DataType } from "@/app/lodge/page";
import Link from "next/link";


const Page = () => {
    const [data, setData] = useState<DataType | null>(null);
    const path = useParams<{ lodgename: string }>();
    const [imageShow, setImageShow] = useState<string | null>(null)
    const fetchData = async () => {
        try {
            if (!path.lodgename) {
                //console.error("No lodge name provided in URL.");
                return;
            }

            const lodgeid = path.lodgename;
            //console.log("Fetching data for lodge:", lodgeid);

            const docRef = doc(db, "LodgeData", lodgeid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                //console.log(data);
                setData(data as DataType);
                setImageShow(data?.LodgeThumbnail?.[0])
            } else {
                //console.log("No such document!");
            }
        } catch (err) {
            //console.error("Error fetching lodge data:", err);
        }

    };
    useEffect(() => {


        fetchData();
    }, [path.lodgename]);

    const handleImage = (index: number, ele: string) => {
        setImageShow(ele)
        //console.log(imageShow)

    }


    return (
        <div className='pt-16 pb-4 sm:px-10 px-5 min-h-screen w-full flex gap-4 sm:flex-row flex-col'>
            <div className='sm:w-[45%] h-full flex flex-col gap-4'>
                {/* <Image src={data?.LodgeThumbnail} alt="" /> */}
                {
                    data ? <Image
                        src={imageShow ? imageShow : data?.LodgeThumbnail?.[0] || "/img/placeholder-image.jpg"}
                        alt={data?.LodgeName || "Lodge Thumbnail"}
                        width={230}
                        height={128}
                        className=' w-full sm:h-[75vh] h-[50vh] rounded-md object-cover  ' />
                        : <Skeleton className=' w-full sm:h-[75vh] h-[50vh] rounded-md object-cover  ' />
                }

                <div className='flex gap-3 justify-center'>
                    {
                        !data && <>
                            <Skeleton className=' w-28 h-20 rounded-md object-cover  ' />
                            <Skeleton className=' w-28 h-20 rounded-md object-cover  ' />
                            <Skeleton className=' w-28 h-20 rounded-md object-cover  ' />
                        </>
                    }
                    {
                        data?.LodgeThumbnail?.map((ele, index) => (

                            <Image
                                onClick={() => handleImage(index, ele)}
                                key={index}
                                src={ele || "/img/placeholder-image.jpg"}
                                alt={ele || "Lodge Thumbnail"}
                                width={0} // Replace with the desired width
                                height={0} // Replace with the desired height
                                className={`opacity-60 w-28 h-20 overflow-hidden rounded-md object-cover cursor-pointer ${imageShow == ele && 'border-2 border-primary'}`}
                            />

                        ))
                    }
                    {/* <Image src={'/img/placeholder.svg'} alt='' width={0} height={0} className='opacity-60 w-28 h-20 overflow-hidden rounded-md object-cover' />
                    <Image src={'/img/placeholder.svg'} alt='' width={0} height={0} className='opacity-60 w-28 h-20 overflow-hidden rounded-md object-cover' /> */}
                </div>
            </div>
            <div className='rounded-md sm:w-[55%] sm:max-h-none min-h-[65vh]'>
                <p className='text-xs tracking-wider font-light'>Lodge Name</p>
                <div className='flex justify-between items-center'>

                    <h1 className='sm:text-3xl text-2xl font-extrabold tracking-wide leading-none pb-3 capitalize'>
                        {
                            data ? data?.LodgeName : 'Loading...'
                        }
                    </h1>


                    <button className='text-xs flex transition-all font-semibold items-center gap-1 dark:border-none border rounded-md bg-card px-2 py-1.5 hover:opacity-75'>
                        <Link href={data?.GoogleMapsURL || '/'} target="_blank">View in Map</Link>
                        <span><ExternalLinkIcon width={12} height={12} /></span>
                    </button>
                </div>
                <p className='text-xs tracking-wider font-light'>Address</p>
                <h3 className='font-semibold text-normal text-sm pb-1'>{
                    data ? data?.Address : 'Loading...'
                }</h3>
                <p className='text-xs tracking-wider font-light'>Category</p>
                <h3 className='font-semibold text-normal text-sm pb-5 border-b'>
                    {
                        data ? data?.Category : 'Loading...'
                    }
                </h3>


                <div className='flex justify-center gap-3 w-full [&>*]:rounded-sm [&>*]:p-2 mt-3 pb-4'>
                    <Card className='w-[50%] capitalize'>
                        <h1 className='text-xl font-semibold tracking-wide mb-2'>Facilities</h1>
                        <p className='text-sm font-light'>
                            {
                                data?.Facilities
                            }
                        </p>
                    </Card>
                    <Card className=' w-[50%] '>
                        <h1 className='text-xl font-semibold leading-5 tracking-wide mb-2'>Contact</h1>
                        <p className='text-sm font-light'>Owner name : <span className="font-semibold">{data?.OwnerName}</span></p>
                        <p className='text-sm font-light'>Owner Number : <span className="font-semibold">{data?.PhoneNumber}</span></p>

                    </Card>
                </div>


                <div className='flex flex-row-reverse my-3 sm:mt-32'>
                    <button className=''>Add To Favorite</button>
                </div>
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29275.588628841175!2d85.3301032!3d23.9883788!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f49ea8c4921339%3A0x6b6e6a22ea351bc6!2sMunni%20Lodge!5e1!3m2!1sen!2sin!4v1732627441413!5m2!1sen!2sin" width="600" height="450"   loading="lazy" ></iframe> */}

            </div>
        </div>
    )
}

export default Page
