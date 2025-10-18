"use server";

import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user, organizationId } = await withAuth({ ensureSignedIn: true });

  // If the user has no firstName, or no organizationId,
  // then they need to be redirected to /onboarding.

  if (!user.firstName || !organizationId) {
    redirect("/onboarding");
  }

  return <div></div>;
}
