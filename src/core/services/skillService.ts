"use server";
import prisma from "@/lib/prisma";
import { Skill } from "@prisma/client";

export const getSkills = async (): Promise<Skill[]> => {
  return await prisma.skill.findMany();
};

export const createSkill = async (
  body: Omit<Skill, "id" | "createdAt" | "updatedAt">
): Promise<Skill> => {
  return await prisma.skill.create({ data: body });
};
