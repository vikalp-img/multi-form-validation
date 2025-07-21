import { useFormik } from 'formik';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../utils/axios';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import TabContext from '../context/Tab';

const LoginPage = () => {

    const {loading,setLoading,setAuthenticated,authenticated}=useContext(TabContext);
    // const accessToken = localStorage.getItem('accessToken');
      const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email format').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters 1 upper case 1 num').required('Password is required')
        }),
        onSubmit: async (values) => {
            try {
                const response = await loginApi(values);
                if (response?.success) {
                    localStorage.setItem('accessToken', response?.data);
                    toast.success('Login successful');
                    setAuthenticated(true);
                    navigate('/details');
                    
                } else {
                    console.error('Login failed:', response?.response?.data.error);
                }
            } catch (error) {
                console.error('Error during login:', error?.response?.data?.error || error.message);
                toast.error('Login failed! '+ (error?.response?.data?.error || error.message));
            }
        }
    });
  return (
    <div>
        <div>
            <h1 className='text-2xl font-bold text-center mt-10'>Login Page</h1>
            <p className='text-center mt-4'>Please login to access your details</p>
            <form action="" onSubmit={formik.handleSubmit} >
                <div className='max-w-md mx-auto mt-10 space-y-4 border-gray-600 p-6 rounded-lg shadow-lg bg-white'>
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                    <input type="email" id='email' placeholder='Enter your email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className='mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50' />
                    {formik.touched.email && formik.errors.email ? (
                        <p className='text-red-500 text-sm'>{formik.errors.email}</p>
                    ) : null}
                    <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
                    <input type="password" id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter your password' value={formik.values.password} className='mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50' />
                    {formik.touched.password && formik.errors.password ? (
                        <p className='text-red-500 text-sm'>{formik.errors.password}</p>
                    ) : null}

                    <p>If Not Registered yet! <span className='text-blue-500 underline cursor-pointer ' onClick={()=>navigate('/')}>register yourself here</span></p>
        
                    <Toaster />
                    
                    <button type="submit"  className='w-full bg-blue-600 text-white rounded-lg py-2 cursor-pointer hover:bg-blue-700 transition duration-200'>Login</button>
                     </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage