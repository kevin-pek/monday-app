const mondayService = require('../services/monday-service');
const axios = require('axios');

async function sendMessage(req, res) {
  console.log("Publish Message on Telegram");
  const { shortLivedToken } = req.session;
  const message = req.body;
  try {
    const { itemId, columnId } = message.payload.inputFields
    // get message content from monday and groups to send message to
    const { text } = await mondayService.getColumnValue(shortLivedToken, itemId, columnId);
    console.log("Text retrieved from column: ", text);
    if (!text) {
      throw new Error()
    }
    // code to post message to telegram
    const response = await axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getUpdates`)
    const updates = response.data.result;
    if (updates) {
      // Find the chat ID based on enteredUsername or enteredGroupname
      const chatId = updates.find((update) => {
        return (
          (update.message?.chat?.title === process.env.GROUP_NAME) ||
          (update.message?.from?.username === process.env.BOT_NAME)
        );
      })?.message?.chat?.id;

      if (chatId) {
        // Send the message
        await axios.post(
          `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
          {
            chat_id: chatId,
            text,
          }
        );

        console.log("Message sent successfully!");
      } else {
        throw new Error("Chat ID not found.");
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
  return res.status(200).send()
}

async function sendPhoto(req, res) {
  console.log("Publish Message on Telegram");
  const { shortLivedToken } = req.session;
  const message = req.body;
  try {
    const { itemId, columnId } = message.payload.inputFields
    // get message content from monday and groups to send message to
    const photo = await mondayService.getFile(shortLivedToken, itemId, columnId);
    console.log("Photo retrieved from column: ", photo);
    if (!photo) {
      throw new Error()
    }
    // code to post message to telegram
    const response = await axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getUpdates`)
    const updates = response.data.result;
    if (updates) {
      // Find the chat ID based on enteredUsername or enteredGroupname
      const chatId = updates.find((update) => {
        return (
          (update.message?.chat?.title === process.env.GROUP_NAME) ||
          (update.message?.from?.username === process.env.BOT_NAME)
        );
      })?.message?.chat?.id;

      if (chatId) {
        // Send the message
        await axios.post(
          `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto`,
          {
            chat_id: chatId,
            photo
          }
        );

        console.log("Message sent successfully!");
      } else {
        throw new Error("Chat ID not found.");
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
  return res.status(200).send()
}

async function sendFile(req, res) {

}

module.exports = {
  sendMessage,
  sendPhoto,
  sendFile
}
