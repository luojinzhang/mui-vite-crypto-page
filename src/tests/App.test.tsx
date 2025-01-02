import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "../App";
import { ApplicationWrapper } from "../components";

vi.stubGlobal("scrollTo", vi.fn());

describe("Ensure the App component renders without crashing", () => {
  it("renders without crashing", async () => {
    render(
      <ApplicationWrapper>
        <App />
      </ApplicationWrapper>,
    );

    expect(await screen.findByText("Home"));
    expect(await screen.findByText("All Cryptocurrencies"));
    expect(await screen.findByText("Bitcoin"));
    expect(await screen.findByText("Rows per page:"));

    const bitcoinRow = screen.getByText("Bitcoin").closest("tr");

    expect(bitcoinRow).toBeDefined();

    fireEvent.click(bitcoinRow!);

    expect(await screen.findByText("BTC"));
    expect(await screen.findByText("Current Price"));
    expect(await screen.findByText("Max Supply:"));
  });
});
