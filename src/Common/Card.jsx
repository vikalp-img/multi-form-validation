import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import TabContext from '../context/Tab';
import { useNavigate } from 'react-router-dom';
import { accessTokenApi, addUser } from '../utils/axios';
import { useEffect } from 'react';


const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const Card = ({labels,formikValues,tabs}) => {

const {selectedTab,setSelectedTab,details,setDetails,authenticated,setAuthenticated,setLoading} = useContext(TabContext);




const navigate = useNavigate();

 const iniVal = formikValues[0];
    
 const keys = Object.keys(iniVal);
    // console.log(formikValues,'formikValues');
    console.log(keys,'keys');
    
    console.log(iniVal,'initialValues');

    const validationSchema = {};
        keys.forEach((item)=>{
        switch (item) {
            case 'name':
             validationSchema[item]=  Yup.string().min(3,'3 minimum characters required').required('Name required')
                break;
            case 'email'  :
              validationSchema[item]=  Yup.string().email('Invalid email format').required('Email required')
                break;
            case 'password' :
               validationSchema[item]= Yup.string().matches(/^(?=.*[A-Z])(?=.*\d).{6,}$/,'Password must be of 6 chars including 1 uppercase and 1 number').required('Password required')
                break;  
            case 'street' :
                validationSchema[item] = Yup.string().min(3,'Street should have at least 3 chars').required('required Field')
                break; 
            case 'city'  :
                validationSchema[item] = Yup.string().min(3,'City should have at least 3 Chars').required('required Field')
                break; 
            case 'state':
                validationSchema[item]= Yup.string().min(3,'required at least 3 chars').required('required field')
                break; 
            case 'accountnumber' : 
                validationSchema[item] = Yup.string().matches(/^\d{10}$/,'Account number should be of 10 numbers').required('required field') 
                break ;
            case 'bank'  :
                validationSchema[item] = Yup.string().min(3,'At least of 3 chars').required('required field')
                break;
            case 'ifsc' :
                validationSchema[item] = Yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/,'IFSC code must be in RBI standard format').required('required field')
                break;   
            default:
                break;
        }
    })
    

    console.log(validationSchema,'validationSchema');
    
    
const formik = useFormik({
    initialValues:iniVal,
    enableReinitialize: true,
    validationSchema:Yup.object(validationSchema),
   
    onSubmit:(values,{resetForm})=>{
        console.log(values,'valuesOnly');
      
        if (selectedTab ==='basicDetails'){
     setDetails(prev => ({...prev,basic: values}));
     setSelectedTab('addressDetails');
   } else if (selectedTab==='addressDetails'){
     setDetails(prev => ({...prev,address: values}));
     setSelectedTab('bankDetails');
   } else {
     setDetails(prev => ({...prev,bank: values}));
     
     
     navigate('/details');
     console.log('Submitted', {...details, bank: values});
     const data= {...details, bank: values};
    const accessToken = addUser(data);
    if(accessToken){
      setAuthenticated(true);
    }else{
      setAuthenticated(false);
    }
   }
        // selectedTab ==='basicDetails' ? setSelectedTab('addressDetails') && setDetails({['basic']:values}) : setSelectedTab('bankDetails') && setDetails(prev=>({...prev,['address']:values}));
        resetForm();
    }
    
})

// console.log(details,'Details');


  return (





    <div className="max-w-2xl mx-auto w-full px-4 py-10">
  <div className="border border-gray-200 rounded-2xl shadow-md bg-white">

    {/* Tabs */}
    <div className="flex rounded-t-2xl overflow-hidden">
      {tabs.map((item) => (
        <div
          key={item.value}
          className={`flex-1 text-center py-3 text-sm font-semibold transition 
            ${selectedTab === item.value 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-600 '}`}
        >
          {item.label}
        </div>
      ))}
    </div>

    {/* Form */}
    <form className="p-8 space-y-6" onSubmit={formik.handleSubmit}>
      {labels?.map((item) => (
        <div key={item.value}>
          <label htmlFor={item.value} className="block text-sm font-medium text-gray-700 mb-1">
            {item.label}
          </label>
          {item.value === 'state' ? (
            <select
              name={item.value}
              id={item.value}
              value={formik.values[item.value] ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          ) : (
            <input
              name={item.value}
              id={item.value}
              type={item.type}
              placeholder={`Enter your ${item.label}`}
              value={formik.values[item.value] ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          )}
          {formik.touched[item.value] && formik.errors[item.value] && (
            <p className="text-red-500 text-xs mt-1">{formik.errors[item.value]}</p>
          )}
        </div>
      ))}

      <div className="flex justify-between mt-6">
        {selectedTab !== 'basicDetails' && (
          <button
            type="button"
            onClick={() => {
              if (selectedTab === 'addressDetails') setSelectedTab('basicDetails');
              else if (selectedTab === 'bankDetails') setSelectedTab('addressDetails');
            }}
            className="bg-red-500 hover:bg-red-600 text-white cursor-pointer font-medium px-4 py-2 rounded-lg transition"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className="ml-auto bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          {selectedTab === 'bankDetails' ? 'Submit' : 'Next'}
        </button>
      </div>
    </form>
  </div>
</div>

  )
}

export default Card