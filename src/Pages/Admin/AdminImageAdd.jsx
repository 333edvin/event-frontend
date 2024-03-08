import React, { useEffect, useState } from 'react'
import { deleteUserImageAPI, getUserImageAPI, uploadImageAPI } from '../../services/allApis';
import { Button, Container, Image, Modal, ModalFooter } from 'react-bootstrap';
import  AddCircleIcon from '@mui/icons-material/AddCircle';
import gall1 from '../../Assets/addimage.jpg'
import { baseUrl } from '../../services/baseUrl';
import {toast} from 'react-toastify'
function AdminImageAdd() {
    const [showSmallModal, setShowSmallModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (item) => {
      setSelectedItem(item);
      setShow(true);
    };
  
    const [userImage, setUserImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [token, setToken] = useState("");
    const [photo, setPhoto] = useState([]);
  
    useEffect(() => {
      if (userImage) {
        setPreview(URL.createObjectURL(userImage));
      }
    }, [userImage]);
  
    useEffect(() => {
      if (sessionStorage.getItem("token")) {
        setToken(sessionStorage.getItem("token"));
      }
    }, []);
  
    useEffect(() => {
      gettingUserPhotos();
    }, []);
  
    const handleShowModal = () => {
      setShowSmallModal(true);
    };
  
    //upload user image============================
    //upload user image============================
const uploadUserImage = async () => {
    if (!userImage) {
      toast.error("Please select an image");
    } else {
      const reqBody = new FormData();
      reqBody.append("image", userImage);
  
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      };
  
      try {
        const result = await uploadImageAPI(reqBody, reqHeader);
        if (result.status === 200) {
          toast.success('Photo added successfully');
          setUserImage(null);
          setPreview(null);
          gettingUserPhotos();
          setShowSmallModal();
        } else {
          console.log(result.response.data);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  
  //get user images=========================================
    const gettingUserPhotos = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        };
        const result = await getUserImageAPI(reqHeader);
        setPhoto(result.data);
      } catch (error) {
        console.error("Error fetching user photos:", error);
      }
    };
  
   //delete user image=======================================
  const deleteUserImage = async (pid) => {
    const token = sessionStorage.getItem('token');
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    };
    try {
      await deleteUserImageAPI(pid, reqHeader);
      gettingUserPhotos();
      handleClose()
    } catch (error) {
      console.error("Error deleting user image:", error);
    }
  };
  
  return (
    <div className=''>
        <Container fluid>
        <div className="d-flex justify-content-between">
          <p style={{ fontSize: '25px' }}>Gallery</p>
          <AddCircleIcon onClick={handleShowModal} style={{ fontSize: '35px', color: 'green' }} />
        </div>
        <hr />

        <Modal show={showSmallModal} dialogClassName="modal-md mt-5" onHide={() => setShowSmallModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center p-3">
              <label htmlFor="fileInput">
                <img src={preview ? preview : gall1} className="img-fluid rounded" alt="Preview" />
              </label>
              <input id="fileInput" type="file" style={{ display: 'none' }} onChange={(e) => setUserImage(e.target.files[0])} />
            </div>
          </Modal.Body>
          <ModalFooter>
            <Button variant="primary" onClick={uploadUserImage}>Upload</Button>
          </ModalFooter>
        </Modal>

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
            <div  style={{position:"absolute",top:'10px',left:"10px"}}>

            <Button onClick={()=>deleteUserImage(selectedItem._id)}><i className='fa-solid fa-trash'></i></Button>
            </div>
            </>
            )}

        </Modal.Body>
       
      </Modal>
      </Container>
    </div>
  )
}

export default AdminImageAdd