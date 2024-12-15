import LoginPage from '@/components/LogAndOut/LoginPage'
import React, { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'

function page() {
  return (
    <>
      <Suspense>

        <LoginPage />
        <Toaster />
      </Suspense>
    </>
  )
}

export default page