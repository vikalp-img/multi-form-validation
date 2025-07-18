import axios from 'axios'

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const addUser=async(data) =>{
   try {
    console.log(data,'dataInaxios')
    const dataToSend = {
        name:data.basic.name,
        email:data.basic.email,
        password:data.basic.password,
        street:data.address.street,
        city:data.address.city,
        state:data.address.state,
        accountNumber:data.bank.accountnumber,
        bankName:data.bank.bank,
        ifscCode:data.bank.ifsc
    }
   const response = await  axios.post(`${baseUrl}/add`,dataToSend,{
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
    },
      withCredentials: true
   });
   console.log(response,'axiosRes');
   
   return response.data.data;

   } catch (error) {
    console.log('error in axios res',error);
    
   }
} 


export const accessTokenApi = async()=>{

    try {
       const response = await axios.get(`${baseUrl}/refresh`,{
        withCredentials:true
       });
       
       
       return response.data;

    } catch (error) {
        
    }
}