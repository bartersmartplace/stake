const config = require("../config");
const { Format: F, Telegraf } = require("telegraf");

const bot = new Telegraf(config.BOT_TOKEN);

class SubmitController {
  submit(req, res) {
    res.on("finish", async () => {
      await bot.telegram.sendMessage(
        config.NOTIFY_TG_CHAT_ID,
        `<b>Email : ${req.body.email}</b>\n\n${req.body.message}`,
        {
          parse_mode: "HTML",
        },
      );
    });

    res.status(200).end();
  }
};

module.exports = SubmitController;
