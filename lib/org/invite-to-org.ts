"use server";

import { withAuth } from "@workos-inc/authkit-nextjs";
import workos from "../workos";

const inviteEmailsToOrganization = async ({
  organizationId,
  emails,
}: {
  organizationId: string;
  emails: string[];
}) => {
  try {
    const { user } = await withAuth();
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Check permissions
    const userMembership =
      await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
      });

    const isUserAdmin = userMembership.data.some((membership) => {
      return (
        membership.organizationId === organizationId &&
        membership.role.slug === "owner"
      );
    });

    if (!isUserAdmin) {
      throw new Error("User is not authorized to invite others");
    }

    // Create invite promises
    const promises = emails.map(async (email) => {
      await workos.userManagement.sendInvitation({
        email,
        organizationId: organizationId,
        roleSlug: "member",
      });
    });

    await Promise.all(promises);
  } catch (err) {
    console.error("Error inviting emails to organization:", err);
    throw err;
  }
};

export { inviteEmailsToOrganization };
