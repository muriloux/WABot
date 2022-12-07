import { Message } from "venom-bot";
import { ICommand } from "./ICommand";

export const dice: ICommand = {
  command: "!d",
  pattern: /^!d$/,
  description: "Rola um dado de 6 lados.",
  exec: (client) => {
    client.onAnyMessage((message: Message) => {
      if (message.body.match(dice.pattern)) {
        console.log(dice.command);

        const diceRoll = `🎲 ${Math.floor(Math.random() * 6) + 1}`;

        client
          .reply(message.chatId, diceRoll.toString(), message.id)
          .then((result) => {
            // console.log("Result: ", result);
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro);
          });
      }
    });
  },
};
