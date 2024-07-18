'use client';
import React from 'react'
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useContext } from 'react';
import { AppContext } from '@/app/page';
import { login } from '@/app/actions/auth';
import { useFormState, useFormStatus } from 'react-dom';

const LoginForm = () => {
    const [state, action] = useFormState(login, undefined);
    const {isloginform, setIsloginform} = useContext(AppContext);
    const {setIssignupform} = useContext(AppContext);
    const handlesignup = () => {
        setIsloginform(false);
        setIssignupform(true);
    }
  return (
    <>
        {isloginform &&
        <form action={action} className='flex flex-col gap-2 max-w-lg w-full mx-auto justify-center items-center'>
            <h1 className='text-2xl font-semibold text-center'>Login</h1>
            <Input type="email" variant="bordered" label="Email" name='email' />
            {state?.errors?.email && <p className='text-red-500'>{state.errors.email}</p>}
            <Input type="password" variant="bordered" label="Password" name='password'/>
            {state?.errors?.password && (
            <div>
              <p className='text-red-500'>Password must:</p>
              <ul>
                {state.errors.password.map((error, index) => (
                  <li key={index} className='text-red-500'>- {error}</li>
                ))}
              </ul>
            </div>
            )}
            {state?.message && <p className='text-red-500'>{state.message}</p>}
            <div className='flex gap-2 w-full justify-end'>
                <LoginButton/>
                <Button className='text-black max-w-40 hover:bg-gray-200' variant="bordered" onClick={handlesignup}>Sign Up</Button>
            </div>
        </form>
        }
    </>
  )
}

export default LoginForm


export function LoginButton() {
    const { pending } = useFormStatus();
  
    return (
        <Button aria-disabled={pending} variant="shadow" type='submit' className='bg-black text-white max-w-40'>
          {pending ? 'Logging in...' : 'Login'}
        </Button>
    );
  }