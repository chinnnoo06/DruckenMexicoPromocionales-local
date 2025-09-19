import { useState } from 'react'
import { BrowserRouter } from "react-router-dom"
import './App.css'
import { MainRoutes } from './routes/Routes'

function App() {

  return (
    <>
      <BrowserRouter>
        <>
          <MainRoutes/>
        </>
      </BrowserRouter>
    </>
  )
}

export default App
