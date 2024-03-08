// WeddInfo.js
import React, { useContext, useState, useEffect } from 'react';
import { Checkbox, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Col, Row } from 'react-bootstrap';
import ItemContext from '../../Contexts/ItemContext';
import { addWedEventAPI } from './../../services/allApis';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
function WeddInfo() {
  const { selectedItem, formData, setFormData } = useContext(ItemContext);
  const [venue, setVenue] = useState(selectedItem || '');
  const [termsChecked, setTermsChecked] = useState(false);
  const [token,setToken] = useState("")
  const navigate = useNavigate()

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))//setting
    }
  },[])
  useEffect(() => {
    setFormData(prevFormData => ({ ...prevFormData, venue }));
  }, [venue, setFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    setTermsChecked(event.target.checked);
    setFormData(prevFormData => ({ ...prevFormData, termsAndConditions: event.target.checked ? 'yes' : 'no' }));
  };


  //add event===============================================
  const event = async () => {
    const { brideName, groomName, email, phoneNumber, weddingDate, venue, guestNumber, weddingStyle, servicesRequired, additionalPreferences } = formData;
    const termsAgreed = termsChecked ? 'yes' : 'no';

  
    if (!brideName || !groomName || !email || !phoneNumber || !weddingDate || !venue || !guestNumber || !weddingStyle || !servicesRequired || !additionalPreferences || typeof termsAgreed !== 'string') 
      {
      toast.error("Please provide all fields");
    } else {
      const reqBody = new FormData();
      reqBody.append("brideName", brideName);
      reqBody.append("groomName", groomName);
      reqBody.append("email", email);
      reqBody.append("phone", phoneNumber); // Changed to phoneNumber
      reqBody.append("weddingDate", weddingDate);
      reqBody.append("weddingVenue", venue); // Changed to venue
      reqBody.append("numberOfGuests", guestNumber); // Changed to guestNumber
      reqBody.append("weddingStyle", weddingStyle);
      reqBody.append("servicesRequired", servicesRequired);
      reqBody.append("additionalPreferences", additionalPreferences);
      reqBody.append("termsAgreed", termsAgreed);
  
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      };
  
      try {
        const result = await addWedEventAPI(reqBody,reqHeader); // Await the result
        console.log(result);
        toast.success('Event added successfully');
        setFormData({
          brideName: '',
          groomName: '',
          email: '',
          phoneNumber: '',
          weddingDate: '',
          venue: '',
          guestNumber: '',
          weddingStyle: '',
          servicesRequired: '',
          additionalPreferences: '',
          termsAndConditions: '',
        });
        navigate('/dashboard')
      } catch (error) {
        console.error(error);
        toast.error('Failed to add event');
      }
    }
  };
  
  return (
    <div>
      <Row className=''>
        <Col lg={7}>
          <div className='d-flex flex-column gap-3'>
            <TextField
              id="brideName"
              name="brideName"
              label="Bride name"
              type="text"
              value={formData.brideName || ''}
              onChange={handleInputChange}
            />
            <TextField
              id="groomName"
              name="groomName"
              label="Groom name"
              type="text"
              value={formData.groomName || ''}
              onChange={handleInputChange}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formData.email || ''}
              onChange={handleInputChange}
            />
            <TextField
              id="phoneNumber"
              name="phoneNumber"
              label="Ph.no"
              type="tel"
              value={formData.phoneNumber || ''}
              onChange={handleInputChange}
            />
            <TextField
              required
              id="weddingDate"
              name="weddingDate"
              label="Wedding Date"
              type="date"
              value={formData.weddingDate || ''}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="guestNumber"
              name="guestNumber"
              label="Guest No."
              type="number"
              value={formData.guestNumber || ''}
              onChange={handleInputChange}
            />
            <TextField
              id="weddingStyle"
              name="weddingStyle"
              label="Wedding Style"
              type="text"
              value={formData.weddingStyle || ''}
              onChange={handleInputChange}
            />
            <TextField
              id="servicesRequired"
              name="servicesRequired"
              label="Services Required"
              type="text"
              value={formData.servicesRequired || ''}
              onChange={handleInputChange}
            />
            <TextField
              id="additionalPreferences"
              name="additionalPreferences"
              label="additionalPreferences"
              type="text"
              value={formData.additionalPreferences || ''}
              onChange={handleInputChange}
            />
            
            <TextField
              id="venue"
              name="venue"
              label="Venue"
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox checked={termsChecked} onChange={handleCheckboxChange} />}
              label="Terms and condition"
            />
          </div>
          <Button type="button" onClick={event}>add</Button>

        </Col>
        <Col lg={5}></Col>
      </Row>
    </div>
  );
}

export default WeddInfo;
