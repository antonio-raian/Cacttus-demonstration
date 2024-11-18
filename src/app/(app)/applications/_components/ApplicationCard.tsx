import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { IconBriefcase, IconCalendar } from "@tabler/icons-react";
import clsx from "clsx";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

interface ApplicationCardProps {
  title: string;
  company: string;
  workStyle: string | null;
  applicationDate: Date;
  status: string;
  routeTo: string;
  contract: string | null;
}

const statusBgColor: Record<string, string> = {
  applied: "bg-blue-500",
  interview: "bg-secondary",
  testing: "bg-secondary",
  accepted: "bg-primary",
  offer: "bg-primary",
  rejected: "bg-destructive",
  declined: "bg-destructive",
};

const ApplicationCard = ({
  title,
  company,
  workStyle,
  applicationDate,
  status,
  routeTo,
  contract,
}: ApplicationCardProps) => {
  return (
    <Card className="flex flex-col w-full md:max-w-64 min-w-60 p-2 font-['Satoshi'] shadow-lg border-none max-h-56 ">
      <Link href={routeTo}>
        <CardHeader className="flex w-full justify-between ">
          <CardTitle className="flex items-center justify-between w-full uppercase gap-4">
            <span className="text-base font-bold w-2/3 italic truncate whitespace-nowrap">
              {title}
            </span>

            <div
              className={clsx(
                statusBgColor[status] || "bg-primary",
                " inline-flex justify-center items-center rounded-full w-3 h-3"
              )}
            ></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5 justify-center items-center">
            <div className="flex w-full justify-between items-center md:block md:space-y-2">
              <div className="flex items-center text-sm text-foreground justify-around">
                <IconCalendar className="mr-2 h-6 w-6 " />
                <span className="w-full break-words ">
                  {format(applicationDate, "dd/MM/yyyy")}
                </span>
              </div>
              <div className="flex items-center text-sm text-foreground ">
                <IconBriefcase className="mr-2 h-6 w-6" />
                <span className="w-full break-words">{company}</span>
              </div>
            </div>
            <div className="flex items-center text-sm text-foreground">
              <div className="flex flex-wrap gap-3 uppercase">
                <Badge variant="outline">{workStyle}</Badge>
                <Badge variant="outline">{contract}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ApplicationCard;
