import React, { useContext } from 'react'
import Card from '../Common/Card'
import TabContext from '../context/Tab'

const Register = () => {

 const tabs = [{label:'Basic Details',value:'basicDetails'},{label:'Address Details',value:'addressDetails'},{label:'Bank Details',value:'bankDetails'}]
const {details} = useContext(TabContext);
const {selectedTab} = useContext(TabContext)

  return (
   <div>
     <div className='flex justify-center mt-15'>
        <p className='text-xl font-semibold'>Register Yourself</p>    
     </div>
   {selectedTab==='basicDetails' ? <Card labels={[{label:'Name',type:'text',value:'name'},{label:'Email',type:'text',value:'email'},{label:'Password',type:'password',value:'password'}]}
      formikValues={[details.basic || {name:'',email:'',password:''}]} 
      tabs={tabs} /> : selectedTab==='addressDetails' ? <Card labels={[{label:'Street',type:'text',value:'street'},{label:'City',type:'text',value:'city'},{label:'State',type:'text',value:'state'}]}
      formikValues={[details.address|| {street:'',city:'',state:''}]} tabs={tabs}/> : <Card labels={[{label:'Account Number',type:'text',value:'accountnumber'},{label:'Bank Name',type:'text',value:'bank'},{label:'IFSC Code',type:'text',value:'ifsc'}]}
      formikValues={[details.bank || {accountnumber:'',bank:'',ifsc:''}]} tabs={tabs}/>}
     
    
   </div>
  )
}

export default Register