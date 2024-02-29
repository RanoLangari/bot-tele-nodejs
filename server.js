const dotenv = require("dotenv");
const axios = require("axios");
const telegramBot = require("node-telegram-bot-api");
dotenv.config();

const API_TOKEN = process.env.API_TOKEN;
const options = {
  polling: true,
};

const myBot = new telegramBot(API_TOKEN, options);
const prefix = "/";

const sayHi = new RegExp(`^${prefix}hallo$`);
const gempa = new RegExp(`^${prefix}gempa$`);

myBot.onText(sayHi, (msg) => {
  const chatId = msg.chat.id;
  myBot.sendMessage(chatId, "Hallo juga");
});

myBot.onText(gempa, async (msg) => {
  const Endpoints = process.env.GEMPA_ENDPOINT;
  const chatId = msg.chat.id;
  myBot.sendMessage(chatId, "Sedang mencari data gempa terkini");

  try {
    const response = await axios.get(Endpoints);
    const { Tanggal, Jam, Magnitude, Kedalaman, Wilayah, Lintang, Bujur } =
      response.data.Infogempa.gempa;
    myBot
      .sendMessage(
        chatId,
        `Tanggal : ${Tanggal}\nJam : ${Jam}\nMagnitude : ${Magnitude}\nKedalaman : ${Kedalaman}\nWilayah : ${Wilayah}`
      )
      .then(() =>
        myBot.sendLocation(chatId, parseFloat(Lintang), parseFloat(Bujur))
      );
  } catch (error) {
    myBot.sendMessage(chatId, "Maaf, terjadi kesalahan");
  }
});
