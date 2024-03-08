import React, { useEffect, useState } from 'react'
import { getAllUsersBookingsAPI } from '../../services/allApis'
import { Card, Col, Container, Row } from 'react-bootstrap'

function AdminBookings() {
    const [userBookings,setUserBookings] = useState([])
    const getBookings = async()=>{
            const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Authorization":`Bearer ${token}`
        }
        try {
            const result = await getAllUsersBookingsAPI(reqHeader)
            setUserBookings(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(`error in getting Bookings ${error}`)
        }
    }
    useEffect(()=>{
        getBookings()
    },[])
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      };
  return (
        
        <Container>
           
           {userBookings?.map((data)=>(
                <Card key={data.id} className='px-5 py-3 my-2'>

  <div className='d-flex justify-content-between '>
<div className='d-flex gap-2 text-uppercase'>

                <p> {data.groomName} </p> &
                  <p> {data.brideName}</p>
</div>
                <p style={{fontSize:"13px"}}>{data.email} <br /> </p>
  </div>
                 <p style={{fontSize:"13px"}}>+91 {data.phone}</p>
                 <Row style={{fontSize:"14px"}}>
                    <Col>
                    <p   className=''>Wedding Date : {formatDate(data.weddingDate)}</p>
  
  <p>Selected Venue : {data.weddingVenue}</p> 
  <p>Invites : {data.numberOfGuests}</p></Col>
                    <Col style={{borderLeft:"1px solid grey"}}>
                    <p>Wedding Style : {data.weddingStyle}</p> 
                <p>Services Required : {data.servicesRequired}</p> 
                <p>Preference : {data.additionalPreferences}</p></Col>
                 </Row>
                
                
                </Card>
           ))}
   </Container>
  )
}

export default AdminBookings