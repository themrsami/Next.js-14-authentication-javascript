'use server'

import { verifySession } from "@/app/auth/Sessions";

export async function checkSession() {
    const session = await verifySession();
    return session;
}