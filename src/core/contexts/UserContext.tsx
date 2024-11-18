"use client";

import { User } from "@prisma/client";
import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { getUsers, tUser } from "../services/userService";
import useLocalStorage from "../hooks/useLocalStorage";
import { IUser } from "../interfaces";
import { getAvatar } from "../utils";

type UserContextType = {
  users: Partial<IUser>[];
  selectedUser: IUser | undefined;
  loading: boolean;
  error: string | null;
  setSelectedUser: (user: Partial<IUser>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  _getAllUsers: () => Promise<void>;
  _createUser: (body: tUser) => void;
  _resetUser: () => void;
  _validateUser: (user?: Partial<User>) => Promise<boolean>;
  _updateUser: (user: Partial<User>) => Promise<IUser>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { obterItem, salvarItem } = useLocalStorage();

  const [users, setUsers] = useState<Partial<IUser>[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const _validateUser = useCallback(
    async (user?: Partial<IUser>) => {
      const u = user || obterItem("@user");

      if (!u) return false;
      // const resDB = await getUserById(u?.id);
      const resDB = obterItem("@users").find((uDB: IUser) => uDB.id === u.id);

      if (!resDB) return false;

      setSelectedUser(resDB);
      return true;
    },
    [setSelectedUser, obterItem]
  );

  const _resetUser = () => {
    setSelectedUser(undefined);
    setUsers([]);
    setLoading(true);
    setError(null);
    salvarItem("@user", null);
  };

  const _getAllUsers = useCallback(async () => {
    setLoading(true);
    try {
      const usersLocal = obterItem("@users") || [];
      let dbUsers: IUser[] = [];
      if (!usersLocal.length) {
        dbUsers = await getUsers();
      }
      salvarItem("@users", [...usersLocal, ...dbUsers]);
      setUsers([...usersLocal, ...dbUsers]);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [obterItem, salvarItem]);

  const _createUser = (body: tUser) => {
    setLoading(true);
    try {
      const userLocal = {
        id: users.length.toString(36),
        ...body,
        createdAt: new Date(),
        image: getAvatar({ variant: "notionists", seed: body.email }),
        skills: [],
      };
      salvarItem("@users", [...users, userLocal]);
      // const userLocal = await createUser(body);
      setUsers([...users, userLocal]);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const _updateUser = async (user: Partial<User>) => {
    setLoading(true);
    try {
      const index = users.findIndex((u: IUser) => u.id === user.id);

      const upUser: IUser = {
        ...user,
        skills: [],
        updatedAt: new Date(),
      } as IUser;

      users[index] = upUser;

      // const upUser = await updateUser(user, skills);
      salvarItem("@users", users);
      salvarItem("@user", upUser);
      setSelectedUser(upUser as IUser);
      return user;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _validateUser();
    _getAllUsers();
  }, [_getAllUsers, _validateUser]);

  return (
    <UserContext.Provider
      value={{
        users,
        selectedUser,
        loading,
        error,
        setSelectedUser,
        setLoading,
        setError,
        _getAllUsers,
        _createUser,
        _resetUser,
        _validateUser,
        _updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
