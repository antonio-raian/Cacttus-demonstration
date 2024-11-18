"use client";
import React from "react";
import { IconAlertOctagonFilled } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useLocalStorage } from "@/core/hooks";

interface WarningProps {
  className?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Warning = ({ className, title, subtitle, children }: WarningProps) => {
  const { obterItem, salvarItem } = useLocalStorage();
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    if (obterItem("@aware:warning")) {
      setOpen(false);
    }
  }, [obterItem]);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        salvarItem("@aware:warning", true);
        setOpen(!open);
      }}
    >
      <DialogTrigger className={className} asChild>
        <Button variant="destructive">
          <IconAlertOctagonFilled />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-0 bg-destructive ">
        <DialogTitle className="flex items-center gap-2">
          <IconAlertOctagonFilled />
          {title}
        </DialogTitle>
        <DialogDescription>{subtitle}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Warning;
