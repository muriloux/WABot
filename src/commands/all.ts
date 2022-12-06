import { Message } from "venom-bot";
import { ICommand } from "./ICommand";

export const all: ICommand = {
  command: "!all",
  pattern: /^!all$/,
  description:
    "Dolore ea laboris ex aliquip culpa occaecat excepteur commodo laboris ipsum. Excepteur ut adipisicing consequat ea nulla labore id reprehenderit ea sit cupidatat excepteur exercitation. Esse reprehenderit incididunt est aliqua sint cupidatat velit consequat esse ex.",
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
