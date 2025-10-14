"use client";

import { createAuthClient } from "better-auth/client";
import { emailOTPClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL!,
  plugins: [emailOTPClient()],
});

export { authClient };
