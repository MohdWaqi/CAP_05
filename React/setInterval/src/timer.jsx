import React from 'react'
import { useState, useEffect } from 'react'

function Timer() {
    const [count, setCount] = useState(10)
  useEffect(() => {
    setInterval(() => {
      setCount((timeCount) => {return timeCount-1})
    }, 1000);
  },[])

  return (
    <h1>Timer Value : {count}</h1>
  )
}

export default Timer