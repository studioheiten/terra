"use client";

import clsx from "clsx";
import { useState } from "react";
import { ProgressView } from "../misc/ProgressView";
import { AnimatePresence } from "motion/react";
import { BlurReplace } from "../animations/BlurReplace";

type Props = {
  children: React.ReactNode;
  onClick: Promise<void>;
  disabled: boolean;
  size: "small" | "large";
  className?: string;
};

export function Button({
  children,
  onClick,
  disabled = false,
  className,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleButtonPress = async () => {
    setLoading(true);
    await onClick;
    setLoading(false);
  };

  return (
    <button
      className={clsx(
        "text-body text-white flex flex-row gap-1.5 items-center justify-center bg-accent rounded-full hover:opacity-90 active:opacity-80 disabled:opacity-50 transition-all duration-200",
        {
          "cursor-pointer": !disabled && !loading,
          "cursor-wait": loading,
          "cursor-not-allowed": disabled && !loading,
        },
        className
      )}
      onClick={handleButtonPress}
      disabled={disabled || loading}
    >
      <AnimatePresence>
        {loading ? (
          <BlurReplace>
            <ProgressView className="fill-white" />
          </BlurReplace>
        ) : (
          <BlurReplace>{children}</BlurReplace>
        )}
      </AnimatePresence>
    </button>
  );
}
