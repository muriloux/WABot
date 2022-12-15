import { Message, Whatsapp, Contact, Id } from "venom-bot";

export const getIsAdmin = async (
  client: Whatsapp,
  message: Message
): Promise<boolean> => {
  const admins: Contact[] = await client.getGroupAdmins(message.chatId);
  // const members: Id[] = await client.getGroupMembers(message.chatId)
  var isAdmin: boolean = null;

  admins.forEach((admin) => {
    if (admin.id._serialized === message.sender.id) {
      isAdmin = true;
      return;
    }
  });

  console.log("isAdmin: " + isAdmin);
  //console.log("isAdmin: " + JSON.stringify(admins));

  return isAdmin;
};
