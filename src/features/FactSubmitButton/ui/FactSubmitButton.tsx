import { Button, FormItem } from "@vkontakte/vkui";
import { useFormContext } from "react-hook-form";

export const FactSubmitButton = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <FormItem>
      <Button
        type="submit"
        size="l"
        stretched
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        Найти факт
      </Button>
    </FormItem>
  );
};
