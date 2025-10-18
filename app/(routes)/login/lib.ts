"use server";

import workos from "@/app/lib/workos";
import { cookies } from "next/headers";

export const requestAuthenticationCode = async (email: string) => {
  try {
    await workos.userManagement.createMagicAuth({ email });
  } catch (err) {
    console.error(`[request_authentication_code] Request failed: ${err}`);
    throw err;
  }
};
