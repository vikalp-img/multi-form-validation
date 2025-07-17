import React, { useContext } from 'react'
import TabContext from './context/Tab'
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({children}) => {

    const {authenticated} = useContext(TabContext);

    if (!authenticated) return (
     <Navigate to='/' replace />
    )
         
    
  return (
   <div>{children}</div>
  )
}

export default PrivateRoutes