"use server";

import workos from "@/lib/workos";
import prisma from "@/packages/prisma";
import { withAuth } from "@workos-inc/authkit-nextjs";

const createOrganization = async ({
  name,
  slug,
}: {
  name: string;
  slug: string;
}) => {
  try {
    const { user } = await withAuth();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const organization = await workos.organizations.createOrganization({
      name,
      metadata: {
        slug,
        tier: "FREE",
      },
    });

    // Add the user to the organization
    await workos.userManagement.createOrganizationMembership({
      organizationId: organization.id,
      userId: user.id,
      roleSlug: "owner",
    });

    await prisma.organization.create({
      data: {
        id: organization.id,
        name,
        slug,
      },
    });

    return organization;
  } catch (err) {
    console.error("Error creating organization:", err);
    throw err;
  }
};

export { createOrganization };
