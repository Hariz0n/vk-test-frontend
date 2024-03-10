import { FormItem, Input } from "@vkontakte/vkui";
import { FC, useEffect } from "react";
import {
  Controller,
  SubmitHandler,
  useFormContext,
  useWatch,
} from "react-hook-form";

type AgifyNameInputProps = {
  submitHandler: SubmitHandler<{ name?: string }>;
};

export const AgifyNameInput: FC<AgifyNameInputProps> = ({ submitHandler }) => {
  const { control, handleSubmit, formState } = useFormContext<{
    name?: string;
  }>();

  const inputValue = useWatch({ control, name: "name" });

  useEffect(() => {
    // TODO: fix two rerenders on manual submit
    let timerId: ReturnType<typeof setTimeout>;
    if (inputValue) {
      timerId = setTimeout(handleSubmit(submitHandler), 3000);
    }
    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSubmit, inputValue, formState.isSubmitting]);

  return (
    <Controller
      control={control}
      name="name"
      render={({ field, fieldState }) => (
        <FormItem
          top="Поиск по имени"
          status={fieldState.error || fieldState.invalid ? "error" : "default"}
          bottom={fieldState.error?.message}
        >
          <Input
            placeholder="Введите имя"
            value={field.value}
            name="agify-name-input"
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={field.disabled}
            getRef={field.ref}
          />
        </FormItem>
      )}
    />
  );
};
