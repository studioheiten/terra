"use client";

import { useMemo } from "react";
import useOnboardingStore from "./store";

export default function OnboardingView() {
  const { stage, name } = useOnboardingStore();

  const title = useMemo(() => {
    switch (stage) {
      case "NAME":
        return "Welcome to Terra.";
      case "CREATE_ORG":
        return `Hi there, ${name}!`;
      case "INVITE_TEAM":
        return "Bring the rest of the team";
    }
  }, [stage]);

  const subheadline = useMemo(() => {
    switch (stage) {
      case "NAME":
        return "Let’s get you started with your account and workspace.";
      case "CREATE_ORG":
        return "Let’s create your workspace.";
      case "INVITE_TEAM":
        return "Terra is about the friends you made along the way";
    }
  }, [stage]);

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-[28rem] max-w-[90%] flex flex-col gap-4 items-stretch justify-center">
        <div className="flex items-center justify-center">
          <img src="/terra-logo.svg" className="w-8 h-8" />
        </div>

        <div className="flex flex-col gap-0 items-stretch justify-center text-center">
          <h2 className="text-h2 font-emphasised">{title}</h2>
          <p className="text-body text-label-secondary">{subheadline}</p>
        </div>
      </div>
    </div>
  );
}
