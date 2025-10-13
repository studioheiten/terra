import { PrismaClient } from "@prisma/client";
export * from "./generated/zod/schemas";

const prisma = new PrismaClient();

export default prisma;
