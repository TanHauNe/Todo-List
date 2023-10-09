import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .email("Vui lòng nhập một địa chỉ email hợp lệ")
    .required("Email là bắt buộc"),
  password: yup
    .string()
    .required("Password là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(16, "Mật khẩu phải có tối đa 16 ký tự"),
  full_name: yup.string().required("Họ và tên là bắt buộc"),
  desc: yup.string().required("Mô tả là bắt buộc"),
  title: yup.string().required("Tiêu đề là bắt buộc"),
  url_img: yup
    .string()
    .url("Vui lòng nhập một URL hợp lệ cho ảnh đại diện")
    .required("URL ảnh đại diện là bắt buộc"),
});
