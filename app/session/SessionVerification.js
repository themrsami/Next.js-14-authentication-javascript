'use server'

import { verifySession } from "@/app/session/Sessions";

export async function checkSession() {
    const session = await verifySession();
    return session;
}