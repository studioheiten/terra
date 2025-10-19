"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { ProgressView } from "../misc/ProgressView";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" color="var(--color-green)" />
        ),
        info: <InfoIcon className="size-4" />,
        warning: (
          <TriangleAlertIcon className="size-4" color="var(--color-orange)" />
        ),
        error: <OctagonXIcon className="size-4" color="var(--color-red)" />,
        loading: <ProgressView className="size-4" />,
      }}
      style={
        {
          "--normal-bg": "var(--color-bg-secondary)",
          "--normal-text": "var(--color-label-primary)",
          "--normal-border": "var(--color-separator-non-opaque)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
