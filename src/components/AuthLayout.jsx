import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReactLoading from 'react-loading'

export default Protected = ({children, authentication = true}) => {

    const [loader, setLoader] =useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector((state)=>
      state.auth.status
    );

    useEffect(()=>{
         if(authentication && authStatus !== authentication){
            navigate('/login');
         }
         if(!authentication && authStatus !== authentication){
            navigate('/');
         }
         setLoader(false);

    },[authStatus,navigate,authentication])
  return  loader ? <ReactLoading 
  type={"bars"}
  color={"#00ffff"}
  height={100}
  width={100}
  /> : <>{children}</>
}


