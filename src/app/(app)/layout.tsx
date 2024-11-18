import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ApplicationProvider } from "@/core/contexts/ApplicationContext";
import React from "react";

const ApplicationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto h-svh flex flex-col gap-5">
      <ApplicationProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="relative flex-1 p-4 max-h-svh overflow-y-auto md:overflow-y-hidden">
            <SidebarTrigger className="absolute top-0 -left-2 hidden md:flex" />
            <Header />
            {children}
            {/* <Footer /> */}
          </main>
        </SidebarProvider>
      </ApplicationProvider>
    </div>
  );
};

export default ApplicationLayout;
