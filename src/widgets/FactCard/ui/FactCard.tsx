import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { factFormSchema } from "../model/factFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FactInput } from "@/features/FactInput";
import { Group } from "@vkontakte/vkui";
import { FC, useRef } from "react";
import * as yup from "yup";
import { useGetNinjaFactLazy } from "@/entities/NinjaFact";
import { FactSubmitButton } from "@/features/FactSubmitButton";

type formInputs = yup.InferType<typeof factFormSchema>;

export const FactCard: FC = () => {
  const { data, refetch } = useGetNinjaFactLazy();
  const ref = useRef<HTMLInputElement>(null);
  const form = useForm<formInputs>({
    defaultValues: {
      name: ""
    },
    values: {
      name: data?.fact || "",
    },
    resolver: yupResolver(factFormSchema),
  });

  const onSubmitHandler: SubmitHandler<formInputs> = async () => {
    const response = await refetch()
    if (response.data) {
      const firstWordEndIndex = (response.data.fact.split(' ')[0] || '').length       
      setTimeout(() => {
        ref.current?.focus()
        ref.current?.setSelectionRange(firstWordEndIndex, firstWordEndIndex)
      }, 1)
    }
  };

  return (
    <Group>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <FactInput inputRef={ref} control={form.control} name="name" />
          <FactSubmitButton />
        </form>
      </FormProvider>
    </Group>
  );
};
