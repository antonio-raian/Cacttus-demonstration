"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CreateUser from "./_components/CreateUser";
import useLocalStorage from "@/core/hooks/useLocalStorage";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/core/hooks";

const Login = () => {
  const router = useRouter();
  const { users, loading, setSelectedUser, _getAllUsers } = useUser();
  const { salvarItem, obterItem } = useLocalStorage();

  useEffect(() => {
    const user = obterItem("@user");
    if (user) {
      setSelectedUser(user);
      router.push("/applications");
      return;
    }
    _getAllUsers();
  }, [_getAllUsers, setSelectedUser, router, obterItem]);

  const formSchema = z.object({
    user: z.string().trim().min(1, { message: "Selecione um usuário" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const user = users.find((user) => user.id === values.user)!;

    setSelectedUser(user);

    salvarItem("@user", user);

    router.push("/applications");
  };

  if (loading) {
    return (
      <Skeleton className="w-full h-full flex flex-col items-center gap-6 p-52 max-w-md md:rounded-2xl" />
    );
  }

  return (
    <Card className="relative flex flex-col w-full max-w-md bg-background/0 gap-7 md:bg-border/70 md:rounded-2xl px-0 pt-4 pb-8 border-0">
      <CardHeader className="flex w-full justify-between items-start">
        <div className="flex-col items-center justify-center w-full gap-2.5 inline-flex ">
          <CardTitle className="text-3xl">LOGIN</CardTitle>
          <div className="flex w-[130px] border-t-[1px] border-foreground"></div>
          <CardDescription className="text-lg font-extralight">
            Bem Vindo ao Cacttus!
          </CardDescription>
        </div>
      </CardHeader>
      {/* Form */}
      <CardContent className="flex flex-col w-full gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex-col justify-start items-start gap-3 inline-flex"
          >
            <FormField
              name="user"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex w-full items-center justify-between">
                    <FormLabel>Usuário</FormLabel>
                    <FormMessage className="text-xs" />
                  </div>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={"Escolha um Usuário"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem value={user.id!} key={user?.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </Form>
        <CreateUser />
      </CardContent>
    </Card>
  );
};

export default Login;
