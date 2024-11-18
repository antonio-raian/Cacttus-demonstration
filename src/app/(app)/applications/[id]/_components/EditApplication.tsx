import FormSheet from "@/components/FormSheet";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { CONTRACTS, WORK_TYPES, STATUS } from "@/core/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEdit } from "@tabler/icons-react";
import { format } from "date-fns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  formApplicationFields,
  formApplicationSchema,
} from "../../_components/CreateApplication";
import { useApplications } from "@/core/hooks";

const EditApplication = () => {
  const { selectedApplication, _updateApplication } = useApplications();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formApplicationSchema>>({
    resolver: zodResolver(formApplicationSchema),
    defaultValues: {
      ...selectedApplication,
      status: STATUS.find((s) => s === selectedApplication?.status),
      contractType: CONTRACTS.find(
        (c) => c === selectedApplication?.contractType
      ),
      workStyle: WORK_TYPES.find((s) => s === selectedApplication?.workStyle),
      anotations: selectedApplication?.anotations || "",
      applicationDate:
        selectedApplication?.applicationDate &&
        format(new Date(selectedApplication?.applicationDate), "yyyy-MM-dd"),
    },
  });

  const onSubmit = async (values: z.infer<typeof formApplicationSchema>) => {
    // console.log(values);
    try {
      await _updateApplication({
        ...values,
        applicationDate: new Date(values.applicationDate + "Z-3"),
      });
      alert("Aplicação atualizada com sucesso!");
      setOpen(false);
    } catch (error) {
      alert("Erro ao atualizar aplicação");
      console.error(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <IconEdit stroke={2} />
        </Button>
      </SheetTrigger>
      <FormSheet
        title="Criar aplicação"
        form={form}
        onSubmit={onSubmit}
        fields={formApplicationFields.filter(
          (field) => field.name !== "status"
        )}
        btnSubmitText="Salvar"
        btnSubmitingText="Salvando..."
      />
    </Sheet>
  );
};

export default EditApplication;
