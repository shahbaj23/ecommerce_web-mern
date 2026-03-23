import React from 'react'
import { isTokenValid } from './checkTokens'
import {Navigate} from "react-router-dom"


export default function ProtectedRoutes({token, children}) {
    

    if(!isTokenValid(token)){
        return <Navigate to={"/login"} replace/>
    }

  return (
   children
  )
}
