import Button from "client/src/components/button";
import Input from "client/src/components/input";
import { cn } from "client/src/lib/tw";
import { ComponentProps, useState } from "react";

export interface AddTicketProps extends ComponentProps<"form"> {
  onAddTicket?: (value: string) => void;
}

const AddTicket = ({ onAddTicket, className, ...props }: AddTicketProps) => {
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTicket?.(description);
    setDescription("");
  };

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
      className={cn("flex items-center gap-2", className)}
    >
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter ticket description"
        required
      />

      <Button type="submit">Add New Ticket</Button>
    </form>
  );
};

export default AddTicket;
