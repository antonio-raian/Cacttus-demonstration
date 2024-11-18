import { Prisma } from "@prisma/client";

export type IUser = Partial<
  Prisma.UserGetPayload<{ include: { skills: true } }>
>;
