import { Controller } from "react-hook-form";
import { Input } from "antd";
import { IInput } from "../types/Input.type";

const InputComponent = ({ name, control, placeholder }: IInput) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Input placeholder={placeholder} {...field} />}
      />
    </div>
  );
};

export default InputComponent;
