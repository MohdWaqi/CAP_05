import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const InputBox = () => {
  const [text, setText] = useState("");
  return (
    <>
      <input
        onChange={(event) => setText(event.target.value)}
        type="text"
        placeholder="Type The desired text"
        value={text}
      />
      <h2>{text}</h2>
      <button onClick={() => setText("")}>CLEAR</button>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<InputBox />);
