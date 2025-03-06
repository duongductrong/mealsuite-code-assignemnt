import { Ticket, User } from "@acme/shared-models";
import { cn } from "client/src/lib/tw";
import { ComponentProps, useState } from "react";

export interface TicketAssigneeProps extends ComponentProps<"div"> {
  users?: User[];
  defaultValue?: string;
  ticketId?: Ticket["id"];
  onAssigneeChange?: (ticketId: Ticket["id"], userId: User["id"]) => void;
}

const TicketAssignee = ({
  className,
  users = [],
  defaultValue,
  ticketId,
  onAssigneeChange,
  ...props
}: TicketAssigneeProps) => {
  const [value, setValue] = useState<string>(defaultValue || "");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onAssigneeChange?.(ticketId!, Number(e.target.value));
  };

  return (
    <div
      {...props}
      data-testid="ticket-assign"
      className={cn(
        "inline-block text-white text-xs bg-black px-1 rounded-sm",
        className
      )}
    >
      <span>Assignee:</span>{" "}
      <select
        className="bg-black text-white w-[50px]"
        value={value}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select Assignee
        </option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TicketAssignee;
