import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Pages/Register'
import { Route, Routes } from 'react-router-dom'
import Details from './Pages/Details'
import PrivateRoutes from './PrivateRoutes'

function App() {


  return (
    <>
    <Routes>

    <Route path='/' element={ <Register />} />
     
    <Route path='/details' element={
      <PrivateRoutes>
        <Details />
      </PrivateRoutes>
    } />
     

     </Routes>
     </>
  )
}

export default App
