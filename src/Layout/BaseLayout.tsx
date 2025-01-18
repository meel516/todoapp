import React, { useState } from 'react'
import Loader from '../components/Loader/Loader'
import { Outlet } from 'react-router-dom'
import useLoader, { LoaderContextProvider } from '../hooks/useLoader'

const BaseLayout = () => {
    const  {loading} =useLoader()
  return (
    <>
 
    <Outlet/>
    <Loader isLoading={loading} />
   
    </>  
)
}

export default BaseLayout