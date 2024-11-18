"use client";

import FormSheet from "@/components/FormSheet";
import { Button } from "@/components/ui/button";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useUser } from "@/core/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconUsersPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formUserFields = [
  {
    name: "name",
    label: "Nome",
    type: "text",
    placeholder: "Como você gostaria de ser chamado(a)?",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Seu melhor e-mail",
  },
];

const CreateUser = () => {
  const { _createUser } = useUser();

  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    name: z.string().trim().min(1, { message: "Por favor, informe seu nome" }),
    email: z.string().email().trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await _createUser(values);
      alert("Usuário criado com sucesso!");
      setOpen(false);
      form.reset();
      // toast.success("Usuário criado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar usuário!");
      // toast.error("Erro ao criar usuário! Erro ao criar usuário!");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="w-full">
        <Button variant="outline" className="flex gap-2">
          <IconUsersPlus size={20} stroke={2} />
          Criar usuário
        </Button>
      </SheetTrigger>
      <FormSheet
        title="Criar usuário"
        form={form}
        onSubmit={onSubmit}
        fields={formUserFields}
        btnSubmitText="Salvar"
        btnSubmitingText="Salvando..."
      />
    </Sheet>
  );
};

export default CreateUser;
