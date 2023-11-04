import React from "react";
import { useState, useEffect } from "react";

function Timer() {
  const [timer, setTimer] = useState(7);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((initial) => {
        if (initial === 1) {
          clearInterval(interval);
        }
        return initial - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <h1>Current Value of Timer : {timer}</h1>;
}

export default Timer;
