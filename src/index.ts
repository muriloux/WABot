// Supports ES6
import { create, Whatsapp } from "venom-bot";
import { all } from "./src/commands/all";
import { dice } from "./src/commands/dice";
import { sticker } from "./src/commands/sticker";
import { logMessages } from "./src/services/logMessages";

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
