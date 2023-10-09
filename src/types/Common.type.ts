import { MouseEventHandler } from "react";

export interface IInput {
  name: string;
  placeholder?: string;
  control: any;
  isPassword?: boolean;
}

export interface IButton {
  htmlType?: "button" | "submit" | "reset";
  type?: "link" | "text" | "default" | "primary" | "dashed";
  content: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  danger?: boolean;
}
