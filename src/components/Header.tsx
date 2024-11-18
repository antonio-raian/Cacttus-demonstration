"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSidebar } from "./ui/sidebar";
import { IconMenu3 } from "@tabler/icons-react";
import { Button } from "./ui/button";

const Header = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="flex items-center w-full bg-white/5 rounded-2xl px-6 py-4 transition transform border border-solid shadow-[0_5px_5px_0_rgba(0,0,0,0.2)] border-white/5 md:hidden mb-4">
      <div className="flex w-full justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex max-h-14 cursor-pointer w-auto">
          <Image
            src="/logo.svg"
            alt="logo"
            width={180}
            height={120}
            priority={true}
          />
        </Link>
        {/* <MobileNav /> */}

        <Button
          size="icon"
          variant="outline"
          onClick={toggleSidebar}
          className="h-10 w-10"
        >
          <IconMenu3 size={40} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
