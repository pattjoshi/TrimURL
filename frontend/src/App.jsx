import { useState, useEffect } from "react"; // useEffect is unused (test: no-unused-vars)
import reactLogo from "./assets/react.svg";
import "./App.css";

// Test: unused variable
let imgSrc = "https://vitejs.dev/logo.svg";

// Test: unused function with bad naming
const He_llo = () => {};

// Test: inline styles and missing alt text (jsx-a11y)
function App() {
  const [count, setCount] = useState(0);

  // Test: unused inner function
  const doNothing = () => {};

  return (
    <>
      <div>
        {/* Test: anchor tag has no content and no accessible name */}
        <a href="https://vite.dev" target="_blank" rel="noreferrer"></a>

        {/* Test: image has no alt */}
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src="https://google.com" />
        </a>
      </div>

      {/* Test: semantic heading structure (H1 should be the main heading, but nothing wraps it semantically) */}
      <h1>Vite + React</h1>

      {/* Test: no label for input (jsx-a11y/label-has-associated-control) */}
      <input type="text" placeholder="Name" />

      <div className="card">
        {/* Test: no type on button (jsx-a11y/button-has-type) */}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {/* Test: role is redundant on a semantic element */}
      <p className="read-the-docs" role="paragraph">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
