/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { getAvatarList } from "@/core/utils/avatars";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { IconCheck, IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import React, { HTMLAttributes, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
interface EditAvatarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  field: ControllerRenderProps<any, string>;
}
const EditAvatar = ({ className, field }: EditAvatarProps) => {
  const [avatar, setAvatar] = useState<string>("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [mainOpen, setMainOpen] = useState(false);

  return (
    <>
      <Dialog open={mainOpen} onOpenChange={setMainOpen}>
        <DialogTrigger className={className} asChild>
          <Button variant="outline" size="icon">
            <IconEdit stroke={2} />
            <span className="sr-only">Edit avatar</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] w-[90vw] overflow-y-auto">
          <DialogTitle>Escolhendo Avatar</DialogTitle>
          <DialogDescription>Seleciona um desses avatares:</DialogDescription>
          <div>
            <div className="flex flex-wrap w-full gap-2 h-full overflow-y-auto">
              {getAvatarList("notionists", 100).map((avatarSrc, i) => (
                <Image
                  key={i}
                  src={avatarSrc}
                  alt={`Avatar option ${i + 1}`}
                  width={100}
                  height={100}
                  onClick={() => {
                    setAvatar(avatarSrc);
                    setIsPreviewOpen(true);
                  }}
                  className="cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent
          className="max-w-sm"
          onAbort={() => {
            console.log("reset");
            setAvatar("");
          }}
        >
          <DialogTitle></DialogTitle>
          {avatar && (
            <Image
              src={avatar}
              alt="Avatar preview"
              width={150}
              height={150}
              className="w-full h-auto border"
            />
          )}
          <Button
            onClick={() => {
              field.onChange(avatar);
              setMainOpen(false);
              setIsPreviewOpen(false);
            }}
          >
            <IconCheck />
            Escolher
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditAvatar;
