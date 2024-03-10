import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Div,
  FormLayoutGroup,
  Group,
  SimpleCell,
  Spinner,
} from "@vkontakte/vkui";
import { FormProvider, useForm } from "react-hook-form";
import { AgifyNameFormSchema } from "../model/agifyNameFormSchema";
import * as yup from "yup";
import styles from "./AgifyNameFormInputs.module.css";
import { useGetAgifyUserLazy } from "@/entities/AgifyUser";
import { AgifyNameInput } from "@/features/AgifyNameInput";

type AgifyNameFormInputs = yup.InferType<typeof AgifyNameFormSchema>;

export const AgifyNameCard = () => {
  const form = useForm<AgifyNameFormInputs>({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(AgifyNameFormSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const { data, refetch, isFetching, isFetched, isStale, isError } =
    useGetAgifyUserLazy(form.getValues("name") || "");

  const submitHandler = async () => {
    console.log("name - ", form.getValues("name"));

    console.log("🚀 ~ AgifyNameCard ~ !isFetched:", !isFetched);
    console.log("🚀 ~ AgifyNameCard ~ isStale:", isStale);
    console.log("🚀 ~ AgifyNameCard ~ isError:", isError);
    if (!isFetched || isStale || isError) {
      await refetch();
    }
  };

  return (
    <Group>
      <FormProvider {...form}>
        <form
          className={styles.AgifyForm}
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <FormLayoutGroup
            mode="horizontal"
            className={styles["AgifyForm-controls"]}
          >
            <AgifyNameInput
              submitHandler={submitHandler}
              control={form.control}
              name="name"
            />
            <Button type="submit" size="l">
              Найти
            </Button>
          </FormLayoutGroup>
        </form>
      </FormProvider>
      <Div>
        {(isSubmitting || isFetching) && <Spinner size="large" />}
        {!(isSubmitting || isFetching) && data && (
          <SimpleCell subtitle={data.count}>
            {data.name} - {data.age}
          </SimpleCell>
        )}
      </Div>
    </Group>
  );
};
