import React from "react";
import { useState, useEffect } from "react";
import { DateTimePicker } from "./MyComponents/DateTimepicker.js";
import { OpenAI } from 'openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';

import "./MyComponents/DateTimepicker.js";
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
  const [scheduledTime, setScheduledTime] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [promptOptions, setPromptOptions] = useState({
    'tone': '',
    'format': '',
    'length': '',
  });
  const [langResponse, setLangResponse] = useState('');


 

  window.onload = () => {
    sendMessage();

  };
  let timeUpdate = new Date().getTime();

  const toneOptionChange= (event) => {
    const newTone = event.target.value;
    setPromptOptions((prevOptions) => ({
      ...prevOptions,
      'tone': newTone,
    }))
  }
  const formatOptionChange= (event) => {
    const newFormat = event.target.value;
    setPromptOptions((prevOptions) => ({
      ...prevOptions,
      'format': newFormat,
    }))

  }
  const lengthOptionChange= (event) => {
    const newLength = event.target.value;
    setPromptOptions((prevOptions) => ({
      ...prevOptions,
      'length': newLength,
    }))

  }

  useEffect(() => {
    console.log(promptOptions);
  }, [promptOptions]);
  
  




  const manageRequests = (selectedDate) => {
    const utcDate = new Date(scheduledTime);

    // Calculate the user's local time by adding the time zone offset

    // Format the local time as a string in the user's time zone
    const localTimeString = utcDate.toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    // Output the result
    console.log(localTimeString);
    const newMessage = [message, localTimeString];
    setMessageList((prevList) => [...prevList, newMessage]);
  };

  const YOUR_TELEGRAM_BOT_TOKEN =
    "5841007714:AAG7ER8SV1-0Jt0gMrSX1nYPmsGZZogznUM";

  const handleScheduledTimeChange = (newScheduledTime) => {
    setScheduledTime(newScheduledTime);
  };

  const remainingTime = (scheduledTime) => {
    const currentTime = new Date().getTime();
    const difference = new Date(scheduledTime).getTime() - currentTime;
    return difference;
  };

  const scheduleAPICall = (scheduledTime) => {
    const timeDifference = remainingTime(scheduledTime);
    if (timeDifference > 0) {
      manageRequests();
    }

    if (timeDifference > 0) {
      setTimeout(sendMessage, timeDifference);
    } else {
      console.log("Scheduled time has already passed.");
    }
  };

  const sendMessage = async () => {
    try {
      const updateSite = await axios.get(
        `https://api.telegram.org/bot${YOUR_TELEGRAM_BOT_TOKEN}/getUpdates`
      );
      setGetUpdates(updateSite.data.result); // array with all the updates
      console.log(getUpdates);
      const enteredUsername = document.getElementById("userName").value;
      const enteredGroupname = document.getElementById("groupName").value;

      // Make sure getUpdates is an array
      if (Array.isArray(getUpdates)) {
        // Find the chat ID based on enteredUsername or enteredGroupname
        const chatId = getUpdates.find((update) => {
          return (
            update.message?.chat?.title === enteredGroupname ||
            update.message?.from?.username === enteredUsername
          );
        })?.message?.chat?.id;

        if (chatId) {
          // Send the message
          /*
          const currentDate = new Date();
          const currentTime = currentDate.getTime();

          const filteredList = messageList.filter(([message, timestamp]) => {
            console.log(new Date(timestamp).getTime(), currentTime);
            return new Date(timestamp).getTime() !== currentTime;
          })

          setMessageList(filteredList);
          */
          await axios.post(
            `https://api.telegram.org/bot${YOUR_TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
              chat_id: chatId,
              text: message,
            }
          );
          //Update messages list: map through requests = to current time can be taken off

          console.log("Message sent successfully!");
        } else {
          console.log("Chat ID not found.");
        }
      } else {
        console.log("Invalid getUpdates data.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="App">
      <div className="myBackground"></div>
      {messageList.map(([message, timestamp]) => {
        if (new Date(timestamp).getTime() == timeUpdate) {
          scheduleAPICall();
        }
      })}
      <div className="setter">
        <div className="blockElement inline">
          <label className="search-label">
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your teleuser"
            />
          </label>
          <label className="search-label">
            <input
              id="groupName"
              type="text"
              value={groupName}
              onChange={(e) => setGroupname(e.target.value)}
              placeholder="Enter your groupname"
            />
          </label>
        </div>
        <div className="blockElement">
          <DateTimePicker className='datepicker' onScheduledTimeChange={handleScheduledTimeChange} />
        </div>
        <div className="messageSetting">
          <label className="search-label">
            <input
              id="message"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
            />
          </label>
          <button
            className="submitButton"
            onClick={() => scheduleAPICall(scheduledTime)}
          ></button>
        </div>
      </div>

      <div className="background">
        {messageList.map(([message, timestamp], index) => (
          <div className="listView" key={index}>
            <div className="message">{message}</div>
            <div className="timestamp">{timestamp}</div>
          </div>
        ))}
      </div>

      <div className="instructionManual">
        <h1 className="heading">
          Welcome to Tele Assist{" "}
          <img
            className="headerImage"
            src={process.env.PUBLIC_URL + "/telegramlogo.png"}
          ></img>
        </h1>
        <p className="normalText">
          TeleAssist&copy; is the Monday.com app for scheduling messages on
          Telegram. It's a powerful tool that allows users to automate the
          process of sending messages at specific times.{" "}
        </p>
        <ol className="normalText">
          User's guide:
          <li>Search up 'theTeleAssistantBot' on Telegram</li>
          <li>Add the bot to your desired group</li>
          <li>Enter your username and telegram group name</li>
          <li>Send messages right away!</li>
        </ol>
      </div>
      <div className="promptFormatting">
        <div className="promptOption">
          <p className="normalText">What tone would you like?</p>
          <div className="radioRow">
            <label>
              <input id='testing' onChange={toneOptionChange} className='radioButtons' name="options" type="radio" value="Academic" />
              <p className='optionsText'>Academic</p>
            </label>
            <label>
              <input onChange={toneOptionChange}  className='radioButtons' name="options" type="radio" value="Casual" />
              <p className='optionsText'>Casual</p>

            </label>
            <label>
              <input onChange={toneOptionChange}  className='radioButtons' name="options" type="radio" value="Formal" />
              <p className='optionsText'>Formal</p>
            </label>
          </div>
        </div>
        <div className="promptOption2">
          <p className="normalText">What format would you like?</p>
          <div className="radioRow">
            <label>
              <input onChange={formatOptionChange} className='radioButtons' name="options2" type="radio" value="List" />
              <p className='optionsText'>List</p>
            </label>
            <label>
              <input onChange={formatOptionChange} className='radioButtons' name="options2" type="radio" value="Tele Blast" />
              <p className='optionsText'>Tele Blast</p>

            </label>
            <label>
              <input onChange={formatOptionChange} className='radioButtons' name="options2" type="radio" value="Message" />
              <p className='optionsText'>Message</p>
            </label>
          </div>
        </div>
        <div className="promptOption3">
          <p className="normalText">How long would you like your message?</p>
          <div className="radioRow">
            <label>
              <input onChange={lengthOptionChange} className='radioButtons' name="options3" type="radio" value="Concise" />
              <p className='optionsText'>Concise</p>
            </label>
            <label>
              <input onChange={lengthOptionChange}  className='radioButtons' name="options3" type="radio" value="Medium" />
              <p className='optionsText'>Medium</p>

            </label>
            <label>
              <input onChange={lengthOptionChange}  className='radioButtons' name="options3" type="radio" value="Essay" />
              <p className='optionsText'>Essay</p>
            </label>
          </div>
        </div>
    

      </div>

      <div className='promptGeneration'>
        <p className='normalText'>GPT-3.5 LLM Generation</p>
        <textarea placeholder='generated text comes here' className='generatedText'>

        </textarea>
      </div>

    </div>
  );
};

export default App;
