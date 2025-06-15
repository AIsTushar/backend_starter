import { UserRole } from "@prisma/client";

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
}

export type TRole = "ADMIN" | "USER";

export interface ILoginUser {
  email: string;
  password: string;
}
