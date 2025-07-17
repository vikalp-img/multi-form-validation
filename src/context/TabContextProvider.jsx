import React, { useState } from 'react'
import TabContext from './Tab';

const TabContextProvider = ({children}) => {

    const [selectedTab,setSelectedTab] = useState('basicDetails');
    const [details,setDetails] = useState({});
    const [authenticated,setAuthenticated] = useState(false);

  return (
    <TabContext.Provider value={{selectedTab,setSelectedTab,details,setDetails,authenticated,setAuthenticated}}>
        {children}
    </TabContext.Provider>
  )
}

export default TabContextProvider