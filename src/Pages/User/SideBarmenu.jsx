import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard';
import Bookings from './Bookings';
import Photos from './Photos';
import ContactGuest from './ContactGuest';
import { Col, Image, Row } from 'react-bootstrap';
import {Button} from '@mui/material'
import logo from '../../Assets/logo.jpeg'
import backgroundImage from '../../Assets/backgroundImage.jpg'
import { useAuth } from '../../Contexts/auth';
import AdminFeedbacks from '../Admin/AdminFeedbacks';
import AdminBookings from '../Admin/AdminBookings';
import AdminImageAdd from '../Admin/AdminImageAdd';
function SideBarmenu() {
    const [screen, setScreen] = useState('Screen1');
    const [auth,setAuth] = useAuth()
    const [date,setDate] =useState()
    
    const timestamp = Date.now(); // This would be the timestamp you want to format
  useEffect(()=>{

    setDate(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp))
  },[])
    
  return (
    <>
   
    <Row className='m-0'>
<Col lg={3}>
  <div className='d-flex justify-content-center'>

    <Image src={logo} width={"350px"}/>
  </div>
    <hr />
    <div className="sidebar d-flex flex-column p-5 gap-2 " >
      {auth.user.role === 1?(
        <>
         <Button onClick={() => setScreen('Screen1')} variant="text" className='text-dark'>Dashboard</Button>
         <Button onClick={() => setScreen('Screen5')} variant="text" className='text-dark'>Bookings</Button>
         <Button onClick={() => setScreen('Screen6')} variant="text" className='text-dark'>Feedbacks</Button>
         <Button onClick={() => setScreen('Screen7')} variant="text" className='text-dark'>Add Images</Button>
        </>
      ):(
<>
    <Button onClick={() => setScreen('Screen1')} variant="text" className='text-dark'>Dashboard</Button>
    <Button onClick={() => setScreen('Screen2')} variant="text" className='text-dark'>Bookings</Button>

    <Button onClick={() => setScreen('Screen3')} variant="text" className='text-dark'>Photos</Button>
 

    <Button onClick={() => setScreen('Screen4')} variant="text" className='text-dark'>Contact Guest</Button>
</>
      )}
  </div>
</Col>
<Col lg={9} >
    <div  style={{backgroundImage:`url(${backgroundImage})`,backgroundSize:"cover"}} className='p-4 mt-3 text-dark rounded-5'>
        <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center gap-3  p-3 pb-4 w-50 rounded-5' style={{backgroundColor:"rgba(255, 255, 255, 0.418)",backdropFilter:"blur(3px)"}}>
<div style={{width:"150px",height:"150px",borderRadius:"50%",fontSize:"50px",fontWeight:'bolder',background:"linear-gradient(to right,rgb(46, 143, 255),rgb(241, 83, 255))"}} className=' pt-3 d-flex align-items-center justify-content-center text-uppercase text-white'>
<p>{[...auth.user.username][0]}</p>
</div>
            <div>
            <p className='text-uppercase'>{auth.user.username}</p>
              <p>{auth.user.email}</p>
              <p>8129779713</p>
              </div>

            
          
        </div>
              <div >
              <p className=''>{date}</p>
              </div>
        </div>
    </div>
  <div className="main-screen p-3">
    
    {screen === 'Screen1' && <Dashboard/>}
    {screen === 'Screen2' && <Bookings/>}
    {screen === 'Screen3' && <Photos/>}
    {screen === 'Screen4' && <ContactGuest/>}
    {screen === 'Screen5' && <AdminBookings/>}
    {screen === 'Screen6' && <AdminFeedbacks/>}
    {screen === 'Screen7' && <AdminImageAdd/>}
  </div>
</Col>
    </Row>
    </>
  )
}

export default SideBarmenu