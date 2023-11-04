import { useState } from 'react'
import './App.css'

function App() {
  const [showTimer, setShowTimer] = useState(true)

  return (
    <>
      {showTimer && <h1>Vite + React</h1>}
      <div className="card">
        <button onClick={() => setShowTimer(!showTimer)}>
          {showTimer? "Hide Timer": "Show Timer"}
        </button>
        
      </div>
    </>
  )
}

export default App
