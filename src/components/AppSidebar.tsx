import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "./ui/sidebar";
import Link from "next/link";
import MyLogo from "./graphics/myLogo";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import ProfileUser from "../app/(app)/profile/_components/ProfileUser";

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {/* Logo */}
        <Link
          href="/"
          className="flex justify-center items-center max-h-14 cursor-pointer w-full"
        >
          <MyLogo />
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <ProfileUser />
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <div className="flex items-center justify-center gap-3">
          <div className="text-center text-xs font-bold tracking-widest">
            Desenvolvido por
          </div>
          <Link
            href="https://github.com/antonio-raian"
            target="_blank"
            className="text-foreground text-xs font-bold tracking-wider flex items-center hover:underline gap-1"
          >
            <IconBrandGithubFilled className="w-5 h-5" />
            antonio-raian
          </Link>
        </div>
        {/* <Footer /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
