import { useState } from "react";
import "./App.css";
import Timer from "./Timer";

function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <>
      {showTimer && <Timer />}
      <div className="card">
        <button onClick={() => setShowTimer(!showTimer)}>
          {showTimer ? "Hide Timer" : "Show Timer"}
        </button>
      </div>
    </>
  );
}

export default App;
