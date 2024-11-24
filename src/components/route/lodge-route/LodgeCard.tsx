'use client'
import {
    Card,
    CardContent,

} from "@/components/ui/card"
import Image from "next/image"
import { IndianRupee } from "lucide-react"
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface CardsProps {
    message: string;
}

const LodgeCard = () => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {


        return setLoading(false);
    }, [])



    return (
        <>
            {
                loading ?
                    <>
                        <div className="sm:flex hidden flex-col space-y-3">
                            <Skeleton className="h-36 sm:w-[230px] rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[230px]" />
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-[180px]" />
                            </div>
                        </div>
                        <div className="flex sm:hidden items-center space-x-4">
                            <Skeleton className="h-20 w-48 rounded-md" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    </>
                    : <Card className="sm:w-[230px]  flex sm:flex-col w-full sm:h-64 h-32">
                        <div className="sm:w-[100%] w-44 sm:h-32 h-full">

                            <Image src={'/img/placeholder.svg'} alt="" width={0} height={0} className="sm:w-[100%] opacity-55 w-44 sm:h-32 h-full -z-1 object-cover sm:rounded-tr-md rounded-bl-md sm:rounded-bl-none sm:rounded-tl-md rounded-tl-md" />
                        </div>

                        <CardContent className="p-3 w-full flex flex-col justify-between h-full">
                            <div>

                                <h1 className="font-semibold text-foreground">Name of lodge</h1>
                                <p className="text-muted-foreground text-sm leading-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                            </div>
                            <div className="flex items-center justify-between sm:pt-0 pt-3">
                                <p className="flex items-center">
                                    <span>800</span>
                                    <IndianRupee className="w-3.5 h-3.5" />
                                    <span>/Room</span>
                                </p>
                                <Link href={'/view/af'}>
                                    <button className="text-sm font-semibold text-white bg-primary p-2 rounded-md">View More</button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
            }
        </>
    )
}

export default LodgeCard