"use server";
import prisma from "@/lib/prisma";
import { Application, History } from "@prisma/client";

export const createApplication = async (
  body: Omit<Application, "id" | "createdAt">
): Promise<Application> => {
  const historyArray: Partial<History>[] = [
    {
      status: "applied",
      anotation: "Application created",
      createdAt: body.applicationDate,
    },
  ];
  if (body.status !== "applied")
    historyArray.push({
      status: body.status,
    });

  return await prisma.application.create({
    data: {
      ...body,
      history: {
        create: historyArray,
      },
    },
  });
};

export const updateApplication = async (
  body: Partial<Application>
): Promise<Application> => {
  return await prisma.application.update({
    where: { id: body.id },
    data: { ...body, updatedAt: new Date() },
    include: { history: true },
  });
};

export const deleteApplication = async (id: number) => {
  console.log(id);
  return await prisma.application.delete({
    where: { id },
  });
};

export const getApplicationById = async (
  id: number
): Promise<Application | null> => {
  const app = await prisma.application.findUnique({
    where: { id },
  });

  return app;
};

export const getApplicationsByUserId = async (
  id: string
): Promise<Application[]> => {
  return await prisma.application.findMany({
    where: { userId: id },
    orderBy: { createdAt: "desc" },
  });
};
