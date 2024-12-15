'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { auth } from '@/config/FirebaseConfig';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function UserLogo() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Safely access localStorage inside useEffect
        const userString = localStorage.getItem('user');
        if (userString) {
            const userData = JSON.parse(userString);
            // console.log(userData.uid);
            setUser(userData); // Set user data to state
            setIsLoggedIn(true); // Update logged-in state
        } else {
            console.log('No user found in localStorage.');
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    const handleLogOut = ()=>{
        signOut(auth).then(() => {
            console.log('log out done');
            localStorage.removeItem('user')
            setUser(null)
            setIsLoggedIn(false)
          }).catch((error) => {
            console.log(error)
          });
    }

    return (
        <>
            {isLoggedIn ? (
                <>
                <DropdownMenu>
                <DropdownMenuTrigger><Avatar>
                    <AvatarImage src={user?.profileImage || "https://githum/shadcn.png"} alt={user?.name || "User"} />
                    <AvatarFallback>{user?.email[0].toUpperCase() || 'CN'}</AvatarFallback>
                </Avatar></DropdownMenuTrigger>
                <DropdownMenuContent className='w-56 mr-2'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
                
                </>
            ) : (
                <Link href={'/ClientAuth/signin'}>
                <Button className='border' variant="outline">Login</Button>
                </Link>
            )}
        </>
    );
}

export default UserLogo;
