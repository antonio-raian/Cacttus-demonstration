"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { IconMenu3 } from "@tabler/icons-react";
import Image from "next/image";
import { menuLinks } from "./Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useApplications, useUser } from "@/core/hooks";

const MobileNav = () => {
  const { selectedUser, _resetUser } = useUser();
  const { _resetApplications } = useApplications();
  const userName = "user";
  const pathname = usePathname();

  const _handleLogout = () => {
    // localStorage.clear();
    _resetApplications();
    _resetUser();
  };
  return (
    <Sheet>
      <SheetTrigger>
        <IconMenu3 />
      </SheetTrigger>

      <SheetContent className="flex flex-col max-w-screen-sm p-6 border-0 gap-8 h-svh rounded-l-2xl ">
        <SheetTitle className="text-3xl font-bold">
          <Link href="/">
            <div className="flex justify-center w-auto max-h-14">
              <Image src="/logo.svg" alt="logo" width={352} height={120} />
            </div>
          </Link>
        </SheetTitle>
        <div className="flex flex-col gap-8 justify-between h-full">
          <nav className="flex flex-col ">
            {menuLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-2xl font-bold text-primary"
              >
                <SheetClose
                  key={index}
                  className={`${
                    link.href.includes(pathname) &&
                    "border-b-2 border-solid border-foreground"
                  } text-primary capitalize text-xl hover:text-accent transition-all`}
                >
                  {link.name}
                </SheetClose>
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <Link href={`/profile/${userName}`}>
              <SheetClose className="flex justify-center items-center w-full gap-4">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback>
                    {selectedUser?.name ? selectedUser?.name[0] : "U"}
                  </AvatarFallback>
                </Avatar>
                {selectedUser?.name || "User"}
              </SheetClose>
            </Link>
            <Button variant="destructive" asChild>
              <Link href="/login" onClick={_handleLogout}>
                <SheetClose className="flex justify-center items-center w-full gap-4">
                  Logout
                </SheetClose>
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
