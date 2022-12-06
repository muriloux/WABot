import { Message } from "venom-bot";
import { ICommand } from "./ICommand";

export const dice: ICommand = {
  command: "!d",
  pattern: /^!d$/,
  description:
    "Consectetur eiusmod mollit occaecat occaecat aute pariatur ullamco sint est ullamco minim est aliqua. Excepteur ex sunt excepteur officia voluptate aute dolore aliquip esse magna dolore esse ipsum. Dolore mollit reprehenderit eiusmod anim mollit voluptate. Est ex laboris ex laborum. Quis aliquip minim velit sunt nostrud culpa excepteur enim amet. Et veniam ea mollit eiusmod culpa id qui dolore exercitation minim incididunt proident.",
  exec: (client) => {
    client.onAnyMessage((message: Message) => {
      if (message.body.match(dice.pattern)) {
        console.log(dice.command);

        const diceRoll = Math.floor(Math.random() * 6) + 1;

        client
          .reply(message.chatId, diceRoll.toString(), message.author)
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
