import React, { useContext, useEffect } from 'react'
import TabContext from '../context/Tab'
import { logoutApi, userDetailsApi } from '../utils/axios'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Common/Navbar';


const Details = () => {

  const {details,setDetails,detailsApi,setDetailsApi,accessToken,setAuthenticated} = useContext(TabContext);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchDetails = async () => {
      const userDetails =await userDetailsApi(accessToken);
      console.log(userDetails,'userDetailsInDetailsPage');
      if(userDetails?.success){
 
        setDetailsApi(userDetails?.data);
        setDetails(userDetails?.data);
      }
      else {
        console.error('Failed to fetch user details');
      }
    }

    fetchDetails();
  },[])
    

    console.log(details,'detailsInDetailPage');
   
    
    const logoutHandler = () => {
      localStorage.removeItem('accessToken');
      logoutApi();
      setAuthenticated(false); 
       setDetails({});
      navigate('/login');
     
    }

  return (
    <div>
      <Navbar />
      
    
    <div className="flex justify-center mt-20">
      
  <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-100">
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Your Details</h2>
    
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <span className="text-gray-600 font-medium">Name:</span>
        <span className="text-gray-800">{detailsApi?.user?.name}</span>
      </div>
      <div className="flex justify-between items-center border-b pb-2">
        <span className="text-gray-600 font-medium">State:</span>
        <span className="text-gray-800">{detailsApi?.user?.state}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 font-medium">Account Number:</span>
        <span className="text-gray-800">{detailsApi?.user?.accountNumber}</span>
      </div>
    </div>
  </div>
</div>
</div>

  )
}

export default Details