'use client'
import { Dashboard } from '@/components/route/admin/Dashboard'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from 'react';

function AdminPage() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
            // Safely access localStorage inside useEffect
            const userString = localStorage.getItem('user');
            // console.log(userString)
            if (userString) {
                const userData = JSON.parse(userString);
                if(userData.uid==='IviFmSYe3hWqsDsM8EpASJbJQhV2'){

                    setIsLoggedIn(true); // Update logged-in state
                }
                console.log(userData);
            } else {
                console.log('No user found in localStorage.');
            }
        }, [])

    return (
        <>
            <div className='w-full'>
                {
                    isLoggedIn ? 
                    <Dashboard />:
                    <div className='w-full h-[90vh] flex justify-center items-center'>
                        <div>
                            <p>Login with Admin</p>
                            <div>
                                <Link href={'/ClientAuth/signin?admin=true'}>
                                <Button variant={'outline'} className='border'>Login</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default AdminPage