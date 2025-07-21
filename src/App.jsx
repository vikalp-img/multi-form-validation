import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Pages/Register'
import { Route, Routes } from 'react-router-dom'
import Details from './Pages/Details'

import { PROTECTED_ROUTES, PUBLIC_ROUTES } from './routes/routeConfig'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'


const withSuspense = (Component) => {
    return (
      <Suspense>
        <Component />
      </Suspense>
    );
};


function App() {


  return (
    <>
    <Routes>
      {PUBLIC_ROUTES.map(item => (
        <Route key={item?.path} path={item?.path} element={<PublicRoutes>{withSuspense(item?.element)}</PublicRoutes>} />
      ))}
     
     {PROTECTED_ROUTES.map(item => (
        <Route key={item?.path} path={item?.path} element={<PrivateRoutes>{withSuspense(item?.element)}</PrivateRoutes>} />
      ))}

     </Routes>
     </>
  )
}

export default App
