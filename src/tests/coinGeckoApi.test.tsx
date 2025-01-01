import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import {
  useGetCoinsListQuery,
  usePingQuery,
} from "../redux/rtkQuery/coinGeckoApi";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { describe, it, expect, vi } from "vitest";

describe("usePingQuery Test", () => {
  const MockComponent = () => {
    const { data, error, isLoading } = usePingQuery();

    if (isLoading) return <div>Loading</div>;
    if (error)
      return <div>Error: {(error as { message: string }).message} </div>;
    return <div>Ping successful</div>;
  };

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

describe("useGetCoinListQuery Test", () => {
  const MockComponent = () => {
    const { data, isLoading, error } = useGetCoinsListQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error)
      return <div>Error: {(error as { message: string }).message}</div>;

    return (
      <div>
        {data?.map((coin) => (
          <div key={coin.id}>{coin.name}</div>
        ))}
      </div>
    );
  };

  it(
    "should render the list of coins from the real API",
    async () => {
      render(
        <Provider store={store}>
          <MockComponent />
        </Provider>
      );

      // Wait for the real API call to complete and for data to render
      expect(await screen.findByText("Bitcoin"));
      expect(await screen.findByText("Ethereum"));
    },
    { timeout: 30000 } // For real api test.
  );
});
