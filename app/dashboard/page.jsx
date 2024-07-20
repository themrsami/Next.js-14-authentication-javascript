'use client';
import React from 'react'
import { Button } from "@nextui-org/react";
import { logout } from '@/app/actions/auth';
import { checkSession } from '../session/SessionVerification';

const DashboardPage = () => {
  const session = checkSession();
  if (!session) {
    return null;
  }
  return (
    <div className='flex justify-center items-center mx-auto flex-col gap-4 mt-4'>
      <h1 className='bg-slate-900 px-4 py-2 font-semibold rounded-full text-slate-100'>
        DashboardPage
      </h1>
      <Button className='text-black max-w-40 hover:bg-gray-200' variant="bordered" onClick={async () => { await logout();}}>Logout</Button>
    </div>
  )
}

export default DashboardPage