const dotenv = require("dotenv");
const telegramBot = require("node-telegram-bot-api");
dotenv.config();

const API_TOKEN = process.env.API_TOKEN;
const options = {
  polling: true,
};

const myBot = new telegramBot(API_TOKEN, options);

myBot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  myBot.sendMessage(chatId, "Welcome to the bot");
});
