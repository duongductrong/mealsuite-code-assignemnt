import {
  fireEvent,
  render
} from "@testing-library/react";

import AddTicket from "./add-ticket";

describe("Add ticket", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<AddTicket />);
    expect(baseElement).toBeTruthy();
  });

  it("should be able to type in the input", () => {
    const { getByPlaceholderText } = render(<AddTicket />);
    const input = getByPlaceholderText("Enter ticket description");

    fireEvent.change(input, { target: { value: "Typing something here" } });

    expect(input).toHaveValue("Typing something here");
  });

  it("should be able to clean the input after clicking on button for adding a new ticket", () => {
    const { getByText, getByPlaceholderText } = render(<AddTicket />);
    const input = getByPlaceholderText("Enter ticket description");
    const button = getByText("Add New Ticket");

    fireEvent.change(input, { target: { value: "Testing here" } });
    fireEvent.click(button);

    expect(input).toHaveValue("");
  });
});
