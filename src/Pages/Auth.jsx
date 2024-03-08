import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allApis'
import { useAuth } from '../Contexts/auth'
import {toast} from 'react-toastify'
import loginback from '../Assets/login.jpg'
import registerback from '../Assets/register.jpg'
import { Button, Col, Image, Row } from 'react-bootstrap'
function Auth({register}) {
    const isRegister = register? true : false
    const [auth,setAuth] = useAuth()

    //state  creation
    const navigate = useNavigate()
    const [userData,setUserData] = useState({
      username:"",
      email:"",
      phone:"",
      password:"",
    address:""
    })
  
      // register function 
      const registerData = async()=>{
          
          const {username,email,phone,password,address} = userData
          if(!username || !email || !phone || !password || !address){
            toast.error("please fill all fields")
          }else{
            const result = await registerAPI(userData)
            console.log(result)
            if(result.status === 200){
              toast.success(`Registered Successfully`)
              navigate('/login')
              
            }else{
              
              toast.error(result.response.data)
            }
          }
  
      }
  
      //login function
      const loginData = async()=>{
        const {email,password} = userData
        
        if(!email || !password){
          toast.error("please fill all fields")
        }else{
          const result = await loginAPI(userData)
          if(result.status === 200){
            toast.success("login successful")
            setAuth({
              ...auth,
              user:result.data.user,
              token:result.data.token
            })
            //set user object into session storage
            sessionStorage.setItem('existingUser',JSON.stringify(result.data.user))
            sessionStorage.setItem('token',result.data.token)
            navigate("/")
            
          }else{
            
            toast.error("please enter valid details")
          }
        }
      }
  return (
    <>
    <div style={{ background: isRegister ? `url(${registerback})` : `url(${loginback})`,backgroundSize:"cover" }} className='p-5 ' >

<Row className='m-0 bg-white rounded-5'>
<Col>
    <form className='my-5 px-5  d-flex flex-column gap-3'>
      <span style={{fontSize:"30px",fontWeight:"bolder"}}>
      {isRegister?<p>SignUp</p>:<p>Login</p>}
      </span>
          {
            isRegister &&
            <>
              <input type="text" 
              placeholder='Name' 
              className='form-control' 
              onChange={e=>setUserData({...userData,username:e.target.value})}
              value={userData.username}/>

              
              <input type="text" 
              placeholder='Address' 
              className='form-control' 
              onChange={e=>setUserData({...userData,address:e.target.value})}
              value={userData.address}/>

                <input type="text" 
              placeholder='phone' 
              className='form-control' 
              onChange={e=>setUserData({...userData,phone:e.target.value})}
              value={userData.phone}/>
            </>
            }

            <input type="text" 
            placeholder='Email' 
            className='form-control' 
            onChange={e=>setUserData({...userData,email:e.target.value})}
            value={userData.email}/>

            <input type="text" 
            placeholder='Password' 
            className='form-control' 
            onChange={e=>setUserData({...userData,password:e.target.value})}
            value={userData.password}/>

 
        {
          isRegister ?
          
          <>

          <Button onClick={registerData} className='btn btn-success'>Signup</Button>

          <Link to={'/login'}>
          <p className='text-center text-secondary' style={{fontSize:"12px",fontWeight:"bolder"}}>Already Signup ? please login here..</p>
          </Link>
          </>
          :
          <>

          <Button onClick={loginData} className='btn btn-success'>Login</Button>

          <Link to={'/register'}>
          <p className='text-center text-secondary' style={{fontSize:"12px",fontWeight:"bolder"}}>Not Signup ? please Signup here..</p>
          </Link>
          </>
        }
  </form>
        </Col>
        <Col className='d-flex justify-content-center align-items-center p-2'>
          {isRegister?(
            <Image src={registerback} className='img-fluid rounded-3' style={{width:"100%",height:"510px"}}/>

          ):(
            <Image src={loginback} className='img-fluid rounded-3' style={{width:"100%"}}/>

          )}
        </Col>

            </Row>
        </div>
    </>
  )
}

export default Auth