const { Telegraf } = require("telegraf");
const express = require("express");

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Устанавливаем Webhook
app.use(express.json());
app.post("/webhook", (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});

// Обработчик команды /start
bot.start((ctx) => {
  ctx.reply("Добро пожаловать в ArtAst! Выберите действие:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "👥 Люди", web_app: { url: process.env.WEB_APP_URL } }],
        [{ text: "🏛 Пространства", web_app: { url: process.env.WEB_APP_URL } }],
        [{ text: "📅 События", web_app: { url: process.env.WEB_APP_URL } }],
        [{ text: "✍️ Подать заявку", web_app: { url: process.env.WEB_APP_URL } }]
      ],
    },
  });
});

// Запускаем сервер
app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});

module.exports = app;
