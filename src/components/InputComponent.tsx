import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { Controller } from "react-hook-form";
import { IInput } from "../types/Common.type";

const InputComponent = ({ name, control, placeholder, isPassword }: IInput) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          isPassword ? (
            <Input.Password
              placeholder={placeholder}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              {...field}
            />
          ) : (
            <Input placeholder={placeholder} {...field} />
          )
        }
      />
    </div>
  );
};

export default InputComponent;
