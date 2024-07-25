import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReactLoading from 'react-loading'

export default function Protected ({children, authentication = true}){

    const [loader, setLoader] =useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector((state)=>
      state.auth.status
    );

    useEffect(()=>{
      console.log('Auth status:', authStatus);
      console.log('Required authentication:', authentication);
         if(authentication && authStatus !== authentication){
            navigate('/login');
         }
         if(!authentication && authStatus !== authentication){
              console.log(authStatus);
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


