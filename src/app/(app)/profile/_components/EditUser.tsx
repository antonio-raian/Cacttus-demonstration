"use client";
import { formUserFields } from "@/app/login/_components/CreateUser";
import FormSheet, { FormFieldProps } from "@/components/FormSheet";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useUser } from "@/core/hooks";
import { getAvatar } from "@/core/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEdit } from "@tabler/icons-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EditUserProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const EditUser = ({ className }: EditUserProps) => {
  const { selectedUser, _updateUser } = useUser();

  const [open, setOpen] = useState(false);

  const formEditUserFields: FormFieldProps[] = [
    {
      name: "image",
      label: "Avatar",
      component: "image",
      placeholder: "Selecione uma imagem",
    } as FormFieldProps,
    ...formUserFields,
  ];

  const formUserSchema = z
    .object({
      name: z
        .string()
        .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
        .max(50, { message: "O nome deve ter no máximo 50 caracteres" }),
      email: z.string().email({ message: "O e-mail informado é inválido" }),
      image: z
        .string()
        .url({ message: "O link informado é inválido" })
        .nullable(),
    })
    .superRefine(({ name, email }, ctx) => {
      if (!name || !email) {
        ctx.addIssue({
          code: "custom",
          message: "O nome e o e-mail são obrigatórios",
        });
      }
    });

  const form = useForm<z.infer<typeof formUserSchema>>({
    resolver: zodResolver(formUserSchema),
    defaultValues: {
      name: selectedUser?.name,
      email: selectedUser?.email,
      image:
        selectedUser?.image ||
        getAvatar({
          variant: "notionists",
          seed: selectedUser?.id || "default",
        }),
    },
  });

  const onSubmit = async (data: z.infer<typeof formUserSchema>) => {
    console.log(data);
    try {
      await _updateUser({ ...data, id: selectedUser?.id });
      alert("Usuário atualizado com sucesso!");
      setOpen(false);
      // toast.success("Usuário criado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro ao atualizar usuário!");
      // toast.error("Erro ao criar usuário! Erro ao criar usuário!");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className={className}>
        <Button variant="outline" size="icon">
          <IconEdit stroke={2} />
        </Button>
      </SheetTrigger>
      <FormSheet
        title="Editando perfil"
        subtitle="Edite suas informações"
        form={form}
        onSubmit={onSubmit}
        fields={formEditUserFields}
        btnSubmitText="Salvar"
        btnSubmitingText="Salvando..."
      />
    </Sheet>
  );
};

export default EditUser;
