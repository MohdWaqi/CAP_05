import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { useState } from 'react'

const Counter = ()=>{
  const [count, setCount] = useState(0)

  return (<><h1>Count is {count}</h1>
  <button onClick={()=>{setCount(count+1)}}>Click to Initiate</button></>)
}
ReactDOM.createRoot(document.getElementById('root')).render(<Counter />)
