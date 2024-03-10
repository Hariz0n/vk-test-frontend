import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Div,
  FormLayoutGroup,
  FormStatus,
  Group,
  SimpleCell,
  Spinner,
} from "@vkontakte/vkui";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { AgifyNameFormSchema } from "../model/agifyNameFormSchema";
import * as yup from "yup";
import styles from "./AgifyNameFormInputs.module.css";
import { useGetAgifyUserLazy } from "@/entities/AgifyUser";
import { AgifyNameInput } from "@/features/AgifyNameInput";
import { getNoun } from "@/shared/utils";

type AgifyNameFormInputs = yup.InferType<typeof AgifyNameFormSchema>;

export const AgifyNameCard = () => {
  const form = useForm<AgifyNameFormInputs>({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(AgifyNameFormSchema),
  });

  const nameValue = useWatch({ control: form.control, name: "name" });

  const { data, refetch, isFetching, isFetched, isStale, isError } =
    useGetAgifyUserLazy(nameValue || "");

  const submitHandler = async () => {
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
            <AgifyNameInput submitHandler={submitHandler} />
            <Button type="submit" size="l">
              Найти
            </Button>
          </FormLayoutGroup>
        </form>
      </FormProvider>
      <Div>
        {(form.formState.isSubmitting || isFetching) && (
          <Spinner size="large" />
        )}
        {!(form.formState.isSubmitting || isFetching) && data && (
          <SimpleCell subtitle={`Всего найдено: ${data.count}`}>
            {`${data.name}, средний возраст: ${
              data.age
                ? `${data.age} ${getNoun(data.age, ["год", "года", "лет"])}`
                : "не известен"
            }`}
          </SimpleCell>
        )}
        {!(form.formState.isSubmitting || isFetching) && isError && (
          <FormStatus header="Ошибка" mode="error">
            Не удалось загрузить данные
          </FormStatus>
        )}
      </Div>
    </Group>
  );
};
