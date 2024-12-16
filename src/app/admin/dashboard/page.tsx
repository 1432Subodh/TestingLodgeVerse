import React from 'react'
import AdminPage from './AdminPage'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Discover, manage, and explore comfortable and affordable lodging options with ease on Lodge Verse.",
};

function page() {
  return (
    <AdminPage/>
  )
}

export default page