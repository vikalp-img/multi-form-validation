import React, { useContext } from 'react'
import TabContext from './context/Tab';
import { TbLoader3 } from 'react-icons/tb';
import { Navigate } from 'react-router-dom';

const PublicRoutes = ({children}) => {

    const {authenticated,loading} = useContext(TabContext);

    if (loading) return <div className='flex items-center justify-center h-screen'><TbLoader3 className='animate-spin text-4xl' /></div>;

    if (authenticated) {
        return <Navigate to='/details' replace />
    }
  return (
    <div>{children}</div>
  )
}

export default PublicRoutes