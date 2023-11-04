import React from "react";
import { useState, useEffect } from "react";

function Timer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setCount((previousValue) => previousValue + 1);
    }, 1000);
  }, [count]);
  return <h1>Watch : {count}</h1>;
}

export default Timer;
