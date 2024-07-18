import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}


export async function createSession(userId) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, expiresAt })
   
    cookies().set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    })
    redirect('/dashboard');
  }

  export async function verifySession() {
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);
  
    if (!session?.userId) {
      return null; // Return null if no valid session
    }
  
    return { isAuth: true, userId: Number(session.userId) };

  }
  
  export async function updateSession() {
    const session = cookies().get('session')?.value;
    const payload = await decrypt(session);
  
    if (!session || !payload) {
      return null;
    }
  
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: 'lax',
      path: '/',
    });
  }

  export function deleteSession() {
    // Delete the session cookie
    cookies().delete('session');
  }
  