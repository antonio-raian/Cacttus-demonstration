import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconUsersPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import ApplicationSkills from "./applicationSkills";
import FormSheet, { FormFieldProps } from "@/components/FormSheet";
import { CONTRACTS, WORK_TYPES, STATUS } from "@/core/constants";
import { format } from "date-fns";
import { useApplications } from "@/core/hooks";

export const formApplicationFields: FormFieldProps[] = [
  {
    name: "title",
    label: "Título",
    type: "text",
    placeholder: "Como você gostaria de lembrar dessa vaga?",
  },
  {
    name: "company",
    label: "Empresa",
    type: "text",
    placeholder: "Qual é o nome da empresa?",
  },
  {
    name: "link",
    label: "Link da vaga",
    type: "text",
    placeholder: "Onde você pode acompanhar a vaga?",
  },
  {
    name: "contractType",
    label: "Tipo de Contrato",
    placeholder: "Selecione o tipo de contrato",
    component: "select",
    data: CONTRACTS,
  },
  {
    name: "workStyle",
    label: "Modelo de Trabalho",
    placeholder: "Selecione o modelo de trabalho",
    component: "select",
    data: WORK_TYPES,
  },
  {
    name: "applicationDate",
    label: "Data de aplicação",
    type: "date",
    placeholder: "Quando foi que tu se candidatou?",
  },
  {
    name: "compensation",
    label: "Salário",
    type: "number",
    placeholder: "Quanto vai pagar?",
  },
  {
    name: "status",
    label: "Status Atual",
    type: "select",
    placeholder: "Selecione o status da vaga",
    component: "select",
    data: STATUS,
  },
  {
    name: "anotations",
    label: "Comentários",
    placeholder: "Adicione alguma anotação",
    component: "textarea",
  } as FormFieldProps,
];

export const formApplicationSchema = z.object({
  id: z.number().optional(),
  title: z.string().trim().min(1, { message: "Por favor, informe o título" }),
  company: z.string().trim().min(1, { message: "Por favor, informe o nome" }),
  link: z.string().url({ message: "Por favor, informe um link válido" }).trim(),
  contractType: z.enum(CONTRACTS, {
    required_error: "Por favor, informe o tipo de contrato",
  }),
  workStyle: z.enum(WORK_TYPES, {
    required_error: "Por favor, informe o modelo de trabalho",
  }),
  applicationDate: z
    .string()
    .trim()
    .min(1, { message: "Por favor, informe a data de aplicação" }),
  compensation: z.coerce
    .number({
      invalid_type_error: "Por favor, informe o valor",
    })
    .gt(0),
  status: z.enum(STATUS, {
    required_error: "Por favor, informe o status da vaga",
  }),
  // skills: z
  //   .array(z.string())
  //   .min(1, { message: "Por favor, informe as habilidades" }),
  anotations: z.string().trim(),
  // historyAnotations: z.string().trim(),
});

interface CreateApplicationProps {
  className?: string;
}

const CreateApplication = ({ className }: CreateApplicationProps) => {
  const { _createApplication } = useApplications();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formApplicationSchema>>({
    resolver: zodResolver(formApplicationSchema),
    defaultValues: {
      title: "",
      company: "",
      link: "",
      contractType: "clt",
      workStyle: "remote",
      applicationDate: format(new Date(), "yyyy-MM-dd"),
      compensation: 1000,
      status: "applied",
      anotations: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formApplicationSchema>) => {
    try {
      await _createApplication({
        ...values,
        applicationDate: new Date(values.applicationDate + "Z-3"),
        updatedAt: null,
      });
      alert("Aplicação criada com sucesso!");
      setOpen(false);
      form.reset();
    } catch (error) {
      alert("Erro ao criar aplicação");
      console.error(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className={className}>
        <Button className="w-full md:max-w-72 flex gap-2">
          <IconUsersPlus size={20} stroke={2} />
          Nova Candidatura
        </Button>
      </SheetTrigger>
      <FormSheet
        title="Criar aplicação"
        form={form}
        onSubmit={onSubmit}
        fields={formApplicationFields}
        btnSubmitText="Salvar"
        btnSubmitingText="Salvando..."
      />
    </Sheet>
  );
};

export default CreateApplication;
