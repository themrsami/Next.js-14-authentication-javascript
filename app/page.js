'use client';
import SignupForm from "./components/signup";
import LoginForm from "./components/login";
import React from "react";
import {useState, createContext} from 'react';
export const AppContext = createContext({});

export default function Home() {
  const [issignupform, setIssignupform] = useState(false);
  const [isloginform, setIsloginform] = useState(true);
  return (
    <AppContext.Provider value={{issignupform, setIssignupform, isloginform, setIsloginform}}>
      <main className="flex flex-col gap-2 h-screen mx-auto justify-center items-center">
        <h1 className="text-sm sm:text-md lg:text-lg text-center bg-black rounded-full p-2 m-2 text-white max-w-60 mx-auto font-semibold hover:bg-gray-700 hover:cursor-pointer">Next.js Authentication</h1>
        <div className="flex-grow-0 flex-shrink-0 basis-auto w-full">
          <SignupForm />
        </div>
        <div className="flex-grow-0 flex-shrink-0 basis-auto w-full">
          <LoginForm />
        </div>
      </main>
    </AppContext.Provider>
  );
}
