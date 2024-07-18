'use client';
import React from 'react'
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useState, useContext } from 'react';
import { AppContext } from '@/app/page';
import { signup } from '@/app/actions/auth'
import { useFormState, useFormStatus } from 'react-dom';


const SignupForm = () => {
  const {issignupform, setIssignupform} = useContext(AppContext);
  const {setIsloginform} = useContext(AppContext);
  const handlelogin = () => {
    setIssignupform(false);
    setIsloginform(true);
  }
  const [state, action] = useFormState(signup, undefined);

  return (
    
    <>
    {issignupform && 
    <form action={action} className='flex flex-col gap-2 max-w-lg w-full mx-auto justify-center items-center'>
        <h1 className='text-2xl font-semibold text-center'>Sign Up</h1>
        <Input type="text" variant="bordered" label="FullName" name='fullname'/>
        {state?.errors?.fullname && <p className='text-red-500'>{state.errors.fullname}</p>}
        <Input type="email" variant="bordered" label="Email" name='email'/>
        {state?.errors?.email && <p className='text-red-500'>{state.errors.email}</p>}
        <Input type="password" variant="bordered" label="Password" name='password'/>
        {state?.errors?.password && (
          <div className='text-red-500'>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <Input type="password" variant="bordered" label="Confirm Password" name="confirmpassword" />
        {state?.message && <p className='text-red-500'>{state.message}</p>}

        <div className='flex gap-2 w-full justify-end'>
            <SignupButton />
            <Button className='text-black max-w-40 hover:bg-gray-200' variant="bordered" onClick={handlelogin}>Login</Button>
        </div>
    </form>
    }
    </>
  )
}

export default SignupForm

export function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} className='bg-black text-white max-w-40' variant="shadow" type='submit'>
      {pending ? 'Signing up...' : 'Signup'}
    </Button>
  );
}