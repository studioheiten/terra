"use client";

import { authClient } from "@/app/lib/account/auth-client";

const requestVerificationCode = async (email: string) => {
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

const verifyCode = async (email: string, code: string) => {
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

export const LoginFunctions = {
  requestVerificationCode,
  verifyCode,
};
