// Supports ES6
import { create, Whatsapp } from "venom-bot";
import { Commands } from "./commands";
import { logMessages } from "./services/logMessages";

create({
  session: "session-name", //name of session
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
