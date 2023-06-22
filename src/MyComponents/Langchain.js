import React, { useState } from 'react';

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

// Require and configure dotenv
import dotenv from 'dotenv';
dotenv.config();


// Access the API key from the .env file
const apiKey = process.env.OPENAI_API_KEY;


async function GPTResponse(prompt, features) {
    const chat = new ChatOpenAI({ openAIApiKey: apiKey, temperature: 0 });
    
    const { tone, format, length } = features;
    
    let input = "Write a text in the format of a " + format + ", has a " + tone + " tone, and is " + length + " paragraphs long. The prompt is as follows: \n\n" + prompt;
    
    const response = await chat.call([
      new HumanChatMessage(input),
    ]);
    
    // console.log(response.text);
  
    return response.text;
  }

export default GPTResponse;