import { Message, Whatsapp } from "venom-bot";
import { ICommand } from "./ICommand";
import { convertMP4toGIF } from "../services/convertMP4toGIF";
import fs from "fs";
import mime from "mime-types";

export const sticker: ICommand = {
  command: "!s",
  pattern: /^!s$/,
  description:
    "Esse labore veniam elit pariatur fugiat veniam proident sint officia aliquip. Cupidatat ut ea cillum mollit esse. Adipisicing dolore quis sit aliquip dolore officia. Sit id cillum culpa irure sint. Reprehenderit ipsum laboris excepteur velit incididunt et exercitation. Minim aute sint velit magna aliqua irure ipsum.",
  exec: (client: Whatsapp) => {
    client.onAnyMessage(async (message: Message) => {
      if (
        message.isMedia === true &&
        message.caption &&
        message.caption.match(sticker.pattern)
      ) {
        const buffer = await client.decryptFile(message);
        const buffer64 = buffer.toString("base64");
        const fileName = `temp/temp.${mime.extension(message.mimetype)}`;

        message.type != "video"
          ? client
              .sendImageAsSticker(message.chatId, buffer64)
              .then((result) => {
                console.log("Result: ", result);
              })
              .catch((err) => {
                console.error("Error sending ImageAsSticker: ", err);
              })
          : console.log("writting temp file");
        fs.writeFile(fileName, buffer, (err) => {
          convertMP4toGIF(fileName, () => {
            client
              .sendImageAsStickerGif(message.chatId, "temp/temp.gif")
              .then((result) => {
                fs.unlink("temp/temp.gif", (err) => {
                  err
                    ? console.log("error unlinking temp.gif: " + err)
                    : console.log("temp/temp.gif unlinked.");
                });

                console.log("Result: ", result);
              })
              .catch((err) => {
                console.error("Error sending ImageAsStickerGif: ", err);
              });
          });
        });
      }
    });
  },
};
