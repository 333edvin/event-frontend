import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Button } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import { getUserAllEventAPI } from '../../services/allApis';
import { useAuth } from '../../Contexts/auth';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Feedback from './Feedback';
function Bookings() {
  const [events, setEvents] = useState([]);
  const [auth, setAuth] = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showSmallModal, setShowSmallModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);


  useEffect(() => {
    const fetchEvents = async () => {
      const reqHeader = {
        "Authorization": `Bearer ${auth?.token}`
      };
      try {
        const response = await getUserAllEventAPI(reqHeader);
        if (response) {
          setEvents(response.data);
        } else {
          console.log('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleShowDetails = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };
  const handleShowFeedback = (event) => {
    setSelectedFeedback();
    setShowSmallModal(true);
  };

  //Function to format the date 
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };



  return (
    <Container>
      <Row className='justify-content-between'>
        {events.map(event => (
          <Col key={event.id} md={4} lg={12} className="mb-3">
            <Card>
              <Card.Body className='d-flex justify-content-between'>
                <Card.Title>{event.brideName} & {event.groomName}</Card.Title>
                <div>

                {/* <Button disabled={disabled} onClick={() => setDisabled(true)}>Edit{timer}</Button> */}
                <Button variant="primary" onClick={() => handleShowDetails(event)}>Show Details</Button>
                <Button variant="primary" onClick={()=>handleShowFeedback()}>Feedback</Button>

                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-xl mt-5"  style={{ zIndex: 9999 }}>
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <Row>

              <Col >
                <div className='d-flex align-items-center justify-content-center gap-3 my-3 text-white'>

               <Card style={{width:"150px",height:"150px",backgroundColor:"rgb(72, 182, 255)"}} className='d-flex align-items-center justify-content-center shadow'>
              <p> {selectedEvent.groomName}</p>
              <MaleIcon style={{color:"rgb(0, 73, 122)",fontSize:"30px",fontWeight:"bolder"}}/>
              </Card>
              <span style={{fontSize:"30px",fontWeight:"bold",color:"black"}}>&</span>
              <Card style={{width:"150px",height:"150px",backgroundColor:"rgba(255, 67, 199, 0.712)"}} className='d-flex align-items-center justify-content-center shadow'>
                <p>{selectedEvent.brideName}</p>
                <FemaleIcon  style={{color:"rgb(107, 0, 110)",fontSize:"30px",fontWeight:"bolder"}}/>
              </Card>
                </div>
              <p style={{fontSize:"13px"}} className='text-center'>Wedding Date : <br /><span style={{fontSize:'40px',fontWeight:"bolder"}}>{formatDate(selectedEvent.weddingDate)}</span></p>
              </Col>
              <Col>
              <p style={{fontSize:"13px"}}>{selectedEvent.email} <br /> {selectedEvent.phone}</p>

              <p>Selected Venue : {selectedEvent.weddingVenue}</p> 
              <p>Invites : {selectedEvent.numberOfGuests}</p> 
              <p>Wedding Style : {selectedEvent.weddingStyle}</p> 
              <p>Services Required : {selectedEvent.servicesRequired}</p> 
              <p>Preference : {selectedEvent.additionalPreferences}</p> 
              </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSmallModal} onHide={() => setShowSmallModal(false)} dialogClassName="modal-md mt-5"  style={{ zIndex: 9999 }}>
        <Modal.Header closeButton>
          <Modal.Title>Give Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Feedback/>
        </Modal.Body>
        
      </Modal>

      
    </Container>
  );
}

export default Bookings;
