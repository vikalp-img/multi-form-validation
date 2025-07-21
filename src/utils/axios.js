import axios from 'axios'
import api from './accessTokenRefresh';

const baseUrl = import.meta.env.VITE_BACKEND_URL;
// const {accessToken} = useContext(TabContext);
// const accessToken = localStorage.getItem('accessToken');


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
   const response = await  api.post(`/add`,dataToSend)
   console.log(response,'axiosRes');
   
   return response?.data.data;

   } catch (error) {
    console.log('error in axios res',error);
    
   }
} 


export const accessTokenApi = async()=>{

    try {
       const response = await api.get(`/refresh`)   
       
       return response.data;

    } catch (error) {
        
    }
}

export const userDetailsApi = async(accessToken)=>{

   
    try {
        const response = await api.get(`/details`)
        
        return response.data;

    } catch (error) {
        console.log('error in userDetailsApi',error);
    }
}

export const loginApi = async(data) => {
    try {
        const response = await api.post(`/login`,data);
        console.log(response,'loginApiResponse');
        return response.data;
    } catch (error) {
        console.log('error in loginApi',error);
        throw error;
    }
}

export const logoutApi = async() => {
    try {
        const response = await api.get(`/logout`);
        console.log(response,'logoutApiResponse');
        return response?.data;
    } catch (error) {
        console.log('error in logoutApi',error);
        throw error;
    }
}