import React, { useEffect, useState } from 'react'
import { getAllUsersBookingsAPI, getAllUsersFeedbackAPI } from '../../services/allApis'
import { Col, Container, Image, Row } from 'react-bootstrap'
import chart from '../../Assets/chart.png'

function AdminDashboard() {
     const [userBookings,setUserBookings] = useState([])
    const getBookings = async()=>{
            const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Authorization":`Bearer ${token}`
        }
        try {
            const result = await getAllUsersBookingsAPI(reqHeader)
            setUserBookings(result.data)
        } catch (error) {
            console.log(`error in getting Bookings ${error}`)
        }
    }
    useEffect(()=>{
        getBookings()
    },[])
    const [userFeedback,setUserFeedback] = useState([])
    const getFeedbacks = async()=>{
            const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Authorization":`Bearer ${token}`
        }
        try {
            const result = await getAllUsersFeedbackAPI(reqHeader)
            setUserFeedback(result.data)
        } catch (error) {
            console.log(`error in getting feedback ${error}`)
        }
    }
    useEffect(()=>{
        getFeedbacks()
    },[])
  return (
    <div>
            <Image src={chart} style={{width:"100%",height:"300px"}} className='rounded-5'/>
            <Container>

         <Row className='gap-2 my-4'>

     
      <Col style={{backgroundImage:"linear-gradient(to right,#0078b0, #5eccff)"}} className=' rounded-5 p-3 mb-3' >
      

        <div>
          <p>Total Bookings</p>
          <p style={{fontSize:"50px",fontWeight:"bolder"}}>{userBookings?.length}</p>
          
        </div>
      </Col>
      <Col className='rounded-5 p-3 mb-3' style={{backgroundImage:"linear-gradient(to right,#03b000, #58ed80)"}}>
      <p>Total Feedbacks</p>
      <p style={{fontSize:"50px",fontWeight:"bolder"}}>{userFeedback?.length}</p>


      </Col>
    </Row>
            </Container>
    </div>
  )
}

export default AdminDashboard