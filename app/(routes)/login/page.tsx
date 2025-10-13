"use client";

import Image from "next/image";
import { useLoginStore } from "./store";
import { ProgressView } from "@/app/components/misc/ProgressView";
import { AnimatePresence } from "motion/react";
import { BlurReplace } from "@/app/components/animations/BlurReplace";

export default function LoginPage() {
  // State
  const store = useLoginStore();

  // Functions
  const onSubmitEmail = async (email: string) => {};

  const onSubmitVerificationCode = async (code: string) => {};

  // View
  return (
    <div className="w-full h-screen flex flex-row gap-0 items-stretch">
      {/* Banner */}
      <div className="flex-1 p-2">
        <img
          src="https://cdn.buildwithterra.com/Website/Login%20Banner.webp"
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      {/* Login */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[28rem] flex flex-col gap-4 items-stretch justify-center">
          <div className="flex items-center justify-center">
            <img src="/terra-logo.svg" className="w-8 h-8" />
          </div>

          {/* Header */}
          <div className="flex flex-col gap-0 items-stretch justify-center">
            <h2 className="text-h2 font-emphasised text-center">
              Sign in to Terra
            </h2>
            <p className="text-center text-body text-label-secondary">
              Use your email to continue
            </p>
          </div>

          {/* Form */}
          <AnimatePresence>
            {store.stage === "EMAIL" && <EmailInput onSubmit={onSubmitEmail} />}
            {store.stage === "VERIFICATION_CODE" && (
              <VerificationCodeInput onSubmit={onSubmitVerificationCode} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function EmailInput({
  onSubmit,
}: {
  onSubmit: (email: string) => Promise<void>;
}) {
  const { email, setEmail, isLoading, setIsLoading } = useLoginStore();

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const enabled = email.length > 0 && email.match(regex);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <BlurReplace className="flex flex-col items-stretch justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 items-stretch justify-center"
      >
        <input
          type="text"
          placeholder="winger@greendale.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-body text-start px-4 py-2.5 bg-none outline-[0.5px] outline-accent border-0 rounded-xl focus:outline-1 transition-all duration-100"
        />

        <button
          disabled={!enabled}
          onClick={(e) => {
            e.preventDefault();
            // Find the closest form element and submit it
            const form = e.currentTarget.closest("form");
            form?.requestSubmit();
          }}
          className="py-2.5 rounded-full flex items-center justify-center bg-accent text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? <ProgressView /> : "Next"}
        </button>
      </form>
    </BlurReplace>
  );
}

function VerificationCodeInput({
  onSubmit,
}: {
  onSubmit: (code: string) => Promise<void>;
}) {
  const { verificationCode, setVerificationCode, isLoading } = useLoginStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <BlurReplace>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 items-stretch justify-center"
      >
        <input
          type="text"
          placeholder="winger@greendale.edu"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="font-mono text-body text-center tracking-[50%] px-4 py-2.5 bg-none outline-[0.5px] outline-accent border-0 rounded-xl focus:outline-1 transition-all duration-100"
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            // Find the closest form element and submit it
            const form = e.currentTarget.closest("form");
            form?.requestSubmit();
          }}
          className="py-2.5 rounded-full flex items-center justify-center bg-accent text-white cursor-pointer disabled:bg-fill-secondary disabled:text-label-secondary disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? <ProgressView /> : "Verify"}
        </button>
      </form>
    </BlurReplace>
  );
}
