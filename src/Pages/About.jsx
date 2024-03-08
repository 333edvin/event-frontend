import React from 'react'
import about from '../Assets/about.jpg'
import { Card, Col, Container, Row } from 'react-bootstrap'
function About() {
  return (
    
    <div style={{backgroundImage:`url(${about})`,backgroundSize:"cover"}} className='px-4 py-5 text-white'>
      <Container>
<div  style={{ textShadow:" 2px 2px 5px rgba(0, 0, 0, 0.5)"}}>

<p style={{fontSize:"55px",fontWeight:"bold"}}>About Our Wedding Event Management Service.</p>
<p>Welcome to Bliss Events! We are dedicated to creating unforgettable and seamless wedding experiences for couples and their guests. With our expertise and attention to detail, we'll help you bring your dream wedding to life.</p>


<Row className='my-5'>
<Col lg={4}>
<p style={{fontSize:"40px",fontWeight:"bold"}}>Our Mission</p>

<p>At Bliss Events, our mission is to turn your vision into reality. We understand that planning a wedding can be overwhelming, and our goal is to make the process as stress-free and enjoyable as possible. From conceptualization to execution, we'll be there every step of the way to ensure your special day exceeds your expectations.</p>
</Col>

<Col lg={8}>
<p style={{fontSize:"40px",fontWeight:"bold",textAlign:"center"}}>What Sets Us Apart</p>
<Row className='text-dark' style={{fontSize:"13px"}}>
<Col >
<Card style={{width:"220px",height:"230px"}}>
  <Card.Body>

Personalized Service: We believe that every wedding is unique, and we tailor our services to reflect your individual style, preferences, and budget
  </Card.Body>
</Card>
</Col>
<Col>

<Card style={{width:"220px",height:"230px"}}>
<Card.Body>
  Attention to Detail: We sweat the small stuff so you don't have to. From venue selection and décor to vendor coordination and timeline management, we handle every aspect of your wedding with precision and care.
  </Card.Body>
  </Card>

</Col>
<Col>

<Card style={{width:"220px",height:"230px"}}>
<Card.Body>
Experienced Team: Our team of experienced planners, designers, and coordinators are passionate about creating magical moments and ensuring a flawless wedding day experience for you and your guests.
</Card.Body>
</Card>
</Col>

</Row>

</Col>
</Row>
<Row>

<Col className='my-5'>

<p style={{fontSize:"40px",fontWeight:"bold"}} >Our Team
</p>
<p>Meet the talented individuals behind Bliss Events. Our team brings a wealth of experience, creativity, and passion to every wedding we plan. Together, we'll ensure your wedding is a reflection of your love story and a day you'll cherish forever.</p>

</Col>
<Col className='my-5'>

<p style={{fontSize:"40px",fontWeight:"bold"}}>Get in Touch</p>
<p>Ready to start planning your dream wedding? Contact us today to schedule a consultation. We can't wait to hear from you and learn more about your vision for your special day.</p>
</Col>
</Row>
</div>
      </Container>
    </div>
  )
}

export default About