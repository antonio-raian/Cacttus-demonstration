"use client";

import React, { useEffect } from "react";
import NotFoundCard from "@/components/NotFoundCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/core/hooks/useLocalStorage";
import ApplicationCard from "./ApplicationCard";
import { useApplications, useUser } from "@/core/hooks";

const ListApplication = () => {
  const { loading } = useUser();
  const { applications } = useApplications();

  const router = useRouter();
  const { obterItem } = useLocalStorage();

  const { selectedUser } = useUser();

  useEffect(() => {
    const user: { id: string; name: string } = obterItem("@user");

    if (!user && !selectedUser?.id) return router.push("/login");
  }, [selectedUser, router, obterItem]);

  if (loading) {
    return (
      // <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto p-1.5 rounded-sm">
      <div className="flex flex-wrap gap-4 overflow-y-auto p-1.5 rounded-sm">
        <Skeleton className="md:max-w-64 min-w-60 p-2 shadow-xl border-none max-h-56 h-screen" />
        <Skeleton className="md:max-w-64 min-w-60 p-2 shadow-xl border-none max-h-56 h-screen" />
        <Skeleton className="md:max-w-64 min-w-60 p-2 shadow-xl border-none max-h-56 h-screen" />
      </div>
    );
  }

  return applications && applications.length > 0 ? (
    <div className="scroll-smooth w-full flex flex-wrap gap-4 py-4 rounded-sm overflow-y-auto">
      {applications.map((application) => (
        <ApplicationCard
          routeTo={`/applications/${application.id}`}
          key={application.id}
          title={application.title || ""}
          company={application.company || ""}
          workStyle={application.workStyle || ""}
          applicationDate={application.applicationDate!}
          status={application.status || ""}
          contract={application.contractType || ""}
        />
      ))}
    </div>
  ) : (
    <div className="w-full flex justify-center items-center py-10">
      <NotFoundCard
        title="Lista Vazia"
        description="Nenhuma candidatura encontrada"
      />
    </div>
  );
};

export default ListApplication;
