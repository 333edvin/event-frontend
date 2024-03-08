import React, { useEffect, useState } from 'react'
import { Card, Col,  Row } from 'react-bootstrap'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LastPageIcon from '@mui/icons-material/LastPage';
import { getLatestUserDataAPI, getUserFeedbackAPI } from '../../services/allApis';
import { useAuth } from '../../Contexts/auth';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AdminDashboard from '../Admin/AdminDashboard';
function Dashboard() {
  const [auth, setAuth] = useAuth();
  const [modalShow, setModalShow] = useState(false);
  const [feedbackData,setFeedbackData] = useState([])
  
  const [latestWedding, setLatestWedding] = useState(null);
  useEffect(() => {
    const fetchLatestWedding = async () => {
      const reqHeader = {
        "Authorization": `Bearer ${auth?.token}`
      };
      try {
        const response = await getLatestUserDataAPI(reqHeader);
        setLatestWedding(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLatestWedding();
    getUserAllFeedback();
  }, []);


  const getUserAllFeedback = async()=>{
    const reqHeader = {
      "Authorization": `Bearer ${auth?.token}`
    };
    try {
      const result = await getUserFeedbackAPI(reqHeader)
      setFeedbackData(result.data)
    } catch (error) {
      console.log(error)
    }
  }
 

  return (
   <>
   <div className=' text-white '>
    {auth.user.role === 1?(
      <AdminDashboard/>
    ):(
<>
      <Row className=' rounded-5 p-3 mb-3' style={{backgroundImage:"linear-gradient(to right,#0078b0, #5eccff)"}}>
      
      <h2>
      <SupervisedUserCircleIcon/> Guests</h2>
      <Col>
      

      {latestWedding && (
        <div>
          <p>Total invites</p>
          <h1>{latestWedding.numberOfGuests}</h1>
          
        </div>
        )}
        </Col>
        
        </Row>
        

        
        <Row className='text-white '>
      <Col className=' rounded-5 p-3 ' lg={8} style={{backgroundImage:"linear-gradient(to right,#b00000, #e64747)"}}>
      {latestWedding && (
        <div>
          <div className='d-flex align-items-center justify-content-between'>
          <p><LastPageIcon/> Last Booking</p><p style={{fontSize:"12px"}}>21/01/2024</p>
          </div>
          <p> {latestWedding.brideName} & {latestWedding.groomName}</p>
          <p style={{fontSize:'11px'}}>{latestWedding.email}</p>
        </div>
      )}
      
      </Col>
     
    </Row>
    
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Notifications
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {feedbackData?.map((data, index) => (
    <div key={index}>
      <Card className='my-2 p-2 shadow'>

      <p>{data.feedback}</p> 
      </Card>
    </div>
  ))}
  </Modal.Body>
  <Modal.Footer>
  <Button onClick={() => setModalShow(false)}>Close</Button>
  </Modal.Footer>
  </Modal>
  </>
  )}
  </div>
  </>
  )
}

export default Dashboard