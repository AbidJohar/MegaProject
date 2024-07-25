import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/Auth'
import { logout } from '../../features/auth/authSlicer'

const LogoutBtn = () => {

     const dispatch = useDispatch();

     const logoutHander = ()=>{
         authService.logout()
         .then(()=>{
            dispatch(logout());
         })
     }
  return (
     <button onClick={logoutHander} className='uppercase rounded-full  text-red-500 bg-transparent border-[1.5px] border-red-500 px-4 transition-colors py-2  hover:bg-red-500 hover:text-white before:bg-red-500  before:transition-transform hover:border-gray-300 hover:rounded-full'>Logout</button>
  )
}

export default LogoutBtn
