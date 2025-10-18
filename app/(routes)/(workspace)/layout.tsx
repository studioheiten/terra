"use server";

import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function WorkspaceLayout() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return <div></div>;
}
