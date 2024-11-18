"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useApplications, useUser } from "@/core/hooks";
import { getAvatar } from "@/core/utils";
import { IconLogout2, IconUser } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import EditUser from "./EditUser";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileUser = () => {
  const { open, toggleSidebar } = useSidebar();
  const { loading, selectedUser, _resetUser } = useUser();
  const { _resetApplications } = useApplications();

  const router = useRouter();

  const _handleLogout = () => {
    // localStorage.clear();
    _resetApplications();
    _resetUser();
    router.push("/login");
  };

  if (!open)
    return (
      <div className="w-full flex flex-col justify-center py-3 items-center">
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          <IconUser className="w-2 h-3" />
        </Button>
      </div>
    );

  if (loading)
    return (
      <div className="w-full flex flex-col justify-between h-full py-5">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="relative flex flex-col items-center justify-center px-10 pt-10">
            <Skeleton className="rounded-full h-44 w-44"></Skeleton>
          </div>
          <Skeleton className="flex w-60 h-9"></Skeleton>
          <Skeleton className="flex w-40 h-8"></Skeleton>
          <div className="w-full flex flex-wrap justify-center items-center px-3 mt-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="flex w-16 h-5 rounded-md m-1"
              ></Skeleton>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-full flex flex-col justify-between h-full py-5">
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex flex-col items-center justify-center px-10 pt-10">
          <Image
            src={
              selectedUser?.image ??
              getAvatar({
                variant: "notionists",
                seed: selectedUser?.id || "default",
              })
            }
            alt="Logo"
            width={352}
            height={100}
            priority={true}
            className="rounded-full border"
          />
          <EditUser className="absolute rounded-xl bottom-0 right-12" />
        </div>
        <h1 className="text-3xl font-bold">{selectedUser?.name}</h1>
        <p className="text-gray-500">{selectedUser?.email}</p>

        {/* <div className="w-full flex flex-wrap justify-center items-center px-3 mt-5">
          {selectedUser?.skills?.map((skill, index) => (
            <Badge key={index} variant="outline" className="m-1">
              {skill.name}
            </Badge>
          ))}
        </div> */}
      </div>

      <div className="w-full px-3">
        <Button
          size="sm"
          variant="outline-destructive"
          className="flex mx-2 w-full"
          onClick={_handleLogout}
        >
          Logout
          <IconLogout2 />
        </Button>
      </div>
    </div>
  );
};

export default ProfileUser;
