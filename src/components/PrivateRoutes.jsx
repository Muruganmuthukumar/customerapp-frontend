import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoutes() {
    const { authentication } = useSelector((state) => state.auth)
    return authentication ? <Outlet/> : <Navigate to='/signin'/>
}

export default PrivateRoutes;