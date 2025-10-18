"use server";

import { Organization } from "@prisma/client";
import { withAuth } from "@workos-inc/authkit-nextjs";
import OnboardingView from "./view";
import Image from "next/image";

export type PageProps = {
  name: string | null;
  organization: Organization | null;
};

export default async function OnboardingPage() {
  const { user: _ } = await withAuth({ ensureSignedIn: true });

  return (
    <div className="w-full h-screen flex flex-row gap-0 items-stretch justify-center bg-bg-primary">
      <Image
        src="/images/terra-onboarding-banner.webp"
        alt="Banner"
        height={0}
        width={0}
        sizes="100vw"
        className="flex-1 rounded-2xl object-cover p-2"
      />
      <OnboardingView />
    </div>
  );
}
