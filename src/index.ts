// Supports ES6
import { create, Whatsapp } from "venom-bot";
import { Commands } from "./commands";
import { logMessages } from "./services/logMessages";
import path from "path";
import express from "express";
import "dotenv";

const PORT = process.env.PORT || 8080;
const sv = express();

const qrCodeServer = () => {
  sv.get("/qr", (_req, res) => {
    res.sendFile("out.png", { root: path.join(__dirname) });
  });

  sv.listen(PORT, () => {
    console.log(
      `server running on port ${PORT}\ncheck http://localhost:${PORT}/qr for QR code`
    );
  });
};

create(
  "sessionName",
  (base64Qr, asciiQR, attempts, urlCode) => {
    console.log(asciiQR); // Optional to log the QR in the terminal
    var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {
        type: "",
        data: "",
      };

    if (matches.length !== 3) {
      return new Error("Invalid input string");
    }
    response.type = matches[1];
    // @ts-ignore
    response.data = new Buffer.from(matches[2], "base64");

    var imageBuffer = response;
    require("fs").writeFile(
      "src/out.png",
      imageBuffer["data"],
      "binary",
      function (err) {
        if (err != null) {
          console.log(err);
        }
      }
    );

    //qrCodeServer();
  },
  undefined,
  { logQR: false }
)
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });

function start(client: Whatsapp) {
  logMessages(client, true);
  Commands.all.exec(client);
  Commands.dice.exec(client);
  Commands.sticker.exec(client);
  Commands.help.exec(client);
}
