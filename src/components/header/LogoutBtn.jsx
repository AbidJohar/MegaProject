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
     <button onClick={logoutHander} className='px-6 py-3 bg-blue-500 rounded-full '>Logout</button>
  )
}

export default LogoutBtn
