'use client';
import React from 'react'
import { Button } from "@nextui-org/react";
import { logout } from '@/app/actions/auth';

const DashboardPage = () => {
  return (
    <div>
        DashboardPage
        <Button className='text-black max-w-40 hover:bg-gray-200' variant="bordered" onClick={async () => { await logout();}}>Logout</Button>
    </div>
  )
}

export default DashboardPage