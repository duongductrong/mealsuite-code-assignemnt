import { fireEvent, render } from "@testing-library/react";

import TicketListFilter from "./ticket-list-filter";

describe("Ticket list filter", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TicketListFilter />);

    expect(baseElement).toBeTruthy();
  });

  it("should have a select element", () => {
    const { getByTestId } = render(<TicketListFilter />);

    const select = getByTestId("filter-status");

    expect(select).toBeInTheDocument();
  });

  it("should able to change the status", () => {
    const { getByTestId } = render(<TicketListFilter />);

    const select = getByTestId("filter-status");

    fireEvent.change(select, { target: { value: "completed" } });

    expect(select).toHaveValue("completed");

    fireEvent.change(select, { target: { value: "incomplete" } });

    expect(select).toHaveValue("incomplete");
  });
});
