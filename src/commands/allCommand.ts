import { Message } from "venom-bot";
import { ICommand } from "../interfaces/ICommand";

export const all: ICommand = {
  command: "!all",
  pattern: new RegExp("^!all$"),
  description: "(ADM) Marca todos do grupo.",
  exec: (client) => {
    client.onAnyMessage(async (message: Message) => {
      if (
        message.isGroupMsg &&
        message.fromMe &&
        message.body.match(all.pattern)
      ) {
        console.log(`[!all]`);

        const members = await client.getGroupMembersIds(message.chatId);
        var ids: string[] = [];

        members.forEach((member: any) => {
          ids.push(member["id"]["user"]);
        });

        client
          .sendMentioned(
            message.chatId,
            ids.map((id) => `@${id}`).join(" "),
            ids
          )
          .then((result) => {
            //console.log(result)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  },
};
