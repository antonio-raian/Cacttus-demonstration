"use server";
import prisma from "@/lib/prisma";
import { History } from "@prisma/client";

export const createHistory = async (
  body: Omit<History, "id" | "createdAt">
): Promise<History> => {
  return await prisma.history.create({ data: body });
};

export const getHistoryByApplicationId = async (applicationId: number) => {
  return await prisma.history.findMany({
    where: { applicationId },
    orderBy: [{ id: "asc" }, { createdAt: "desc" }],
  });
};

export const deleteHistory = async (id: string) => {
  return await prisma.history
    .delete({ where: { id } })
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err;
    });
};
