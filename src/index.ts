// Supports ES6
import { create, Whatsapp } from "venom-bot";
import { Commands } from "./commands";
import { logMessages } from "./helpers/logMessages";
import "dotenv";

create({
  session: process.env.SESSION_NAME, //name of session
  multidevice: false, // for version not multidevice use false.(default: true)
})
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });

function start(client: Whatsapp) {
  logMessages(client, true);
  Commands.all.exec(client);
  Commands.dice.exec(client);
  Commands.sticker.exec(client);
  Commands.help.exec(client);
}
