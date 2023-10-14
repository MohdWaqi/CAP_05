import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


const Counter = ()=>{
  const [count, setCount] = useState(0)

  return (<><h1>Count is {count}</h1>
  <button onClick={()=>{setCount(count+1)}}>Click to Initiate</button></>)
}
ReactDOM.createRoot(document.getElementById('root')).render(<Counter />)
