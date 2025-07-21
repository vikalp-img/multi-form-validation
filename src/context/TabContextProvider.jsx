import React, { useState } from 'react'
import TabContext from './Tab';
import { accessTokenApi } from '../utils/axios';
import { useEffect } from 'react';

const TabContextProvider = ({children}) => {

    const [selectedTab,setSelectedTab] = useState('basicDetails');
    const [details,setDetails] = useState({});
    const [authenticated,setAuthenticated] = useState(false);
    const [loading,setLoading] = useState(true);
    const [detailsApi,setDetailsApi] = useState(null);
    const [accessToken,setAccesToken] = useState(null);
    


    useEffect(()=>{
    
    const fetchAccessToken = async()=>{
      const accessToken = await accessTokenApi();
      // console.log(accessToken,'accessTokenInUseEffect');
      setAccesToken(accessToken?.data);
      localStorage.setItem('accessToken', accessToken?.data);
      
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
    <TabContext.Provider value={{selectedTab,setSelectedTab,details,setDetails,authenticated,setAuthenticated,loading,setLoading,detailsApi,setDetailsApi,accessToken,setAccesToken}}>
        {children}
    </TabContext.Provider>
  )
}

export default TabContextProvider