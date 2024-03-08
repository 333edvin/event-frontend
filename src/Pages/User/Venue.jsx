import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, Col, Image, Row } from 'react-bootstrap';
import ItemContext from '../../Contexts/ItemContext';
import { Rating, Snackbar } from '@mui/material';
function Venue() {
  const base_url = "https://venue-finalprojectdb.onrender.com/venues";
  const { selectedItem, setSelectedItem } = useContext(ItemContext);
  const [allRestData,setAllRestData] = useState([]);

  // API fetching using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(base_url);
        setAllRestData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSelectItem = (name) => {
    setSelectedItem(name);
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Row className='mx-3'>
        {allRestData.map(item => (
          <Col key={item.id}>
            <div onClick={handleClick}>

            <Card
              style={{
                width: "300px",
                height: "290px",
                boxShadow: selectedItem === item.title ? "0 0 10px 0 rgba(0, 0, 255, 0.5)" : "none"
              }}
              className='m-2 rounded-5'
              onClick={() => handleSelectItem(item.title)}
            >
              <Image src={item.photo} style={{ width: "300px", height: "150px", objectFit: "cover" }} className='rounded-5' />
              <Card.Body>
                <p>{item.title}</p>
                <Rating name="half-rating-read" defaultValue={2.5} precision={item.rating} readOnly />
              </Card.Body>
            </Card>
            </div>
          </Col>
        ))}
      </Row>
      <Snackbar
  open={open}
  autoHideDuration={3000}
  onClose={handleClose}
  message="venue selected"
/>
    </div>
  );
}

export default Venue;
