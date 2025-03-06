import { useTicket } from "client/src/lib/api/ticket/get-ticket";
import { useParams } from "react-router-dom";

export interface TicketParams {
  id: number;
}

/* eslint-disable-next-line */
export interface TicketDetailsProps {}

export function TicketDetails(props: TicketDetailsProps) {
  const params = useParams();

  const id = params["id"] as unknown as number;

  const { data, isLoading, isFetching } = useTicket({ variables: { id } });

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (!data) return <div>Data not found</div>;

  return (
    <div>
      <h1>Welcome to TicketDetails!</h1>

      <div>
        <h2>Ticket Details</h2>
        <p>Ticket ID: {data.id}</p>
        <p>Ticket Description: {data.description}</p>
        <p>Ticket Status: {data.completed ? "Completed" : "Incomplete"}</p>
      </div>
    </div>
  );
}

export default TicketDetails;
