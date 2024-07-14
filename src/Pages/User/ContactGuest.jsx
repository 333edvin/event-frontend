import React, { useEffect, useState } from 'react';
import { createContactAPI, deleteContactListAPI, getContactListAPI, updateContactListAPI } from '../../services/allApis';
import { Button, Col, Container, Row } from 'react-bootstrap';
import {toast} from 'react-toastify'
function ContactGuest() {
  const [contactData, setContactData] = useState({ guestname: '', number: '' });
  const token = sessionStorage.getItem('token');

  const createContact = async () => {
    const { guestname, number } = contactData;
  
    if (!guestname || !number) {
      toast.error("Please enter both guest name and number");
      return;
    }
  
    
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json" 
    };
  
    try {
      const result = await createContactAPI(contactData,reqHeader); 
      if (result.status === 200) {
        toast.success('Contact added successfully');
        setContactData({guestname:'',number:''});//to make the fields empty after adding contact
      } else {
        console.log(result.response.data);
      }
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  }
  
  //getting contact list======================================
const [listData,setListData] = useState([])
  const getContactList = async()=>{
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
    };
    try {
      if(!token){
        toast.error('Cant Get Guest Contact List')
      }else{
        const result = await getContactListAPI(reqHeader)
        console.log(result.data)
        if(result){
          setListData(result.data)
        }
      }
    } catch (error) {
      console.error("Error getting contact List :", error);
    }
  }
  useEffect(()=>{
    getContactList()
  },[])

  //edit contact ==============================================
  // const updateContactList = async(pid)=>{
  //   const {guestname,number} = contactData
  //   const reqHeader = {
  //     "Authorization": `Bearer ${token}`,
  //     "Content-Type": "application/json" 
  //   };
  //   try {
  //     const result = await updateContactListAPI({_id:id},{guestname,number},{new:true})
  //     console.log(result)
  //   } catch (error) {
  //     console.error("Error updating contact:", error);
  //   }
  // }
  //delete contact===============================================
  const deleteContact = async(pid)=>{
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
    };
    try {
       await deleteContactListAPI(pid,reqHeader)
       getContactList()
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  }

  return (
    <>
    <div className='d-flex gap-2'>
      <input type="text"
      className='form-control'
      placeholder='Name'
      value={contactData.guestname} 
      onChange={e => setContactData({ ...contactData, guestname: e.target.value })}
      />
      <input type="number"
      className='form-control'
       placeholder='Number' 
       value={contactData.number} 
       onChange={e => setContactData({ ...contactData, number: e.target.value })} 
       />
      <Button onClick={createContact}>Add</Button>

    </div>
      <Container className='mt-5 '>
        
        {
        listData?.map((data)=>(
          <Row className='my-3 rounded py-2 bg-light'>
            <Col >
          <p>{data.guestname}</p>
            
            </Col>
            <Col >
          <p style={{fontSize:"14px"}}>{data.number}</p>
            
            </Col>
            <Col className='d-flex justify-content-center'>
            
          <div className='d-flex gap-3'>
            {/* <Button><i className='fa-solid fa-edit'></i></Button> */}
            <Button className='btn-white' onClick={()=>deleteContact(data._id)}><i className='fa-solid fa-trash text-danger'></i></Button>
          </div>
            </Col>
          </Row>
        ))
        }
      </Container>
      </>
  );
}

export default ContactGuest;
