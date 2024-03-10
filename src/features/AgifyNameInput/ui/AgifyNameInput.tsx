import { FormItem, Input } from "@vkontakte/vkui";
import debounce from "debounce";
import { useCallback, useEffect } from "react";
import {
  Control,
  FieldValues,
  Path,
  SubmitHandler,
  useController,
  useFormContext,
} from "react-hook-form";

type AgifyNameInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  submitHandler: SubmitHandler<FieldValues>;
};

export const AgifyNameInput = <T extends FieldValues>({
  name,
  control,
  submitHandler,
}: AgifyNameInputProps<T>) => {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const form = useFormContext();
  const nameWatch: string = form.watch("name");

  const deb = useCallback(debounce(form.handleSubmit(submitHandler), 3000), []);

  useEffect(() => {
    nameWatch && deb();
  }, [nameWatch]);

  return (
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
  );
};
