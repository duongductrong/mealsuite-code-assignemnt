import { ComponentProps } from "react";

export interface InputProps extends ComponentProps<"input"> {}

const Input = ({ ...props }: InputProps) => {
  return (
    <input
      {...props}
      className="border border-neutral-300 h-8 rounded-md px-2"
    />
  );
};

export default Input;
