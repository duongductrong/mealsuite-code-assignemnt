import { Ticket } from "@acme/shared-models";

export interface TicketsProps {
  tickets: Ticket[];
}

export function Tickets(props: TicketsProps) {
  return (
    <div>
      <h2 className="text-lg">Tickets</h2>
      {props.tickets ? (
        <ul>
          {props.tickets.map((t) => (
            <li key={t.id}>
              Ticket: {t.id}, {t.description}
            </li>
          ))}
        </ul>
      ) : (
        <span>...</span>
      )}
    </div>
  );
}

export default Tickets;
