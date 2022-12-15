import { Message, Whatsapp } from "venom-bot";
import { ICommand } from "../interfaces/ICommand";
import { convertMP4toGIF } from "../helpers/convertMP4toGIF";
import { emojiReaction } from "../helpers/emojiReaction";
import fs from "fs";
import mime from "mime-types";

export const sticker: ICommand = {
  command: "!s",
  pattern: new RegExp("^!s$"),
  description: "Se mandado como legenda de uma imagem ou gif, faz um sticker.",
  exec: (client: Whatsapp) => {
    client.onAnyMessage(async (message: Message) => {
      const isStickerRequest =
        message.isMedia === true &&
        message.caption &&
        message.caption.match(sticker.pattern);

      if (isStickerRequest) {
        emojiReaction(client, message);

        const buffer = await client.decryptFile(message);
        const buffer64 = buffer.toString("base64");
        const fileName = `temp/temp.${mime.extension(message.mimetype)}`;

        console.log("message.type = " + message.type);

        if (message.type === "video") {
          fs.writeFile(fileName, buffer, (err) => {
            err
              ? console.log("error writing video file temp/temp.mp4: " + err)
              : console.log("temp/temp.mp4 written.");
            convertMP4toGIF(fileName, () => {
              client
                .sendImageAsStickerGif(message.chatId, "temp/temp.gif")
                .then((result) => {
                  fs.unlink("temp/temp.gif", (err) => {
                    err
                      ? console.log("error unlinking temp.gif: " + err)
                      : console.log("temp/temp.gif unlinked.");
                  });

                  fs.unlink("temp/temp.mp4", (err) => {
                    err
                      ? console.log("error unlinking temp.mp4: " + err)
                      : console.log("temp/temp.mp4 unlinked.");
                  });

                  console.log("Result: ", result);
                })
                .catch((err) => {
                  console.error("Error sending ImageAsStickerGif: ", err);
                });
            });
          });
        }
        if (message.type === "image") {
          client
            .sendImageAsSticker(message.chatId, buffer64)
            .then((result) => {
              console.log("Result: ", result);
            })
            .catch((err) => {
              console.error("Error sending ImageAsSticker: ", err);
            });
        }
      }
    });
  },
};
