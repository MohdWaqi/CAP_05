import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() =>{
    document.title =  `Clicked ${count} times`
  })

  return (
    <>
      <h1>Count is {count}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Click Here
        </button>  
      </div> 
    </>
  )
}

export default App
