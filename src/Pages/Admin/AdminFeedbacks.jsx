import React, { useEffect, useState } from 'react'
import { getAllUsersFeedbackAPI } from '../../services/allApis'
import { Card, Container } from 'react-bootstrap'

function AdminFeedbacks() {
    const [userFeedback,setUserFeedback] = useState([])
    const getFeedbacks = async()=>{
            const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Authorization":`Bearer ${token}`
        }
        try {
            const result = await getAllUsersFeedbackAPI(reqHeader)
            setUserFeedback(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(`error in getting feedback ${error}`)
        }
    }
    useEffect(()=>{
        getFeedbacks()
    },[])
  return (
    <div>
        <Container>
           
                {userFeedback?.map((data)=>(
                     <Card className='my-2 px-5 py-2'>
                    <div className='d-flex align-items-center justify-content-between '>
                    <p style={{fontSize:"20px",fontWeight:"bold"}}>From : {data.username}</p>
                    <p style={{fontSize:"13px"}}>{data.email}</p>
                    </div>
                    <p>{data.feedback}</p>
            </Card>
                ))}
        </Container>
    </div>
  )
}

export default AdminFeedbacks