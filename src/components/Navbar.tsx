"use client";

import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useApplications, useUser } from "@/core/hooks";

export const menuLinks = [
  // {
  //   name: "home",
  //   href: "/dashboard",
  // },
  {
    name: "applications",
    href: "/applications",
  },
];

export default function Navbar() {
  const { selectedUser, _resetUser } = useUser();
  const { _resetApplications } = useApplications();
  const pathname = usePathname();

  const _handleLogout = () => {
    // localStorage.clear();
    _resetApplications();
    _resetUser();
  };

  return (
    <nav className="flex justify-center items-center gap-8">
      {menuLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`${
            link.href.includes(pathname) &&
            "border-b-2 border-solid border-foreground"
          } text-primary capitalize text-xl hover:text-accent transition-all`}
        >
          {link.name}
        </Link>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src="" alt="User" />
            <AvatarFallback>
              {selectedUser?.name ? selectedUser?.name[0] : "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="text-primary">
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/login" onClick={_handleLogout}>
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
