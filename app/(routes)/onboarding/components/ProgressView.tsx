"use client";

import clsx from "clsx";
import useOnboardingStore from "../store";

export default function OnboardingProgressView() {
  const { stage } = useOnboardingStore();

  const isNameStage = stage === "NAME";
  const isCreateOrgStage = stage === "CREATE_ORG";

  return (
    <div className="flex flex-row gap-1 items-center justify-center">
      <Dot active={true} />

      <Line active={isCreateOrgStage} />

      <Dot active={isCreateOrgStage} />
    </div>
  );
}

function Dot({ active }: { active: boolean }) {
  return (
    <div
      className={clsx("w-2 h-2 rounded-full transition-colors duration-200", {
        "bg-accent": active,
        "bg-label-tertiary": !active,
      })}
    />
  );
}

function Line({ active }: { active: boolean }) {
  return (
    <div
      className={clsx(
        "flex-1 border-t border-dashed transition-colors duration-200",
        {
          "border-accent": active,
          "border-separator-opaque": !active,
        },
      )}
    />
  );
}
