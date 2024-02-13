import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.js";

describe("intial renders", () => {
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
    const displayShortURL = screen.getByTestId("display-shortened-url");
    expect(displayShortURL.textContent).toBe("");
  });

  test("long url display to be empty on first render", () => {
    render(<App />);
    const displayLongURL = screen.getByTestId("display-long-url");
    expect(displayLongURL.textContent).toBe("");
  });
});

describe("given url shortner form", () => {
  test("input value displays correctly on change", () => {
    render(<App />);
    const input = screen.getByTestId("long-url-input");
    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "exampleURL.com" } });
    expect(input.value).toBe("exampleURL.com");
    fireEvent.change(input, { target: { value: "exampleURL" } });
    expect(input.value).toBe("exampleURL");
  });

  test("input value clears on shorten button click", () => {
    render(<App />);

    const input = screen.getByTestId("long-url-input");
    const submitBtn = screen.getByTestId("shorten-url-button");

    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "exampleURL.com" } });
    fireEvent.click(submitBtn);
    expect(input.value).toBe("");
  });
});

describe("given displays of long and short urls", () => {
  test("when shorten button clicked, long url should display original given url", () => {
    render(<App />);
    const longUrl = screen.getByTestId("display-long-url");
    const input = screen.getByTestId("long-url-input");
    const submitBtn = screen.getByTestId("shorten-url-button");

    fireEvent.change(input, { target: { value: "exampleURL.com" } });
    fireEvent.click(submitBtn);

    expect(longUrl.textContent).toBe("exampleURL.com");
  });

  test("when shorten button clicked, shortened url should display new short url", () => {
    render(<App />);
    const shorteneedUrl = screen.getByTestId("display-shortened-url");
    const input = screen.getByTestId("long-url-input");
    const submitBtn = screen.getByTestId("shorten-url-button");

    fireEvent.change(input, { target: { value: "exampleURL.com" } });
    fireEvent.click(submitBtn);

    expect(shorteneedUrl.textContent).toBe("sometext");
  });
});
