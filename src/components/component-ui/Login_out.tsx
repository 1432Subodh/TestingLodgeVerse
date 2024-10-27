import React, { useEffect } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { signIn, signOut, useSession } from 'next-auth/react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '../ui/button'



function Login_out() {
    const { data: session } = useSession()
    useEffect(() => {
        if (session?.user)
            console.log(session)
    }, [session])

    // console.log("hello session" +session);
    return (
        <div className='flex justify-center items-center'>
            {/* {session?.user ?
                <button onClick={() => signIn()}>Login</button> :
            } */}
            {
                !session?.user ? <Button variant="outline" onClick={()=>signIn()} >Login</Button> :
                    <Popover>
                        <PopoverTrigger>
                            <Avatar className="sm:inline-flex hidden">
                                <AvatarImage src={session?.user?.image ?? undefined} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                        </PopoverTrigger>

                        <PopoverContent className='w-32 mr-3 px-3 py-2'>
                        <Button variant="secondary" onClick={()=>signOut()} >Logout</Button> 
                        </PopoverContent>
                    </Popover>
            }

        </div>
    )
}

export default Login_out
