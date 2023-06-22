import React, { useState } from 'react';

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { OPENAI_API_KEY } from './env.js';

// Access the API key from the .env file
const apiKey =OPENAI_API_KEY;


export async function GPTResponse(prompt, features) {
    const chat = new ChatOpenAI({ openAIApiKey: apiKey, temperature: 0 });
    
    const { tone, format, length } = features;
    
    let input = "Write a text in the format of a " + format + ", has a " + tone + " tone, and is " + length + " length. The prompt is as follows: \n\n" + prompt;
    
    const response = await chat.call([
      new HumanChatMessage(input),
    ]);
    
    // console.log(response.text);
  
    return response.text;
  }

