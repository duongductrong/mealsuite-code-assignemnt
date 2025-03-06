import { render } from "@testing-library/react";

import TicketList from "./ticket-list";

describe("Ticket list", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <TicketList
        tickets={[
          {
            assigneeId: 1,
            completed: true,
            description: "test",
            id: 1,
            user: { id: 1, name: "test user" },
          },
        ]}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it("should render not found", () => {
    const { baseElement } = render(<TicketList tickets={[]} />);

    expect(baseElement).toHaveTextContent("Data not found");
  });

  // it("should render loading", () => {
  //   const { baseElement } = render(<TicketList tickets={[]} loading />);

  //   expect(baseElement).toHaveTextContent("Loading...");
  // });
});
