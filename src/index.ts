// Supports ES6
import { create, Whatsapp } from "venom-bot";
import { all } from "./commands/all";
import { dice } from "./commands/dice";
import { sticker } from "./commands/sticker";
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
  dice.exec(client);
  all.exec(client);
  sticker.exec(client);
}
