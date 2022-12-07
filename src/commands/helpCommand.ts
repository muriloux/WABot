import { Message } from "venom-bot";
import { Commands } from ".";
import { emojiReaction } from "../services/emojiReaction";
import { ICommand } from "./ICommand";

export const help: ICommand = {
  command: "!h",
  pattern: /^!h$/,
  description: "Exibe os comandos disponíveis.",
  exec: (client) => {
    client.onAnyMessage((message: Message) => {
      if (message.body.match(help.pattern)) {
        client.startTyping(message.chatId).then(() => {
          console.log(help.command);

          var commandsArray: string[] = [];
          var helpMessage: string;

          for (const key in Commands) {
            commandsArray.push(
              `*${Commands[key]["command"]}* → ${Commands[key]["description"]}`
            );
          }

          helpMessage = commandsArray.join("\n");

          client
            .reply(message.chatId, helpMessage, message.id)
            .then((result) => {
              // console.log("Result: ", result);
            })
            .catch((erro) => {
              console.error("Error when sending: ", erro);
            });

          client.stopTyping(message.chatId);
        });
      }
    });
  },
};
