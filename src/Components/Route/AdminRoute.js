import { useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom'
import { useAuth } from '../../Contexts/auth'
import SpinnerLoader from '../SpinnerLoader'
import { AdminRouteAPI } from '../../services/allApis'

export default function AdminRoute(){
    const [ok,setOk] = useState(false)
    const [auth,setAuth] = useAuth()

    useEffect(()=>{
        const authCheck = async()=>{
            const reqHeader = {
                "Authorization":`Bearer ${auth?.token}`
              }
        
            const res = await AdminRouteAPI(reqHeader)
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck();
    },[auth?.token])
        
    return ok?<Outlet/>:<SpinnerLoader/>
}