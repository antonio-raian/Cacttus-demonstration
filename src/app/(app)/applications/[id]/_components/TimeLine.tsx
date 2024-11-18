import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useHistory } from "@/core/hooks";
import { IconTrash, IconWriting } from "@tabler/icons-react";
import { format } from "date-fns";
import React from "react";

// interface TimeLineProps {}

const TimeLine = () => {
  const { loading, history, _deleteHistory } = useHistory();

  const isFinished = (status: string) => {
    return status === "rejected" || status === "declined";
  };

  if (loading)
    return (
      <ul className="timeline timeline-vertical md:timeline-horizontal">
        <li className="gap-1">
          <Skeleton className="timeline-start w-36 h-12" />
          <Skeleton className="timeline-middle w-5 h-5 rounded-full" />
          <Skeleton className="timeline-end w-36 h-12" />
        </li>
      </ul>
    );

  return (
    <ul className="timeline timeline-vertical md:timeline-horizontal">
      {history?.map((attualization, index) => (
        <li key={index} className="gap-1">
          {index !== 0 && (
            <hr
              className={
                isFinished(attualization.status!)
                  ? "bg-gradient-to-b md:bg-gradient-to-r from-primary/50 to-destructive/50"
                  : "bg-primary/50"
              }
            />
          )}
          <div
            className={`${
              index % 2 !== 0 ? "timeline-end" : "timeline-start"
            } timeline-start text-center w-full`}
          >
            {format(attualization.createdAt!, "dd/MM/yyyy")}
          </div>
          <div className="timeline-middle">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5 20.5C16.0228 20.5 20.5 16.0228 20.5 10.5C20.5 4.97715 16.0228 0.5 10.5 0.5C4.97715 0.5 0.5 4.97715 0.5 10.5C0.5 16.0228 4.97715 20.5 10.5 20.5ZM10.5 14.5C12.7091 14.5 14.5 12.7091 14.5 10.5C14.5 8.29086 12.7091 6.5 10.5 6.5C8.29086 6.5 6.5 8.29086 6.5 10.5C6.5 12.7091 8.29086 14.5 10.5 14.5Z"
                fill={
                  index === 0
                    ? "#3b82f6"
                    : isFinished(attualization.status!)
                      ? "#CD3232"
                      : "#27A556"
                }
              />
            </svg>
          </div>
          <Popover>
            <PopoverTrigger
              className={`${
                index % 2 === 0 ? "timeline-end" : "timeline-start"
              } border px-6 py-2 font-medium  rounded-md bg-background border-border shadow-xl capitalize flex items-center gap-1 `}
            >
              <IconWriting className="h-[22px] w-[22px] text-foreground/50" />
              {attualization.status}
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              sideOffset={10}
              align={index % 2 !== 0 ? "end" : "start"}
              className="border-none align-top"
            >
              <div className="flex justify-between items-center ">
                <p className="text-sm font-normal text-foreground/50 tracking-tight">
                  Anotações
                </p>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => _deleteHistory(attualization.id)}
                >
                  <IconTrash />
                </Button>
              </div>
              <p>{attualization.anotation}</p>
            </PopoverContent>
          </Popover>
          {index !== history.length - 1 && (
            <hr
              className={
                index === 0
                  ? "bg-gradient-to-b md:bg-gradient-to-r to-primary/50 from-[#3b82f6]"
                  : "bg-primary/50"
              }
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default TimeLine;
