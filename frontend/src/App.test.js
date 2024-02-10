import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("renders", () => {
  test("url shortener header", () => {
    render(<App />);
    const linkElement = screen.getByText(/url shortener/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("form input for long url", () => {
    render(<App />);
    const urlInput = screen.getByPlaceholderText("input long URL here...");
    expect(urlInput).toBeInTheDocument();
  });

  test("button to shorten long url", () => {
    render(<App />);
    const shortenButton = screen.getByTestId("shorten-url-button");
    expect(shortenButton).toBeInTheDocument();
  });

  test("shortened url display at first render to be empty", () => {
    render(<App />);
    const displayShortURL = screen.getByTestId("display-shortend-url");
    expect(displayShortURL).toBeEmpty();
  });

  test("long url display to be empty on first render", () => {
    render(<App />);
    const displayLongURL = screen.getByTestId("display-long-url");
    expect(displayLongURL).toBeEmpty();
  });
});

describe("given url shortner form", () => {
  test("input value displays correctly on change", () => {
    render(<App />);
    const input = screen.getByTestId("long-url-input");
    expect(input).toBeEmpty();
    fireEvent.change(input, { target: { value: "exampleURL.com" } });
    expect(input.value).toBe("exampleURL.com");
    fireEvent.change(input, { target: { value: "exampleURL" } });
    expect(input.value).toBe("exampleURL");
  });

  test("input value clears on shorten button click", () => {
    render(<App />);

    const input = screen.getByTestId("long-url-input");
    const submitBtn = screen.getByTestId("shorten-url-button");

    expect(input).toBeEmpty();
    fireEvent.change(input, { target: { value: "exampleURL.com" } });
    fireEvent.click(submitBtn);
    expect(input.value).toBe("");
  });
});
