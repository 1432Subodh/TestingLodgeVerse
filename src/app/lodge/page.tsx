'use client'
import { Dashboard } from '@/components/route/lodge-route/Sidebar';
import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';

function page() {

    const notify = () => toast('Here is your toast.');

    useEffect(() => {
        toast('You in lodge finder page!', {
            icon: '👏',
        });
    }, [])

    return (
        <>
            <div className='pt-12 w-full'>

                <Dashboard/>

            </div>
            
            <Toaster toastOptions={{
                className: 'dark:bg-zinc-900 dark:text-white'
            }} />
        </>
    )
}

export default page