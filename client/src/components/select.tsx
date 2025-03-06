import { ComponentProps } from "react";
import { cn } from "../lib/tw";

export interface SelectOption {
  label: string;
  value: any;
}

export interface SelectProps extends ComponentProps<"select"> {
  options?: SelectOption[];
}

const Select = ({ options = [], className, ...props }: SelectProps) => {
  return (
    <select
      {...props}
      className={cn("border border-neutral-300 h-8 rounded-md px-2", className)}
    >
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
