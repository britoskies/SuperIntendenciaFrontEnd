import "./App.css";

// Route management
import { BrowserRouter as Router } from "react-router-dom";
import RouteConfig from "./routes/Router";

function App() {
  return (
    <>
      <Router>
        <RouteConfig />
      </Router>
    </>
  );
}

export default App;
