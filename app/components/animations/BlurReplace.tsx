import { motion } from "motion/react";

/**
 * Recreation of .transition(.blurReplace()) from SwiftUI
 */
export function BlurReplace({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
