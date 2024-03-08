import {  createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({children})=>{
    const [auth,setAuth] = useState({
        user:null,
        token:''
    })
    useEffect(()=>{
        const data = JSON.parse(sessionStorage.getItem('existingUser'))
        if(data){
            // const parseData = JSON.parse(data);
            const token = sessionStorage.getItem('token')
            setAuth({
                ...auth,
                user:data,
                token:token
            })
        }
    },[])
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = ()=>useContext(AuthContext);
export {useAuth,AuthProvider}