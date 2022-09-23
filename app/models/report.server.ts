import type { User, Report } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Report } from "@prisma/client";

export function getReport({
  id,
  userId,
}: Pick<Report, "id"> & {
  userId: User["id"];
}) {
  return prisma.report.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function getReportListItems({ userId }: { userId: User["id"] }) {
  return prisma.report.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createReport({
  body,
  title,
  userId,
}: Pick<Report, "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.report.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteReport({
  id,
  userId,
}: Pick<Report, "id"> & { userId: User["id"] }) {
  return prisma.report.deleteMany({
    where: { id, userId },
  });
}
