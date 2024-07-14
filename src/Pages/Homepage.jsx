import React from 'react'
import './Homepage.css'
import {Button, Col, Container, Image, Row} from 'react-bootstrap'

import relationships from '../Assets/relationships.jpg'
import time from '../Assets/time.jpg'
import day from '../Assets/day.jpg'
import money from '../Assets/money.jpg'

import gall1 from '../Assets/gall1.jpg'
import gall2 from '../Assets/gall2.jpg'
import gall3 from '../Assets/backbanner.jpg'
import gall4 from '../Assets/about.jpg'

import banner1 from '../Assets/banner1.png'
import banner2 from '../Assets/banner2.png'
import backbanner from '../Assets/backbanner.jpg'
import rev1 from '../Assets/rev1.jpg'
import rev2 from '../Assets/rev2.jpg'

import { Link } from 'react-router-dom'

function Homepage() {

  return (
    <>
    {/* <div style={{background:`url(${backbanner})`,backgroundSize:"cover",backgroundRepeat:"no-repeat",width:"100%",height:'auto'}}> */}
    <div className=''>

      <Image src={backbanner} className='background-banner'/>
      <div className='d-flex flex-row justify-content-center align-items-center  banner-content'>
      <Image src={banner1} className=' banner-image'/>
<div style={{width:'100%'}} className='text-center'>
      <p  className='h1  fw-bold text-white'>Bringing Dreams to Life  with <br /> Bliss Events</p>
      <p style={{fontSize:"15px",color:"white"}}>Your wedding should reflect your unique love story. Our personalized approach ensures that every aspect of your event is a reflection of your style and personality.</p>
      <Link to={'/dashboard/weddform'} >

      <Button className='bg-success'>Book Event</Button>
      </Link>
</div>
      <Image src={banner2} className=' banner-image'/>
      </div>
   
    </div>
    <Container className='my-5' >

      
      <Row className='p-2 '>
        <Col className='d-flex flex-column' lg={5}>
        <p className='text-secondary h3 text-uppercase'>Hire Us And</p>
        <p className='hireus'>SAVE YOUR SANITY</p>
        </Col>
        <Col className='hire_content ' lg={7}>
        <p className='p-3'>The average wedding takes about 250 hours to plan. Maybe you already have a full time job and don't want to take on this "part-time position" of planning your wedding. Maybe you have started planning and want your life back. Either way, Piper & Muse is here for you.</p>
        </Col>
      </Row>

      <Row  className="">
        <Col lg={3} className='p-4 shadow'>
        <Image src={time} className='img-fluid'/>
        <p>SAVES YOU TIME</p>
        <p>We are confident in our knowledge of the local industry and our relationships with the top vendors and venues in Houston.  There’s no need to waste your time at bridal shows or countless vendor visits.  With our preferred vendor list, you can count on exceptional quality and service.    </p>
        </Col>
        <Col lg={3} className='p-4 shadow'>
        <Image src={money} className='img-fluid'/>
        <p>SAVES YOU MONEY</p>
        <p>Some vendors we work with give us a discount that we love passing onto our clients.  But more importantly, it’s our connections and knowledge of this industry that is going to get you the most for the money you have to spend.  We understand how to manage a budget and will keep you on track throughout the planning process.</p>
        </Col>
        <Col lg={3} className='p-4 shadow'>
        <Image src={relationships} className='img-fluid'/>
        <p>SAVES YOUR RELATIONSHIPS</p>
        <p>Weddings can be stressful but we offer advice and tips to avoid common problems.  Hiring us takes the stress off your family and friends on the big day, freeing them from the tedious, busy work that happens behind the scenes.  When we are involved, everyone is on the dance floor kicking back their heels!</p>
        </Col>
        <Col lg={3} className='p-4 shadow'>
        <Image src={day} className='img-fluid'/>
        <p>SAVES YOUR DAY</p>
        <p>As with any big event, there are so many unforeseen circumstances that can arise.  With our meticulous itineraries, our bridal emergency kit, and our expert crisis management skills, we are prepared to gracefully handle anything.  We will give your event that elegant, but effortless, effect. </p>
        </Col>
      
      </Row>
    </Container>
<Container fluid>
<h2 className='text-center fw-bold mt-5'>Our Blissfull moments</h2>
      <Row className='my-4'>
        <Col lg={5}>
        <Image src={gall1} className='img-fluid rounded-5 my-2' style={{height:"360px",width:"100%"}}/>
        </Col>
        <Col lg={7}>
        <Image src={gall2} className='img-fluid rounded-5 my-2' style={{height:"360px",width:"100%"}} />
        </Col>
      </Row>

      <Row>
        <Col lg={7}>
        <Image src={gall3} className='img-fluid rounded-5 my-2' style={{height:"360px",width:"100%"}} />
        </Col>
        <Col lg={5}>
        <Image src={gall4} className='img-fluid rounded-5 my-2' style={{height:"360px",width:"100%"}} />
        </Col>
      </Row>
      <div className='text-center mt-5'>

      <Link to={'/gallery'} >
        
      <Button>Show Gallery</Button>
      </Link>
      </div>
</Container>

<Container className='my-5'>
<Row className='m-0'>
<Col  lg={5}>
<Image src={rev1} className='img-fluid rounded-5' width={"400px"} />
</Col>
<Col  className='d-flex  align-items-center justify-content-center' lg={7}>
<div>

<h2>James & Alice</h2>
<p>"James and Alice here! We're over the moon with the exceptional service provided by Bliss event management team. From the first consultation to the final dance, every detail was flawlessly executed, making our wedding day truly magical. Thank you for exceeding our expectations and creating unforgettable memories for us!"</p>
</div>
</Col>
</Row>
<Row className='m-0'>
<Col  className='d-flex  align-items-center justify-content-center' lg={7}>
<div>

<h2>John & Sara</h2>
<p>"As John and Sara, we want to express our gratitude for the outstanding service provided by Bliss event management team. From the initial planning stages to the last dance, every moment was orchestrated with precision and care. Your attention to detail and commitment to making our vision a reality made our wedding day truly unforgettable. Thank you for going above and beyond to ensure our special day was perfect in every way!"</p>
</div>
</Col>
<Col  lg={5}>
<Image src={rev2} className='img-fluid rounded-5' width={"400px"} />
</Col>
</Row>
</Container>



    </>
  )
}

export default Homepage