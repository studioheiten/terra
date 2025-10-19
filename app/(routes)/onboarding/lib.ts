"use server";

import workos from "@/lib/workos";
import prisma from "@/packages/prisma";
import { cookies } from "next/headers";

export async function checkOrgSlugExists(slug: string): Promise<boolean> {
  try {
    const existingOrg = await prisma.organization.findUnique({
      where: { slug },
      select: { id: true },
    });

    return !!existingOrg;
  } catch (error) {
    console.error("Error checking organization slug:", error);
    return false;
  }
}

export async function reauthenticateUser() {
  try {
    // Re-authenticate the user using their session and refresh token
    const store = await cookies();

    const sealedSession = store.get("wos-session")?.value;
    if (!sealedSession) {
      throw new Error("User not logged in");
    }

    const session = workos.userManagement.loadSealedSession({
      sessionData: sealedSession,
      cookiePassword: process.env.WORKOS_COOKIE_PASSWORD!,
    });

    const refreshResult = await session.refresh();
    if (!refreshResult.authenticated) {
      throw new Error("User could not be reauthenticated with refresh token");
    }

    const { sealedSession: newSealedSession } = refreshResult;
    if (!newSealedSession) {
      throw new Error("Failed to get sealed session");
    }

    store.set("wos-session", newSealedSession);
  } catch (err) {
    console.error("Error reauthenticating user:", err);
    throw err;
  }
}

export async function setNameAndCreateUser(name: string) {
  try {
  } catch (err) {
    console.error("Error setting user name:", err);
    throw err;
  }
}
