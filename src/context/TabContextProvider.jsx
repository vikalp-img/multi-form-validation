import React, { useState } from 'react'
import TabContext from './Tab';
import { accessTokenApi } from '../utils/axios';
import { useEffect } from 'react';

const TabContextProvider = ({children}) => {

    const [selectedTab,setSelectedTab] = useState('basicDetails');
    const [details,setDetails] = useState({});
    const [authenticated,setAuthenticated] = useState(false);
    const [loading,setLoading] = useState(true);


    useEffect(()=>{
    
    const fetchAccessToken = async()=>{
      const accessToken = await accessTokenApi();
      console.log(accessToken,'accessTokenInUseEffect');
      
      if(accessToken?.success){
        setAuthenticated(true)
      }else{
        setAuthenticated(false)
      }
      
      setLoading(false);
    };
    
    fetchAccessToken()
    
    },[])

  return (
    <TabContext.Provider value={{selectedTab,setSelectedTab,details,setDetails,authenticated,setAuthenticated,loading,setLoading}}>
        {children}
    </TabContext.Provider>
  )
}

export default TabContextProvider