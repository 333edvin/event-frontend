import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../../Contexts/auth';
import { sendUserFeedbackAPI } from '../../services/allApis';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {toast} from 'react-toastify'
function Feedback() {
  const [auth, setAuth] = useAuth();
  const [feedbackSent, setFeedbackSent] = useState(false);

  const [userFeedback, setUserFeedback] = useState({
    username: "",
    email: "",
    feedback: ""
  });

  const sendFeedback = async () => {
    const { username, email, feedback } = userFeedback;

    if (!username || !email || !feedback) {
      toast.error("Please enter details");
    } else {
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);
      reqBody.append("feedback", feedback);
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${auth?.token}`
      };

      try {
        const result = await sendUserFeedbackAPI(reqBody, reqHeader);
        if (result.status === 200) {
          setFeedbackSent(true);
        } else {
          console.log(result.response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {feedbackSent ? (
        <div className='text-center'>
          <p style={{fontSize:"50px",fontWeight:"bold"}}>Feedback sent successfully! <CheckCircleIcon className='text-success' style={{fontSize:"60px"}}/></p>
        </div>
      ) : (
        <div>
            <div className='d-flex gap-2 mb-2'>

          <TextField
            id="outlined-multiline-flexible"
            className='w-100'
            value={userFeedback.username}
            onChange={e => setUserFeedback({ ...userFeedback, username: e.target.value })}
            multiline
            maxRows={4}
            placeholder='Name'
          />
          <TextField
            id="outlined-multiline-flexible"
            className='w-100'
            value={userFeedback.email}
            onChange={e => setUserFeedback({ ...userFeedback, email: e.target.value })}
            multiline
            maxRows={4}
            placeholder='Email'
          />
            </div>
          <div>

          <TextField
            id="outlined-multiline-static"
            value={userFeedback.feedback}
            onChange={e => setUserFeedback({ ...userFeedback, feedback: e.target.value })}
            multiline
            rows={4}
            className='w-100'
            placeholder='Feedback'
            />
            </div>
            <div className='d-flex justify-content-end'>

          <Button onClick={sendFeedback} className='mt-2 ' variant='contained'>Send</Button>
            </div>
        </div>
      )}
    </div>
  );
}

export default Feedback;
