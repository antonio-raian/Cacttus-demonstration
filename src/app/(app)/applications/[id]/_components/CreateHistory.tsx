import FormSheet, { FormFieldProps } from "@/components/FormSheet";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { STATUS } from "@/core/constants";
import { useHistory } from "@/core/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formHistoryFields: FormFieldProps[] = [
  {
    name: "status",
    label: "Status Atual",
    type: "select",
    placeholder: "Selecione o status",
    component: "select",
    data: STATUS,
  },
  {
    name: "anotation",
    label: "Anotação",
    type: "textarea",
    placeholder: "Adicione alguma anotação",
  },
];

const CreateHistory = ({ disabled }: { disabled: boolean }) => {
  const { _createHistory } = useHistory();

  const [open, setOpen] = useState(false);

  const formHistorySchema = z.object({
    status: z.enum(STATUS, {
      required_error: "Por favor, informe o status da vaga",
    }),
    anotation: z.string().trim(),
  });

  const form = useForm<z.infer<typeof formHistorySchema>>({
    resolver: zodResolver(formHistorySchema),
    defaultValues: {
      status: STATUS[0],
      anotation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formHistorySchema>) => {
    // console.log(values);
    try {
      await _createHistory({
        ...values,
      });
      alert("Aplicação atualizada com sucesso!");
      setOpen(false);
      form.reset();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="flex items-center justify-center gap-2"
          disabled={disabled}
        >
          <IconPlus className="h-4 w-4" />
          <span className="">Novo Status</span>
        </Button>
      </SheetTrigger>
      <FormSheet
        title="Criar Novo Status"
        form={form}
        fields={formHistoryFields}
        onSubmit={onSubmit}
        btnSubmitText="Salvar"
        btnSubmitingText="Salvando..."
      />
    </Sheet>
  );
};

export default CreateHistory;
