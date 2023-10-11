import { errorMessages } from "@/constants/message";
import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .email(errorMessages.emailValid)
    .required(errorMessages.emailRequired),
  password: yup
    .string()
    .required(errorMessages.passwordRequired)
    .min(8, errorMessages.passwordMinLength)
    .max(16, errorMessages.passwordMaxLength),
  confirm_password: yup
    .string()
    .required(errorMessages.confirmPasswordRequired)
    .oneOf([yup.ref("password")], errorMessages.confirmPasswordValid),
  full_name: yup.string().required(errorMessages.fullNameRequired),
  desc: yup.string().required(errorMessages.descRequired),
  status: yup.number().required(errorMessages.statusRequired),
  title: yup.string().required(errorMessages.titleRequired),
  url_img: yup
    .string()
    .url(errorMessages.urlImgValid)
    .required(errorMessages.urlImgRequired),
});
