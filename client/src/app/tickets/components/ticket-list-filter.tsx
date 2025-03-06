import Select, { SelectOption } from "client/src/components/select";
import { cn } from "client/src/lib/tw";
import { ComponentProps, useEffect, useState } from "react";

export interface FilterChangeValue {
  status?: "incomplete" | "completed" | "";
}

export interface TicketListFilterProps extends ComponentProps<"div"> {
  onFilterChange?: (values: FilterChangeValue) => void;
}

const TicketListFilter = ({
  className,
  onFilterChange,
  ...props
}: TicketListFilterProps) => {
  const [status, setStatus] = useState("");
  const statusOptions: SelectOption[] = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Incomplete",
      value: "incomplete",
    },
    {
      label: "Completed",
      value: "completed",
    },
  ];

  useEffect(() => {
    onFilterChange?.({ status: status as FilterChangeValue["status"] });
  }, [status]);

  return (
    <div {...props} className={cn("flex items-center gap-2", className)}>
      <p className="font-bold">Filter (client-side): </p>

      <Select
        data-testid="filter-status"
        value={status}
        onChange={(evt) => setStatus(evt.target.value)}
        options={statusOptions}
      ></Select>
    </div>
  );
};

export default TicketListFilter;
