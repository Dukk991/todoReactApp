import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../context/useUser'

export default function ProtectedRouter() {
    const { user } = useUser()
    if (!user || !user.token) return <Navigate to="/signin" />
    return <Outlet />
}