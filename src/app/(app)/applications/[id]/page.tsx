/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";

import { IconTrash } from "@tabler/icons-react";
import { format } from "date-fns";
import { use, useEffect } from "react";
import TimeLine from "./_components/TimeLine";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import NotFoundCard from "@/components/NotFoundCard";
import { Moeda } from "@/core/utils";
import { useRouter } from "next/navigation";
import EditApplication from "./_components/EditApplication";
import { useApplications, useUser } from "@/core/hooks";
import CreateHistory from "./_components/CreateHistory";
import { Skeleton } from "@/components/ui/skeleton";
import DrawerDialog from "@/components/DrawerDialog";
import { DrawerClose } from "@/components/ui/drawer";
import Link from "next/link";

const statusTextColor: Record<string, string> = {
  applied: "text-blue-500",
  interview: "text-secondary",
  testing: "text-secondary",
  accepted: "text-primary",
  offer: "text-primary",
  rejected: "text-destructive",
  declined: "text-destructive",
};

const ApplicationDetails = ({ params }: any) => {
  const router = useRouter();
  const { id } = use<any>(params);
  const { loading } = useUser();
  const { selectedApplication, _getApplicationDetails, _deleteApplication } =
    useApplications();

  const site = selectedApplication?.link.split("/")[2];

  useEffect(() => {
    _getApplicationDetails(+id);
  }, [_getApplicationDetails, id]);

  const handleDelete = async () => {
    try {
      if (selectedApplication) {
        await _deleteApplication(selectedApplication?.id);
        alert("Aplicação Removida com sucesso!");
        router.push("/applications");
      }
    } catch (error) {
      alert("Erro ao remover aplicação");
      console.error(error);
    }
  };

  if (loading)
    return (
      <Skeleton className="inline-flex flex-col w-full h-screen md:border border-border rounded-2xl justify-between items-center  max-h-[586px]" />
    );

  return (
    <div className="flex flex-col h-full w-full justify-start items-center font-['Satoshi']">
      {selectedApplication ? (
        // Main Card
        <div className="inline-flex flex-col w-full md:border border-border rounded-2xl justify-between items-center md:px-6 md:py-5 ">
          {/* Header */}
          <div className="flex w-full justify-start items-start pl-2.5 pb-3.5 gap-2.5">
            <div className="flex flex-col flex-grow justify-start items-start">
              <h1 className="text-2xl font-medium break-words">
                {selectedApplication.title}
              </h1>

              <p className="text-sm py-0.5 justify-start items-center gap-1 inline-flex ">
                Applied on:{" "}
                <span className="font-bold text-base text-primary">
                  {format(
                    new Date(selectedApplication.applicationDate!),
                    "dd/MM/yyyy"
                  )}
                </span>
              </p>
            </div>
            <div className="w-1/3 px-5 py-1.5 flex-col justify-start items-start gap-1 inline-flex ">
              <p className="text-sm font-normal text-foreground/50 tracking-tight">
                Status:
              </p>
              <p
                className={clsx(
                  statusTextColor[selectedApplication.status] ||
                    "bg-foreground",
                  " capitalize text-xl font-normal tracking-tight"
                )}
              >
                {selectedApplication.status}
              </p>
            </div>
            <div className="inline-flex flex-col md:flex-row gap-2">
              <EditApplication />
              <DrawerDialog
                trigger={
                  <Button variant="outline" size="icon">
                    <IconTrash className="text-destructive" />
                  </Button>
                }
                title="Excluir Candidatura"
                subtitle="Tem certeza que deseja excluir esta candidatura?"
              >
                <div className="flex flex-col gap-4 p-4 justify-center items-center">
                  {selectedApplication.title}

                  <DrawerClose asChild>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleDelete}
                    >
                      Confirmar
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerDialog>
            </div>
          </div>
          {/* Details */}
          <div className="w-full p-1.5 rounded border border-border flex-col justify-start items-start inline-flex ">
            {/* Company + Link */}
            <div className="w-full self-stretch px-1 py-2.5 justify-start items-center inline-flex basis border-b-2 flex-col border-border md:flex-row gap-2.5">
              {/* Company */}
              <div className="w-full px-5 py-1 pb-3 flex-col justify-start items-start gap-1 inline-flex md:border-r-2 border-b-2 md:border-b-0  border-border">
                <p className="self-stretch text-sm font-normal  text-foreground/50 tracking-tight">
                  Company Name
                </p>
                <p className="self-stretch text-xl font-normal tracking-tight">
                  {selectedApplication.company}
                </p>
              </div>
              {/* Link */}
              <div className="w-full px-5 py-1 flex-col justify-start items-start gap-1 inline-flex ">
                <p className="self-stretch text-sm font-normal text-foreground/50 tracking-tight">
                  Link Application
                </p>
                <Link
                  href={selectedApplication.link}
                  target="_blank"
                  className="max-w-[30vw] self-stretch text-xl font-normal tracking-tight text-blue-500 underline underline-offset-4 truncate"
                >
                  {site}
                </Link>
              </div>
            </div>
            {/* WorkType + Contract + Compensation */}
            <div className="w-full self-stretch px-1 py-2.5 justify-start items-center inline-flex flex-col md:flex-row ">
              {/* Contract */}
              <div className="w-full px-5 py-3 md:py-1 flex-col justify-start items-start gap-1 inline-flex md:border-r-2 border-b-2 md:border-b-0 border-border pb-3">
                <p className="text-sm font-normal text-foreground/50 tracking-tight">
                  Contract Type
                </p>
                <p className="text-xl font-normal tracking-tight uppercase">
                  {selectedApplication.contractType}
                </p>
              </div>
              {/* WorkType */}
              <div className="w-full px-5 py-3 md:py-1 flex-col justify-start items-start gap-1 inline-flex border-border md:border-r-2 border-b-2 md:border-b-0">
                <p className="text-sm font-normal text-foreground/50 tracking-tight">
                  Modelo de Trabalho
                </p>
                <p className="text-xl font-normal tracking-tight capitalize">
                  {selectedApplication.workStyle}
                </p>
              </div>
              {/* Compensation */}
              <div className="w-full px-5 py-3 md:py-1 flex-col justify-start items-start gap-1 inline-flex border-border">
                <p className="text-sm font-normal text-foreground/50 tracking-tight">
                  Compensation
                </p>
                <p className="text-xl font-normal tracking-tight">
                  {Moeda.formatar(selectedApplication.compensation || 0)}
                </p>
              </div>
            </div>
          </div>
          {/* TL Title */}
          <div className="w-full pl-2 inline-flex justify-between items-center py-3">
            <div className="w-full flex-col justify-center items-start inline-flex">
              <div className="self-stretch text-xl font-normal">Histórico</div>
              <div className="self-stretch text-foreground/50 text-xs font-normal font-['Satoshi']">
                O que aconteceu até agora...
              </div>
            </div>
            <CreateHistory
              disabled={
                selectedApplication.status === "rejected" ||
                selectedApplication.status === "declined"
              }
            />
          </div>
          {/* TL Details */}
          <Card className="w-full py-5 rounded-md border border-border justify-center items-center inline-flex overflow-y-auto">
            <CardContent>
              <TimeLine />
            </CardContent>
          </Card>
        </div>
      ) : (
        <NotFoundCard
          title="Candidatura não encontrada"
          description="Candidatura não encontrada. Escolha alguma na tela de Candidaturas."
        />
      )}
    </div>
  );
};

export default ApplicationDetails;
