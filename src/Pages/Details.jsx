import React, { useContext } from 'react'
import TabContext from '../context/Tab'

const Details = () => {

    const {details} = useContext(TabContext);

    console.log(details,'detailsInDetailPage');
    

  return (
    <div className="flex justify-center mt-20">
  <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-100">
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Your Details</h2>
    
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <span className="text-gray-600 font-medium">Name:</span>
        <span className="text-gray-800">{details?.basic?.name}</span>
      </div>
      <div className="flex justify-between items-center border-b pb-2">
        <span className="text-gray-600 font-medium">State:</span>
        <span className="text-gray-800">{details?.address?.state}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 font-medium">Account Number:</span>
        <span className="text-gray-800">{details?.bank?.accountnumber}</span>
      </div>
    </div>
  </div>
</div>

  )
}

export default Details