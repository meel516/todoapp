import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import { Outlet } from 'react-router-dom'
import useLoader, { LoaderContextProvider } from '../hooks/useLoader'
import { SetInterceptor } from '../api/apiClient'
import useToast from '../hooks/useToast'
import Toast from '../components/Toast/Toast'

const BaseLayout = () => {
    const  {loading} =useLoader()
    const {showToast,triggerToast,message,mode} =useToast()
    useEffect(()=>{
      SetInterceptor(triggerToast);
    },[])
  return (
    <>
 
    <Outlet/>
    <Loader isLoading={loading} />
    <Toast showToast={showToast} message={message} mode={mode} />
   
    </>  
)
}

export default BaseLayout