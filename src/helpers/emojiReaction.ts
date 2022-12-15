import { Message, Whatsapp } from "venom-bot";

export const emojiReaction = (client: Whatsapp, message: Message) => {
  client
    .reply(message.chatId, "👍", message.id)
    .then((result) => {
      console.log("Result: ", result); //return object success
    })
    .catch((erro) => {
      console.error("Error sending emoji reply: ", erro); //return object error
    });
};
