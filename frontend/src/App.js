import "./App.css";
import React from "react";

function App() {
  const [longUrl, setLongUrl] = React.useState("");

  const submitLongUrl = (event) => {
    event.preventDefault();
    const givenUrl = longUrl;
    setLongUrl("");
  };

  return (
    <>
      <header>
        <h1>URL Shortener</h1>
      </header>
      <section className="App">
        <h2>Input URL to be shortened</h2>
        <form onSubmit={submitLongUrl}>
          <label htmlFor="urlInput">
            <input
              name="urlInput"
              type="text"
              data-testid="long-url-input"
              placeholder="input long URL here..."
              value={longUrl}
              onChange={(e) => {
                setLongUrl(e.value);
              }}
            />
          </label>
          <button data-testid="shorten-url-button" type="submit">
            Shorten URL
          </button>
        </form>
      </section>
      <section>
        <h3>Shortened URL</h3>
        <p data-testid="display-shortend-url"></p>
        <h3>Original Long URL</h3>
        <p data-testid="display-long-url"></p>
      </section>
    </>
  );
}

export default App;
