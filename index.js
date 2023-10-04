require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TG_TOKEN_BOT, {polling: true});

// Только чтобы узнать айди чата, можно убрать потом
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, chatId);
});

const app = express()

const port = 3000

app.use(bodyParser.urlencoded({extended: true}));

app.post('/to_tg', (req, res) => {
  const {fio, tel} = req.body;
  bot.sendMessage(process.env.TG_CHAT_ID, fio + "\n" + tel);
  res.status(200).send();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})