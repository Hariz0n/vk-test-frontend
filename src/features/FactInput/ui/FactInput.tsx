import { FormItem, Input } from "@vkontakte/vkui";
import { RefObject } from "react";
import {
  Control,
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { mergeRefs } from "react-merge-refs";

type FactInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  inputRef?: RefObject<HTMLInputElement>;
};

export const FactInput = <T extends FieldValues>({
  name,
  control,
  inputRef,
}: FactInputProps<T>) => {
  const { field } = useController<T>({ name, control });
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <FormItem top="Название факта" htmlFor="fact-input">
      <Input
        placeholder="Интересный факт ушел за хлебом... Можешь сам его ввести или нажать кнопку ниже"
        id="fact-input"
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        name={field.name}
        disabled={isSubmitting || field.disabled}
        getRef={mergeRefs([field.ref, inputRef])}
      />
    </FormItem>
  );
};
