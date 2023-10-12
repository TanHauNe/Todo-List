import { MouseEventHandler } from "react";

export interface IInput {
  name: string;
  placeholder?: string;
  control: any;
  isPassword?: boolean;
  className?: string;
}

export interface IButton {
  htmlType?: "button" | "submit" | "reset";
  type?: "link" | "text" | "default" | "primary" | "dashed";
  content: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  danger?: boolean;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}
