"use server";

import prisma from "@/packages/prisma";

export async function checkOrgSlugExists(slug: string): Promise<boolean> {
  try {
    const existingOrg = await prisma.organization.findUnique({
      where: { slug },
      select: { id: true },
    });

    return !!existingOrg;
  } catch (error) {
    console.error("Error checking organization slug:", error);
    return false;
  }
}
