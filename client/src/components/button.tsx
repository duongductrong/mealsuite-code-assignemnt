import { ComponentProps } from "react";
import { cn } from "../lib/tw";

export interface ButtonProps extends ComponentProps<"button"> {}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "px-2 min-w-[80px] h-8 rounded-md bg-black text-white text-sm"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
