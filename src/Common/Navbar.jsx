import React, { useContext } from 'react'
import { logoutApi } from '../utils/axios';
import TabContext from '../context/Tab';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

const {setAuthenticated, setDetails} = useContext(TabContext);
const navigate = useNavigate();
    const logoutHandler = () => {
          localStorage.removeItem('accessToken');
          logoutApi();
          setAuthenticated(false); 
           setDetails({});
          navigate('/login');
         
        }
  return (
    <div className='max-w-screen m-auto w-full bg-gray-800 text-white px-25 h-14 flex items-center justify-between'>
        <div className=' flex items-center justify-between w-full'>
            <p>navbar</p>
            <button className='bg-red-500 rounded px-2 h-9 text-white cursor-pointer hover:bg-red-600' onClick={logoutHandler} >Logout</button>
    
        </div>
    </div>
  )
}

export default Navbar