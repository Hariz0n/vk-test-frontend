import * as yup from 'yup';

export const AgifyNameFormSchema = yup.object({
  name: yup.string().matches(/^[^\d\s!@£$%^&*()-+=]+$/ig, 'Разрешены только буквы')
})