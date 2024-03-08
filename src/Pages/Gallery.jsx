import React, { useEffect, useState } from 'react'
import { getAllImagesAPI, getUserImageAPI } from '../services/allApis';
import { baseUrl } from '../services/baseUrl';
import { Container, Image, Modal } from 'react-bootstrap';

function Gallery() {
  const [photo, setPhoto] = useState([]);
  const [token, setToken] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);

    const handleShow = (item) => {
      setSelectedItem(item);
      setShow(true);
    };
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    gettingUserPhotos();
  }, []);
  //get user images=========================================
  const gettingUserPhotos = async () => {
    try {
      
      
      const result = await getAllImagesAPI();
      setPhoto(result.data);
    } catch (error) {
      console.error("Error fetching user photos:", error);
    }
  };
 
  return (
    <div className='mt-5'>
     <Container fluid>
        


        <div className="gallery">
        {photo.length > 0 ? (
          photo.map((item, index) => (
            <div key={index} className="pics">
              <Image
                src={`${baseUrl}/uploads/${item?.image}`}
                alt="user-img"
                style={{ width: '100%', height: 'auto' }}
                className="img-fluid"
                onClick={() => handleShow(item)}
              />
            </div>
          ))
        ) : (
          <p className="empty-message">No photos available</p>
        )}
      </div>

      <Modal show={show} onHide={handleClose} style={{zIndex:"9999"}}>
        <Modal.Body className='p-0'>
          {selectedItem && (
            <>
            <Image
            src={`${baseUrl}/uploads/${selectedItem.image}`}
            alt="user-img"
            className="img-fluid"
            />
            
            </>
            )}

        </Modal.Body>
       
      </Modal>
      </Container>
    </div>
  )
}

export default Gallery