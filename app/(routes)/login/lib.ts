"use server";

import { createAuthClient } from "better-auth/client";
import { emailOTPClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL!,
  plugins: [emailOTPClient()],
});

export const requestVerificationCode = async (email: string) => {
  try {
    await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });

    return { success: true };
  } catch (error) {
    console.error("Error requesting verification code:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const verifyCode = async (email: string, code: string) => {
  try {
    const response = await authClient.signIn.emailOtp({
      email,
      otp: code,
    });

    return {
      success: true,
      user: response.data?.user,
      token: response.data?.token,
    };
  } catch (error) {
    console.error("Error verifying code:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
