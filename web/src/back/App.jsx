import { useState } from 'react'
import './App.scss'

function App() {

  return (
    <div className="App">
      <div className="container">
        <div className="main">
          <input 
            className="from"
            type="text"
          ></input>
          <div className="arrow">
            -
          </div>
          <div className="to">
            <div className="host">
              sheep.io/
            </div>
            <input
              type="text" 
              className="to-input"
            ></input>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
