"use server";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { IUser } from "../interfaces";

export type tUser = {
  name: string;
  email: string;
};
export const createUser = async (body: tUser): Promise<User> => {
  return await prisma.user.create({ data: body });
};

export const updateUser = async (
  body: Partial<User>,
  skills: string[]
): Promise<IUser> => {
  return await prisma.user.update({
    where: { id: body.id },
    data: {
      ...body,
      skills: { set: skills.map((s) => ({ id: s })) },
    },
    include: { skills: true },
  });
};

export const deleteUser = async (id: string) => {
  return await prisma.user
    .delete({ where: { id } })
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err;
    });
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await prisma.user.findUnique({
    where: { id },
    include: { skills: { orderBy: { name: "asc" } } },
  });
};
export const getUsers = async (): Promise<IUser[]> => {
  return await prisma.user.findMany({
    include: { skills: true },
  });
};
