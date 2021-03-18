import logo from "./logo.svg";
import "./App.css";
import { withAuth } from "./HOC";

function RootApp({ logout }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
const App = withAuth(RootApp);
export default App;
