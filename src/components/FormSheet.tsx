/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import Image from "next/image";
import EditAvatar from "@/app/(app)/profile/_components/EditAvatar";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { IconCheck, IconChevronDown, IconPlus } from "@tabler/icons-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";

interface FormSheetProps {
  title: string;
  subtitle?: string;
  form: UseFormReturn<any | undefined>;
  onSubmit: (values: any) => void;
  fields: FormFieldProps[];
  btnSubmitText?: string;
  btnSubmitingText?: string;
  // btnCancelText?: string;
}

interface FormFieldPropsBase {
  name: string;
  label?: string;
  placeholder?: string;
  component?: string;
}

// Interfaces específicas para cada tipo de campo
interface InputFieldProps extends FormFieldPropsBase {
  type: string;
}

interface SelectFieldProps extends FormFieldPropsBase {
  data: readonly string[];
}

interface SelectMultiplyFieldProps extends FormFieldPropsBase {
  data: { id: string; name: string }[];
}

interface ComboboxFieldProps extends SelectMultiplyFieldProps {
  createEmpty: (value: string) => void;
  searchTerm: (term: string) => void;
}

const FormSheetInput = (
  f: InputFieldProps,
  field: ControllerRenderProps<any, string>
) => {
  return (
    <FormControl>
      <Input
        type={f.type}
        placeholder={f.placeholder}
        {...field}
        value={field.value}
      />
    </FormControl>
  );
};

const FormSheetTextarea = (
  f: FormFieldPropsBase,
  field: ControllerRenderProps<any, string>
) => {
  return (
    <FormControl>
      <Textarea placeholder={f.placeholder} {...field} value={field.value} />
    </FormControl>
  );
};

const FormSheetSelect = (
  f: SelectFieldProps,
  field: ControllerRenderProps<any>
) => {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="uppercase">
          <SelectValue placeholder="Selecione o tipo de contrato" {...field} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {f.data.map((contract, index) => (
          <SelectItem key={index} value={contract} className="uppercase">
            {contract}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const FormSheetSelectMultiply = (
  f: SelectMultiplyFieldProps,
  field: ControllerRenderProps<any>
) => {
  const [selected, setSelected] = useState<{ id: string; name: string }[]>(
    field.value.map((item: string) => {
      return f.data?.find((d) => d.id === item);
    }) || []
  );
  const _handleAdd = (value: string) => {
    const valueIndex = selected.findIndex((d) => d.id === value);
    let filtered: { id: string; name: string }[] = [];

    if (valueIndex !== -1) {
      // Remove item
      filtered = selected.filter((_, index) => index !== valueIndex);
      setSelected(filtered);
    } else {
      const add = f.data?.find((d) => d.id === value);
      if (add) {
        filtered = [...selected, add];
        setSelected(filtered);
      }
    }
    field.onChange(filtered.map((d) => d.id));
  };

  return (
    <div className="flex flex-col gap-3">
      <Select onValueChange={_handleAdd}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={f.placeholder} {...field} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {f.data?.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex flex-wrap gap-2">
        {selected.length > 0 &&
          selected.map((item, index) => <Badge key={index}>{item.name}</Badge>)}
      </div>
    </div>
  );
};

const FormSheetCombobox = (
  f: ComboboxFieldProps,
  field: ControllerRenderProps<any>
) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState<{ id: string; name: string }[]>(
    field.value.map((item: string) => {
      return f.data?.find((d) => d.id === item);
    }) || []
  );

  const _handleAdd = (value: string) => {
    const valueIndex = selected.findIndex((d) => d.id === value);
    let filtered: { id: string; name: string }[] = [];

    if (valueIndex !== -1) {
      // Remove item
      filtered = selected.filter((_, index) => index !== valueIndex);
      setSelected(filtered);
    } else {
      const add = f.data?.find((d) => d.id === value);
      if (add) {
        filtered = [...selected, add];
        setSelected(filtered);
      }
    }
    field.onChange(filtered.map((d) => d.id));
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {f.placeholder}
              <IconChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 ">
          <Command className="w-full max-h-60">
            <CommandInput
              onValueChange={(value) => {
                f.searchTerm(value);
                setValue(value);
              }}
              value={value}
              placeholder="Busque uma habilidade..."
            />
            <CommandList className="w-full">
              <CommandEmpty>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    f.createEmpty(
                      value
                        .trim()
                        .replace(/\b\w/g, (char) => char.toUpperCase())
                    );
                    f.searchTerm("");
                    setValue("");
                  }}
                >
                  <IconPlus className="mr-2 h-4 w-4" />
                  Criar &#34;{value}&#34;
                </Button>
              </CommandEmpty>
              <CommandGroup>
                {f.data
                  ?.map((item) => ({ value: item.id, label: item.name }))
                  .map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={_handleAdd}
                      className="flex justify-between"
                    >
                      {item.label}
                      <IconCheck
                        className={cn(
                          "mr-2 h-4 w-4",
                          selected.find((d) => d.id === item.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2">
        {selected.length > 0 &&
          selected.map((item, index) => <Badge key={index}>{item.name}</Badge>)}
      </div>
    </div>
  );
};

const FormSheetImage = (
  f: FormFieldPropsBase,
  field: ControllerRenderProps<any>
) => {
  return (
    <div className="relative flex flex-col items-center justify-center px-10 pt-10">
      <Image
        src={field.value}
        alt="Logo"
        width={352}
        height={100}
        priority={true}
        className="rounded-full border"
      />
      <EditAvatar
        className="absolute rounded-xl bottom-0 right-12"
        field={field}
      />
    </div>
  );
};

// Tipo unificado para os diferentes tipos de campos
export type FormFieldProps =
  | InputFieldProps
  | SelectFieldProps
  | SelectMultiplyFieldProps
  | ComboboxFieldProps;

const fieldsTypes: Record<
  string,
  (f: FormFieldProps, field: ControllerRenderProps<any>) => JSX.Element
> = {
  input: (f, field) => FormSheetInput(f as InputFieldProps, field),
  textarea: (f, field) => FormSheetTextarea(f, field),
  select: (f, field) => FormSheetSelect(f as SelectFieldProps, field),
  selectMultiply: (f, field) =>
    FormSheetSelectMultiply(f as SelectMultiplyFieldProps, field),
  image: (f, field) => FormSheetImage(f, field),
  combobox: (f, field) => FormSheetCombobox(f as ComboboxFieldProps, field),
};

const FormSheet = ({
  title,
  subtitle,
  form,
  onSubmit,
  fields,
  btnSubmitText,
  btnSubmitingText,
}: FormSheetProps) => {
  return (
    <SheetContent className="flex flex-col gap-10 border-none overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-2xl uppercase">
          <p>{title}</p>
          <p className="text-xs text-muted">{subtitle}</p>
        </SheetTitle>
      </SheetHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-screen flex-col justify-between items-start gap-3 inline-flex "
        >
          <div className="flex flex-col gap-5 w-full">
            {fields.map((f, i) => (
              <FormField
                key={i}
                control={form.control}
                name={f.name}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex w-full items-center justify-between">
                      <FormLabel>{f.label}</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    {fieldsTypes[f.component || "input"](f, field)}
                  </FormItem>
                )}
              />
            ))}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? btnSubmitingText
              : btnSubmitText || "Salvar"}
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
};

export default FormSheet;
