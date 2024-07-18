'use server'

import { SignupFormSchema, LoginFormSchema } from '@/app/lib/definitions'
import connectToDatabase from '@/lib/db';
import User from '@/models/users';
import { createSession, deleteSession } from '@/app/session/Sessions';
import { redirect } from 'next/navigation';
 
export async function signup(state, formData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    fullname: formData.get('fullname'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmpassword: formData.get('confirmpassword'),
  })

  console.log(validatedFields)
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

// 2. Prepare data for insertion into database
const { fullname, email, password, confirmpassword } = validatedFields.data;

await connectToDatabase();
console.log("Connected to MongoDB.");
if(password !== confirmpassword) {
    return {
        message: 'Passwords do not match. Please try again.',
    };
}

const existing = await User.findOne({ email });

if (existing) {
    return {
      message: 'Email already exists, please use a different email or login.',
    };
  }

  // 3. Insert the user into the database or call an Auth Provider's API
  const newUser = new User({ fullname, email, password, role: 'user' });
  await newUser.save();
  if (!newUser) {
    return {
      message: 'Error creating user. Please try again.',
    };
}

// 4. Create a session
await createSession(newUser._id.toString());
return undefined;
}

export async function login(state, formData) {
    // Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    const errorMessage = { message: 'Invalid login credentials.' };
    
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    
    await connectToDatabase();
    console.log("Connected to MongoDB.");
    const user = await User.findOne({ email: validatedFields.data.email, password: validatedFields.data.password});
    
    if (!user) {
        return errorMessage;
    }
    
    // 3. Create a session
    await createSession(user._id.toString());

    return undefined;
    }

export async function logout() {
    deleteSession();
    redirect('/');
  }