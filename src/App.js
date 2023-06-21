import React from "react";
import { useState, useEffect } from "react";
import {DateTimePicker} from './MyComponents/DateTimepicker.js'

import axios from "axios";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { time } from "console";
//Explore more Monday React Components here: https://style.monday.com/

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
  const [message, setMessage] = useState("");
  const [userName, setUsername] = useState("");
  const [groupName, setGroupname] = useState("");
  const [getUpdates, setGetUpdates] = useState([]);
  const [chatID, setChatID] = useState('');
  const [scheduledTime, setScheduledTime] = useState(null);



  const YOUR_TELEGRAM_BOT_TOKEN='5841007714:AAG7ER8SV1-0Jt0gMrSX1nYPmsGZZogznUM';
  
  const handleScheduledTimeChange = (newScheduledTime) => {
    setScheduledTime(newScheduledTime);
  };

  const remainingTime = (scheduledTime) => {
    const currentTime = new Date().getTime();
    const difference = scheduledTime - currentTime;
    return difference;
  }

  const scheduleAPICall = (scheduledTime) => {
    const timeDifference = remainingTime(scheduledTime);

    if (timeDifference > 0) {
      setTimeout(sendMessage, timeDifference);
    } else {
      console.log('Scheduled time has already passed.');
    }
  }


 const sendMessage = async () => {
    try {
      const updateSite = await axios.get(`https://api.telegram.org/bot${YOUR_TELEGRAM_BOT_TOKEN}/getUpdates`);
      setGetUpdates(updateSite.data.result); //array with all the updates
      const enteredUsername = document.getElementById('userName').value;
      const enteredGroupname =document.getElementById('groupName').value;
      //make filter algo here
      getUpdates.map((update) => {
        if( (update.message?.chat?.title===enteredGroupname) || (update.message?.from?.username===enteredUsername)) {
          setChatID(update.message.chat.id);
        }
      })
  


      await axios.post(
        `https://api.telegram.org/bot${YOUR_TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: chatID,
          text: message,
        }
      );
      console.log(getUpdates);
      console.log("Message sent successfully!");
      console.log()
    } catch (error) {
      console.log(chatID);
      console.error("Error sending message:", error);
    }
  };




  return (
    <div className="App">
      

      <div>
        <h2 className='blockElement'>Note the case sensitivity!</h2>
        <div  className='blockElement'>
          <input 
            id='userName'
            type='text'
            value={userName}
            onChange= {(e) => setUsername(e.target.value)}
            placeholder='Enter your teleuser'
          />
          <input 
            id ='groupName'
          type='text'
          value={groupName}
          onChange= {(e) => setGroupname(e.target.value)}
          placeholder='Enter your groupname'
          />
      
        </div>
        <div className='blockElement'>
          <DateTimePicker onScheduledTimeChange={handleScheduledTimeChange}/>
          
        </div>
      
 
      <input
        id='message'
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={()=>scheduleAPICall(scheduledTime)}>Send Message</button>
    </div>

      
    </div>
  );
};

export default App;
