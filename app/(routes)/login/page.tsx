"use client";

import { useMemo } from "react";
import { useLoginStore } from "./store";
import { BlurReplace } from "@/app/components/animations/BlurReplace";
import { AnimatePresence } from "motion/react";
import { Button } from "@/app/components/primitives/Button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { email, verificationCode, isLoading, setIsLoading, stage } =
    useLoginStore();

  const router = useRouter();

  // Computed properties

  const heading = useMemo(
    () => (stage === "EMAIL" ? "Sign into Terra" : "Check your inbox"),
    [stage],
  );

  const subheading = useMemo(
    () =>
      stage === "EMAIL"
        ? "Use your email to continue"
        : "We've sent you a code. Type it in below.",
    [stage],
  );

  const buttonText = useMemo(
    () => (stage === "EMAIL" ? "Next" : "Verify code"),
    [stage],
  );

  const buttonEnabled = useMemo(() => {
    if (stage === "EMAIL") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    } else if (stage === "VERIFICATION_CODE") {
      return verificationCode.length === 6;
    }

    return false;
  }, [email, verificationCode, stage]);

  // Functions

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const onSubmit = async () => {
    if (isLoading || !buttonEnabled) return;

    setIsLoading(true);

    try {
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-row gap-0 items-stretch justify-center">
      {/* Banner */}
      <div className="flex-1 p-2">
        <img
          src="https://cdn.buildwithterra.com/Website/Login%20Banner.webp"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Interactable */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[28rem] flex flex-col gap-4 items-stretch justify-center">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <img src="/terra-logo.svg" className="w-8 h-8" />
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-0 items-center justify-center">
            <h2 className="text-h2 font-emphasised text-center">{heading}</h2>
            <p className="text-body text-label-secondary text-center">
              {subheading}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmitForm}
            className="flex flex-col gap-2 items-stretch justify-center"
          >
            <AnimatePresence>
              {stage === "EMAIL" && (
                <BlurReplace
                  key="email-field"
                  className="w-full flex flex-col items-stretch"
                >
                  <EmailForm />
                </BlurReplace>
              )}

              {stage === "VERIFICATION_CODE" && (
                <BlurReplace
                  key="verification-code-field"
                  className="w-full flex flex-col items-stretch"
                >
                  <VerificationCodeForm />
                </BlurReplace>
              )}
            </AnimatePresence>

            <Button
              onClick={onSubmit}
              loading={isLoading}
              disabled={!buttonEnabled}
            >
              {buttonText}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function EmailForm() {
  const { email, setEmail } = useLoginStore();

  return (
    <input
      type="text"
      placeholder="winger@greendale.edu"
      name="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="text-body placeholder:text-label-tertiary text-start px-4 py-2.5 fill-none border-none outline-[0.5px] outline-accent focus:border-[1px] transition-all rounded-xl duration-200"
    />
  );
}

function VerificationCodeForm() {
  const { verificationCode, setVerificationCode } = useLoginStore();

  return (
    <input
      type="text"
      placeholder="XXXXXX"
      name="OTP"
      value={verificationCode}
      onChange={(e) => setVerificationCode(e.target.value)}
      className="font-mono text-body placeholder:text-label-tertiary text-center tracking-[1.5rem] px-4 py-2.5 fill-none border-none outline-[0.5px] outline-accent focus:border-[1px] transition-all duration-200"
    />
  );
}
