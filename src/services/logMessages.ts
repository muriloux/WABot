import { Message, Whatsapp } from "venom-bot";

export const logMessages = (client: Whatsapp, detailedLog?: boolean): void => {
  client.onMessage((message: Message) => {
    detailedLog
      ? console.log(message)
      : console.log(`[${message.chat.name}] ${message.body}`);
  });
};
