import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { usePingQuery } from "../redux/rtkQuery/coinGeckoApi";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { describe, it, expect } from "vitest";

const MockComponent = () => {
  const { data, error, isLoading } = usePingQuery();

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error: {(error as { message: string }).message} </div>;
  return <div>Ping successful</div>;
};

describe("usePingQuery Test", () => {
  it("should render the success message when ping is successful", async () => {
    render(
      <Provider store={store}>
        <MockComponent />
      </Provider>
    );

    // Assert that the message is in the document
    expect(await screen.findByText("Ping successful"));
  });
});
