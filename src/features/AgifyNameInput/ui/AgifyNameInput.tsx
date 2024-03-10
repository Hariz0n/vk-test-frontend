import { FormItem, Input } from "@vkontakte/vkui";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const AgifyNameInput: FC = () => {
  const { control } = useFormContext<{ name?: string }>();

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
