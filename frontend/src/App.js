import "./App.css";
import React from "react";

function App() {
  const [longUrl, setLongUrl] = React.useState("");
  const [inputUrl, setInputUrl] = React.useState("");
  const [shortUrl, setShortUrl] = React.useState("");

  const submitLongUrl = async (event) => {
    event.preventDefault();
    // const result = axios.post("http://localhost:3000", {
    //   longUrl: "exampleURL.com",
    // });
    // setShortUrl(result.message);
    setLongUrl(inputUrl);
    setInputUrl("");
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
              value={inputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value);
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
        <p data-testid="display-shortened-url">{shortUrl}</p>
        <h3>Original Long URL</h3>
        <p data-testid="display-long-url">{longUrl}</p>
      </section>
    </>
  );
}

export default App;
